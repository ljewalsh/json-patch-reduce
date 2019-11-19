import { dissocPath, assocPath, path as ramPath } from 'ramda'
import { AddOperation, ReplaceOperation, OPERATION_TYPE, PathLogic, Operation } from '../types'
import getNestedPaths from './getNestedPaths'

const { ADD, REMOVE, REPLACE, ADD_REPLACE, MOVE, REPLACE_MOVE } = OPERATION_TYPE

interface Options {
    path: string[],
    operation: Operation,
    pathLogic: PathLogic
}

const evaluatePathLogic = (options: Options): PathLogic => {
    const { operation, pathLogic, path } = options
    const currentLogic = ramPath(path, pathLogic)
    switch (operation.op){
        case ADD:
            if (currentLogic == REMOVE){
                return dissocPath(path, pathLogic)
            }
            return assocPath(path, ADD, pathLogic)
        case REMOVE:
            if (currentLogic == ADD || currentLogic == ADD_REPLACE){
                return dissocPath(path, pathLogic)
            }
            return assocPath(path, REMOVE, pathLogic)
        case REPLACE:
            if (currentLogic == ADD){
                return assocPath(path, ADD_REPLACE, pathLogic)
            }
            return assocPath(path, REPLACE, pathLogic)
        case MOVE:
            if (currentLogic == ADD || currentLogic == ADD_REPLACE){
                const nestedFrom = getNestedPaths(operation.from)
                const removed: PathLogic = dissocPath(nestedFrom, pathLogic)
                return assocPath(path, currentLogic, removed)
            }
            if (currentLogic == REPLACE){
                return assocPath(path, REPLACE_MOVE, pathLogic)
            }
        default:
            throw new Error(`Unexpected operation ${operation}`)
    }
}

export default evaluatePathLogic
