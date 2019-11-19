import { dissocPath, assocPath, path as ramPath } from 'ramda'
import { AddOperation, ReplaceOperation, OPERATION_TYPE, PathLogic, PathValues, Operation, PathData } from '../types'

const { ADD, REMOVE, REPLACE, ADD_REPLACE, MOVE } = OPERATION_TYPE

interface Options {
    path: string[],
    operation: Operation,
    pathValues: PathValues,
    pathLogic: PathLogic
}

const evaluatePathValues = (options: Options): PathValues => {
    const { operation, pathValues, pathLogic, path } = options
    const currentLogic = ramPath(path, pathLogic)
    switch (operation.op){
        case ADD:
            if (currentLogic == REMOVE || currentLogic == null){
                return dissocPath(path, pathValues)
            }
            return assocPath(path, operation.value, pathValues)
        case REMOVE:
            return dissocPath(path, pathValues)
        case REPLACE:
            if (currentLogic == ADD){
            return assocPath(path, ADD_REPLACE, pathValues)
            }
            return assocPath(path, operation.value, pathValues)
        case MOVE:
            return assocPath(path, operation.from, pathValues)
        default:
            throw new Error(`Unexpected operation ${operation}`)
    }
}

export default evaluatePathValues
