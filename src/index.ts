import { keys, clone } from 'ramda'
import { Patch, OPERATION_TYPE, Path } from './types'
import constructPathData from './constructPathData'
import reconstructPatch from './reconstructPatch'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

const reducePatch = (originalPatch: Patch): Patch  => {
    const clonedPatch = clone(originalPatch)
    const pathData = constructPathData(clonedPatch)
    return reconstructPatch(pathData)
}

export default reducePatch
