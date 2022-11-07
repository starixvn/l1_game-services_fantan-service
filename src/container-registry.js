import awilix from "awilix";
import { Table } from "sc-game-base";
import { RebetContainerRegistry } from "sc-rebet-mode";
import FanTanPlaceBetConsumer from "./consumers/fan-tan-place-bet-consumer";
import { Bot, GameCron } from "./crons";
import { Bets, Rounds, TmpBets, Results } from "./models";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.container.register(
            new RebetContainerRegistry().registerTableGame(Table.Routers.TableHttpRouter, Table.Crons.TableProcessBetQueue)
        );

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
            FanTanPlaceBetConsumer: asClass(FanTanPlaceBetConsumer).singleton(),
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
