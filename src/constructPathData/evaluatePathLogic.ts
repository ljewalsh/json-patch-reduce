import { assocPath, dissocPath, path as ramPath } from "ramda"
import getNestedPaths from "../getNestedPaths"
import {
    AddOperation,
    Operation,
    OPERATION_TYPE,
    PathLogic,
    ReplaceOperation,
} from "../types"

const { ADD, REMOVE, REPLACE, ADD_REPLACE, MOVE, COPY, MOVE_REMOVE, COPY_MOVE } = OPERATION_TYPE

interface Options {
    path: string[]
    operation: Operation
    pathLogic: PathLogic,
}

interface HandleOptions {
    currentLogic: OPERATION_TYPE
    path: string[]
    pathLogic: PathLogic
}

interface HandleMoveOptions {
    path: string[]
    pathLogic: PathLogic
    fromPath: string
}

const handleAdd = ({ currentLogic, path, pathLogic }: HandleOptions): PathLogic => {
    switch (currentLogic) {
        case REMOVE:
            return dissocPath(path, pathLogic)
        default:
            return assocPath(path, ADD, pathLogic)
    }
}

const handleRemove = ({ currentLogic, path, pathLogic }: HandleOptions): PathLogic => {
    switch (currentLogic) {
        case ADD:
        case ADD_REPLACE:
        case COPY:
            return dissocPath(path, pathLogic)
        case MOVE:
            return assocPath(path, MOVE_REMOVE, pathLogic)
        default:
            return assocPath(path, REMOVE, pathLogic)
    }
}

const handleReplace = ({ currentLogic, path, pathLogic }: HandleOptions): PathLogic => {
    switch (currentLogic) {
        case COPY:
            return assocPath(path, ADD, pathLogic)
        case ADD:
            return assocPath(path, ADD_REPLACE, pathLogic)
        default:
            return assocPath(path, REPLACE, pathLogic)
    }
}

const handleMove = ({ path, pathLogic, fromPath }: HandleMoveOptions): PathLogic => {
    const nestedFrom = getNestedPaths(fromPath)
    const currentLogic = ramPath(nestedFrom, pathLogic)
    const removed: PathLogic = dissocPath(nestedFrom, pathLogic)

    switch (currentLogic) {
        case ADD:
        case ADD_REPLACE:
            return assocPath(path, currentLogic, removed)
        case COPY:
            return assocPath(path, COPY_MOVE, removed)
        default:
            return assocPath(path, MOVE, pathLogic)
    }
}

const evaluatePathLogic = (options: Options): PathLogic => {
    const { operation, pathLogic, path } = options
    const currentLogic = ramPath(path, pathLogic) as OPERATION_TYPE
    const handleOptions = { currentLogic, path, pathLogic }
    switch (operation.op) {
        case ADD:
            return handleAdd(handleOptions)
        case REMOVE:
            return handleRemove(handleOptions)
        case REPLACE:
            return handleReplace(handleOptions)
        case MOVE:
            return handleMove({ path, pathLogic, fromPath: operation.from })
        case COPY:
            return assocPath(path, COPY, pathLogic)
        default:
            throw new Error(`Unexpected operation ${operation}`)
    }
}

export default evaluatePathLogic
