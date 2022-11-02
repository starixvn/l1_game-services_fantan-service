import mongoose from "mongoose";

const modelName = "FanTan_Round";

const settlementResultSchema = new mongoose.Schema(
    {
        odd: { type: Boolean, default: false },
        even: { type: Boolean, default: false },
        fan1: { type: Boolean, default: false },
        fan2: { type: Boolean, default: false },
        fan3: { type: Boolean, default: false },
        fan4: { type: Boolean, default: false },
        kwok12: { type: Boolean, default: false },
        kwok23: { type: Boolean, default: false },
        kwok34: { type: Boolean, default: false },
        kwok41: { type: Boolean, default: false },
        chun123: { type: Boolean, default: false },
        chun124: { type: Boolean, default: false },
        chun134: { type: Boolean, default: false },
        chun234: { type: Boolean, default: false },
    },
    { _id: false }
);

const resultSchema = new mongoose.Schema({
    totalBeads: { type: Number, required: true },
    finalBeads: { type: Number, required: true },
});

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: resultSchema,
    settlementResult: settlementResultSchema,
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, require: true },
});

export default mongoose.model(modelName, Schema);
