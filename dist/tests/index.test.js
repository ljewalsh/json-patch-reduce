"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const __1 = __importDefault(require("../"));
ava_1.default('both the add and remove operations for a path are stripped out when a path is to be removed', t => {
    const patch = [
        { "op": "add", "path": "/foo", "value": "bar" },
        { "op": "add", "path": "/bar", "value": "baz" },
        { "op": "remove", "path": "/foo" }
    ];
    const expectedPath = [
        { "op": "add", "path": "/bar", "value": "baz" }
    ];
    const reducedPatch = __1.default(patch);
    t.deepEqual(expectedPath, reducedPatch);
});
//# sourceMappingURL=index.test.js.map