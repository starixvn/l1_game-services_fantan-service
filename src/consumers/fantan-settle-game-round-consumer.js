import { Table } from "sc-game-base";

export default class FanTanSettleGameRoundConsumer extends Table.EventConsumers.TableSettleGameRoundConsumer {
    async settleBets({ result, settlementResult, roundId, time }) {
        this.roundResultPublisher.publishRoundResult(this.collectRoundResult(result, settlementResult, roundId));

        const bets = await this.queryBets(roundId);

        if (bets && bets.length) {
            const { odds } = this.gameData.gameConfigs;

            await Promise.all(
                bets.map(async (bet) => {
                    const betResult = this.calculateBetResult(settlementResult, bet, odds);

                    bet.betwin = betResult.totalWin;
                    bet.paid = true;

                    await bet.save();
                    await this.callEndGame(bet, roundId, time, betResult);

                    this.captureBetResult(bet.uid, betResult, bet.rate);
                    await this.userBetResultPublisher.publish(bet.uid, betResult);
                })
            );
        }

        this.roundResultPublisher.publishWinners(roundId, this.gameData.winningPlayers);
    }
}
