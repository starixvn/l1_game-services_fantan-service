import Chance from "chance";
import randomLib1 from "random";
import { Random, MersenneTwister19937 } from "random-js";
import Constants from "../constants";
import { randomInt } from "crypto";
import _ from "lodash";
import randomInteger from "random-int";

function random1(min, max) {
    return randomInt(min, max + 1);
}

function random2(min, max) {
    const chance = new Chance();
    return chance.natural({ min: min, max: max });
}

function random3(min, max) {
    const chance = new Chance();
    return chance.integer({ min: min, max: max });
}

function random4(min, max) {
    return randomLib1.int(min, max);
}

function random5(min, max) {
    const randomJs = new Random(MersenneTwister19937.autoSeed());
    return randomJs.integer(min, max);
}

function random6(min, max) {
    return _.random(min, max);
}

function random7(min, max) {
    return randomInteger(min, max);
}

function random8(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomModes = {
    1: [random1, random2, random3, random4, random5],
    2: [random6],
    3: [random7, random8],
};

export const generateResult = (randomMode) => {
    const randomFunctions = randomModes[randomMode] || randomModes[1];

    const chance = new Chance();
    const randomFunction = chance.pickone(randomFunctions);

    return randomFunction(Constants.numberOfBeads.min, Constants.numberOfBeads.max);
};

export const getSettlementResult = (roundResult) => {
    const finalResult = roundResult % 4;

    return {
        even: finalResult % 2 === 0,
        odd: finalResult % 2 === 1,
        fan1: finalResult === 1,
        fan2: finalResult === 2,
        fan3: finalResult === 3,
        fan4: finalResult === 0,
        kwok12: [1, 2].includes(finalResult),
        kwok23: [2, 3].includes(finalResult),
        kwok34: [3, 0].includes(finalResult),
        kwok41: [1, 0].includes(finalResult),
        chun123: [1, 2, 3].includes(finalResult),
        chun124: [1, 2, 0].includes(finalResult),
        chun134: [1, 3, 0].includes(finalResult),
        chun234: [2, 3, 0].includes(finalResult),
    };
};

export const generateRawResultForHash = (roundResult) => `{${roundResult}}`;
