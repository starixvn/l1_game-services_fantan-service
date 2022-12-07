import FanTanSettleGameRoundConsumer from "../../../src/consumers/fantan-settle-game-round-consumer";
import { stub } from "jest-micro-auto-stub";
import { Core } from "sc-game-base";
import Definition from "../../../src/definition";
import gameSettings from "../../../src/game-settings";
import Chance from "chance";

describe("FanTanSettleGameRoundConsumer", () => {
    const chance = new Chance();
    const definition = new Definition({ id: gameSettings.id, name: gameSettings.name }, jest.fn(), jest.fn());
    const roundId = chance.natural();
    const gameData = {
        gameConfigs: {
            odds: {
                even: 1.96,
                odd: 1.96,
                fan1: 3.75,
                fan2: 3.75,
                fan3: 3.75,
                fan4: 3.75,
                kwok12: 1.96,
                kwok23: 1.96,
                kwok34: 1.96,
                kwok41: 1.96,
                chun123: 1.32,
                chun124: 1.32,
                chun134: 1.32,
                chun234: 1.32,
            },
        },
        winningPlayers: {},
        roundId,
    };
    const roundResultPublisher = stub(Core.BaseEventPublishers.RoundResultPublisher);
    const userBetResultPublisher = stub(Core.BaseEventPublishers.UserBetResultPublisher);

    const consumer = new FanTanSettleGameRoundConsumer({ definition, gameData, roundResultPublisher, userBetResultPublisher });

    describe("settleBets", () => {
        const result = {
            totalBeads: 29,
            finalBeads: 1,
        };
        const settlementResult = {
            odd: true,
            even: false,
            fan1: true,
            fan2: false,
            fan3: false,
            fan4: false,
            kwok12: true,
            kwok23: false,
            kwok34: false,
            kwok41: true,
            chun123: true,
            chun124: true,
            chun134: true,
            chun234: false,
        };
        const queryBets = [
            { uid: chance.guid(), odd: chance.natural(), playerId: chance.natural(), siteId: chance.natural(), save: jest.fn() },
            {
                uid: chance.guid(),
                even: chance.natural(),
                playerId: chance.natural(),
                siteId: chance.natural(),
                freeBet: true,
                save: jest.fn(),
            },
        ];
        const betResult = {
            totalBetAmount: chance.natural(),
            totalWin: chance.natural(),
            netWin: chance.natural(),
            totalLost: chance.natural(),
            winningByChoices: {},
        };
        const collectRoundResult = {
            result,
            settlementResult,
            roundId,
        };
        const settleBetParams = { result, settlementResult, roundId, time: new Date() };

        beforeEach(() => {
            definition.generateResult.mockReturnValueOnce(result);
            definition.settle.mockReturnValueOnce(settlementResult);
            consumer.callEndGame = jest.fn();
            consumer.queryBets = jest.fn(() => queryBets);
            consumer.calculateBetResult = jest.fn(() => betResult);
            consumer.collectRoundResult = jest.fn(() => collectRoundResult);
            consumer.captureBetResult = jest.fn();
        });

        it("should publish round result to client", async () => {
            // Act
            await consumer.settleBets(settleBetParams);

            // Assert
            expect(roundResultPublisher.publishRoundResult).toHaveBeenCalledWith(collectRoundResult);
        });

        it("should call queryBets", async () => {
            // Act
            await consumer.settleBets(settleBetParams);

            // Assert
            expect(consumer.queryBets).toBeCalledWith(settleBetParams.roundId);
        });

        Object.keys(queryBets)
            .map((index) => +index)
            .forEach((betIndex) => {
                describe(`with bet ${betIndex + 1}`, () => {
                    it("should call calculateBetResult", async () => {
                        // Act
                        await consumer.settleBets(settleBetParams);

                        // Assert
                        expect(consumer.calculateBetResult).toHaveBeenNthCalledWith(
                            betIndex + 1,
                            settlementResult,
                            queryBets[betIndex],
                            gameData.gameConfigs.odds
                        );
                    });

                    it("should call endGame", async () => {
                        // Act
                        await consumer.settleBets(settleBetParams);

                        // Assert
                        expect(consumer.callEndGame).toHaveBeenNthCalledWith(
                            betIndex + 1,
                            queryBets[betIndex],
                            settleBetParams.roundId,
                            settleBetParams.time,
                            betResult
                        );
                    });

                    it("should call captureBetResult", async () => {
                        // Act
                        await consumer.settleBets(settleBetParams);

                        // Assert
                        expect(consumer.captureBetResult).toHaveBeenNthCalledWith(
                            betIndex + 1,
                            queryBets[betIndex].uid,
                            betResult,
                            queryBets[betIndex].rate
                        );
                    });

                    it("should publish bet result to user", async () => {
                        // Act
                        await consumer.settleBets(settleBetParams);

                        // Assert
                        expect(userBetResultPublisher.publish).toHaveBeenNthCalledWith(betIndex + 1, queryBets[betIndex].uid, betResult);
                    });
                });
            });

        it("should publish winners to client", async () => {
            // Act
            await consumer.settleBets(settleBetParams);

            // Assert
            expect(roundResultPublisher.publishWinners).toHaveBeenCalledWith(gameData.roundId, gameData.winningPlayers);
        });
    });
});
