"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const organisePatchByPaths_1 = __importDefault(require("../organisePatchByPaths"));
ava_1.default('Operations with paths made up of one path are organised as expected', async (t) => {
    const patch = [
        { "op": "add", "path": "/foo", "value": "bar" },
        { "op": "add", "path": "/bar", "value": "baz" },
        { "op": "remove", "path": "/foo" }
    ];
    const expectedOrganisation = {
        '/foo': [
            { "op": "add", "path": "/foo", "value": "bar" },
            { "op": "remove", "path": "/foo" }
        ],
        '/bar': [
            { "op": "add", "path": "/bar", "value": "baz" },
        ]
    };
    const organisedPatch = organisePatchByPaths_1.default(patch);
    t.deepEqual(organisedPatch, expectedOrganisation);
});
//# sourceMappingURL=organisePatchByPaths.test.js.map