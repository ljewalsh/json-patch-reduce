"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const organisePatchByPaths = (patch, patchByPaths) => {
    while (patch.length > 0) {
        const nextOperation = patch.shift();
        const path = nextOperation.path;
        const relatedOperations = patchByPaths[path] || [];
        relatedOperations.push(nextOperation);
        patchByPaths[path] = relatedOperations;
        return organisePatchByPaths(patch, patchByPaths);
    }
    return patchByPaths;
};
exports.default = organisePatchByPaths;
//# sourceMappingURL=organisePatchByPaths.js.map