import { keys, clone } from 'ramda'
import { Patch, OPERATION_TYPE, Path } from './types'
import constructPathData from './constructPathData'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

const reducePatch = (originalPatch: Patch): Patch  => {
    const { pathLogic, pathValue } = constructPathData(clone(originalPatch))
    const paths = keys(pathLogic) as Path[]
    return paths.map((path: string) => {
        const logic = pathLogic[path]
        switch (logic){
            case ADD:
            case ADD_REPLACE:
                return { op: ADD, path, value: pathValue[path] }
            case REMOVE:
                return { op: REMOVE, path }
            case REPLACE:
                return { op: REPLACE, path, value: pathValue[path]}
            default:
                throw Error(`Did not recognise pathLogic ${logic}`)
    }
    })
}

export default reducePatch
