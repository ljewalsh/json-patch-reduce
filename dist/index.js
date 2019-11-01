"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organisePatchByPaths_1 = __importDefault(require("./organisePatchByPaths"));
const reducePath = (patch) => {
    const patchByPaths = organisePatchByPaths_1.default(patch, {});
};
exports.default = reducePath;
//# sourceMappingURL=index.js.map