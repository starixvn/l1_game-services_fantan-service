import awilix from "awilix";
import { Table, Core } from "sc-game-base";
import { FanTanPlaceBetConsumer } from "./consumers";
import { Bot, GameCron } from "./crons";
import { Bets, Rounds, TmpBets, Results, BetLogs } from "./models";
import RebetContainerRegistry from "./rebet-container-registry";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.container.register(new RebetContainerRegistry().registerTableGame(Core.Routers.BaseSocketRouter));

        return this.container;
    }

    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(Rounds),
            betsRepository: asValue(Bets),
            tempBetsRepository: asValue(TmpBets),
            resultsRepository: asValue(Results),
            betLogsRepository: asValue(BetLogs),
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
        });
    }
}
