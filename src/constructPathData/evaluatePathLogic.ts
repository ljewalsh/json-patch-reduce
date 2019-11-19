import { dissocPath, assocPath, path as ramPath } from 'ramda'
import { AddOperation, ReplaceOperation, OPERATION_TYPE, PathLogic, Operation } from '../types'
import getNestedPaths from '../getNestedPaths'

const { ADD, REMOVE, REPLACE, ADD_REPLACE, MOVE, REPLACE_MOVE, COPY } = OPERATION_TYPE

interface Options {
    path: string[],
    operation: Operation,
    pathLogic: PathLogic
}

interface HandleOptions {
    currentLogic: OPERATION_TYPE,
    path: string[],
    pathLogic: PathLogic
}

interface MoveHandleOptions extends HandleOptions {
    fromValue: string
}

const handleAdd = ({ currentLogic, path, pathLogic }: HandleOptions): PathLogic => {
    switch(currentLogic){
        case REMOVE:
            return dissocPath(path, pathLogic)
        default:
            return assocPath(path, ADD, pathLogic)
    }
}

const handleRemove = ({ currentLogic, path, pathLogic }:HandleOptions): PathLogic => {
    switch(currentLogic){
        case ADD:
        case ADD_REPLACE:
        case COPY:
            return dissocPath(path, pathLogic)
        default: 
            return assocPath(path, REMOVE, pathLogic)
    }
}

const handleReplace = ({ currentLogic, path, pathLogic }: HandleOptions): PathLogic => {
    switch(currentLogic){
        case ADD:
            return assocPath(path, ADD_REPLACE, pathLogic)
        default:
            return assocPath(path, REPLACE, pathLogic)
    }
}

const handleMove = ({ currentLogic, path, pathLogic,fromValue }: MoveHandleOptions): PathLogic => {
    switch(currentLogic){
        case ADD:
        case ADD_REPLACE:
            const nestedFrom = getNestedPaths(fromValue)
            const removed: PathLogic = dissocPath(nestedFrom, pathLogic)
            return assocPath(path, currentLogic, removed)
        case REPLACE:
            return assocPath(path, REPLACE_MOVE, pathLogic)
        default:
            return assocPath(path, MOVE, pathLogic)
    }
}

const evaluatePathLogic = (options: Options): PathLogic => {
    const { operation, pathLogic, path } = options
    const currentLogic= ramPath(path, pathLogic) as OPERATION_TYPE
    const handleOptions = { currentLogic, path, pathLogic }
    switch (operation.op){
        case ADD:
            return handleAdd(handleOptions)
        case REMOVE:
            return handleRemove(handleOptions)
        case REPLACE:
            return handleReplace(handleOptions)
        case MOVE:
            return handleMove({ ...handleOptions, fromValue: operation['from'] })
        default:
            throw new Error(`Unexpected operation ${operation}`)
    }
}

export default evaluatePathLogic
