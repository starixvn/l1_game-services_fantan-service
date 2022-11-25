import { Core, Constants } from "sc-game-base";

export default class PlaceBetPublisher extends Core.BaseEventPublishers.PlaceBetPublisher {
    publishSuccessBet(playerId, payload, rate) {
        super.publishSuccessBet(playerId, payload);

        const otherUsersPayload = {
            playerId,
            rate,
            ...payload.ownChip,
            ...payload.user,
            rebet: payload.rebet,
        };

        this.publishToAllUsersExceptSystem(Constants.Systems.Mobi, playerId, { playerChip: otherUsersPayload });
    }
}
