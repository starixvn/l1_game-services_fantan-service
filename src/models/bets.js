import mongoose from "mongoose";

const bet = {
    uid: { type: String, required: true },
    name: { type: String, required: true },

    odd: { type: Number, default: 0 },
    even: { type: Number, default: 0 },
    fan1: { type: Number, default: 0 },
    fan2: { type: Number, default: 0 },
    fan3: { type: Number, default: 0 },
    fan4: { type: Number, default: 0 },
    kwok12: { type: Number, default: 0 },
    kwok23: { type: Number, default: 0 },
    kwok34: { type: Number, default: 0 },
    kwok41: { type: Number, default: 0 },
    chun123: { type: Number, default: 0 },
    chun124: { type: Number, default: 0 },
    chun134: { type: Number, default: 0 },
    chun234: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },

    time: { type: Date },
    odds: { type: Object },

    siteId: { type: String },
    freeBet: { type: Boolean, default: false },

    playerId: { type: String },
    operatorId: { type: String, required: false },
    roundId: { type: Number, default: 0 },
};

const bets = mongoose.model(
    "FanTan_bet",
    new mongoose.Schema({
        ...bet,
        currency: { type: String, required: true },
        rate: { type: Number, required: true },
        operatorId: { type: String, required: true },
        paid: { type: Boolean, default: false },
        betwin: { type: Number, default: 0 },
    })
);
const tmpBets = mongoose.model(
    "FanTan_tmpBet",
    new mongoose.Schema({ ...bet, betwin: { type: Number, default: 0 }, paid: { type: Boolean, default: false } })
);

const betLogs = mongoose.model(
    "FanTan_betLogs",
    new mongoose.Schema({
        ...bet,
        rebet: { type: Boolean, default: false },
        clientSentTime: { type: Date },
        receivedTime: { type: Date },
        time: { type: Date, required: true },
    })
);

export { bets as Bets, tmpBets as TmpBets, betLogs as BetLogs };
