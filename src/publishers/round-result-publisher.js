import { Core } from "sc-game-base";

export default class RoundResultPublisher extends Core.BaseEventPublishers.RoundResultPublisher {
    publishWinners(roundId, winningPlayers) {
        const payload = {
            roundId,
            winningPlayers,
        };

        this.publishToAllUsers({
            winners: payload,
        });
    }
}
