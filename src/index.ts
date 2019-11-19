import { clone, flatten } from "ramda"
import constructPathData from "./constructPathData"
import reconstructPatch from "./reconstructPatch"
import { OPERATION_TYPE, Patch, Path } from "./types"

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

const reducePatch = (originalPatch: Patch): Patch  => {
    const clonedPatch = clone(originalPatch)
    const pathData = constructPathData(clonedPatch)
    const patches = reconstructPatch(pathData)
    return flatten(patches)
}

export default reducePatch
