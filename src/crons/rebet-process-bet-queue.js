import { Crons } from "sc-rebet-mode";

export default class RebetProcessBetQueue extends Crons.TableProcessBetQueue {
    isCountOnTotalBets(player) {
        return this.gameData.currencies.some(
            (currency) =>
                currency.partnerId === player.session.operatorId &&
                currency.name === player.session.currencyName &&
                !(currency.isTest && currency.isUncountOnTotal)
        );
    }
}