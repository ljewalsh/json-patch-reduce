"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const types_1 = require("./types");
const constructPathData_1 = __importDefault(require("./constructPathData"));
const reconstructPatchFromPathData_1 = __importDefault(require("./reconstructPatchFromPathData"));
const { ADD, REMOVE, REPLACE, ADD_REPLACE } = types_1.OPERATION_TYPE;
const reducePatch = (originalPatch) => {
    const clonedPatch = ramda_1.clone(originalPatch);
    const pathData = constructPathData_1.default(clonedPatch);
    return reconstructPatchFromPathData_1.default(pathData);
};
exports.default = reducePatch;
//# sourceMappingURL=index.js.map