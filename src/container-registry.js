import awilix from "awilix";
import { Table, Core } from "sc-game-base";
import { RebetContainerRegistry } from "sc-rebet-mode";
import FanTanPlaceBetConsumer from "./consumers/fan-tan-place-bet-consumer";
import { Bot, GameCron } from "./crons";
import { Bets, Rounds, TmpBets, Results } from "./models";
import ProcessBetQueue from "./crons/process-bet-queue";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.container.register(new RebetContainerRegistry().register(Core.Routers.BaseSocketRouter));

        return this.container;
    }

    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(Rounds),
            betsRepository: asValue(Bets),
            tempBetsRepository: asValue(TmpBets),
            resultsRepository: asValue(Results),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(FanTanPlaceBetConsumer).singleton(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
            gameCron: asClass(GameCron).singleton().proxy(),
            processBetQueue: asClass(ProcessBetQueue).singleton().proxy(),
        });
    }
}
