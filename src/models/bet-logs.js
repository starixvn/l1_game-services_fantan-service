import mongoose from "mongoose";

const schema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    time: { type: Date, required: true },

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

    rebet: { type: Boolean, default: false },

    siteId: { type: String },
    freeBet: { type: Boolean },

    currency: { type: String, required: true },
    rate: { type: Number, required: true },

    playerId: { type: Number, required: true },
    operatorId: { type: String, required: true },
    roundId: { type: Number, required: true },

    clientSentTime: { type: Date },
    receivedTime: { type: Date },
});

export default mongoose.model("FanTan_BetLogs", schema);
