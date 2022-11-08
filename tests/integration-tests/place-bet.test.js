import { GameClientDriver, normalUser, eventTypes, errorUser, internalServerErrorUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";

export const placeBetTest = () => {
    describe("place bet", () => {
        describe("when place bet in placing bet time", () => {
            it("should return own bet data", async (done) => {
                // Arrange
                const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
                await client.handleSignedInEvent();
                client.sendInGameEvent();
                await client.handleGameEvent((gameData) => gameData.spb);

                setTimeout(async () => {
                    client.emit(eventTypes.bet, { betChoice: "even", amount: 100 });

                    // Act
                    const data = await client.handleGameEvent((data) => data.endBet);

                    // Assert
                    expect(data.betChoice).toBe("even");
                    expect(data.endBet).toBe(100);
                    expect(data.ownBets).toEqual({ even: 100 });
                    expect(data.ownChip).toEqual({ betChoice: "even", amount: 100 });

                    client.close();
                    done();
                }, 1000);
            });
        });

        describe("when place bet NOT in placing bet time", () => {
            it("should return invalid", async (done) => {
                // Arrange
                const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
                await client.handleSignedInEvent();
                client.sendInGameEvent();
                await client.handleGameEvent((gameData) => gameData.epb);

                client.emit(eventTypes.bet, { betChoice: "even", amount: 100 });
                // Act
                const data = await client.handleGameEvent((data) => data.endBet);

                // Assert
                expect(data.endBet).toBe(-1);
                client.close();
                done();
            });
        });

        describe("when get error response from api", () => {
            it("should return api error", async (done) => {
                // Arrange
                const client = new GameClientDriver(socketOptions, initUserSession(errorUser));
                await client.handleSignedInEvent();
                client.sendInGameEvent();
                await client.handleGameEvent((gameData) => gameData.spb);

                setTimeout(async () => {
                    client.emit(eventTypes.bet, { betChoice: "even", amount: 100 });
                    // Act
                    const data = await client.handleGameEvent((data) => data.endBet);

                    // Assert
                    expect(data.endBet).toBe(-1);
                    expect(data.betChoice).toEqual("even");
                    expect(data.apiError.errorCode).toEqual(3002);
                    expect(data.apiError.isPlaceBetFailed).toEqual(true);

                    client.close();
                    done();
                }, 1000);
            });
        });

        describe("when API internal server error", () => {
            it("should return api error", async (done) => {
                // Arrange
                const client = new GameClientDriver(socketOptions, initUserSession(internalServerErrorUser));
                await client.handleSignedInEvent();
                client.sendInGameEvent();
                await client.handleGameEvent((gameData) => gameData.spb);

                setTimeout(async () => {
                    client.emit(eventTypes.bet, { betChoice: "even", amount: 100 });
                    // Act
                    const data = await client.handleGameEvent((data) => data.endBet);

                    // Assert
                    expect(data.betChoice).toEqual("even");
                    expect(data.apiError.errorCode).toEqual("SB1900");
                    expect(data.apiError.isPlaceBetFailed).toEqual(true);

                    client.close();
                    done();
                }, 1000);
            });
        });
    });
};
