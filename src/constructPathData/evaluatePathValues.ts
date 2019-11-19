import { assocPath, dissocPath, path as ramPath } from "ramda"
import getNestedPaths from "../getNestedPaths"
import { AddOperation, Operation, OPERATION_TYPE, PathData, PathLogic, PathValues, ReplaceOperation } from "../types"

const { ADD, REMOVE, REPLACE, ADD_REPLACE, MOVE, COPY } = OPERATION_TYPE

interface Options {
    path: string[]
    operation: Operation
    pathValues: PathValues
    pathLogic: PathLogic
}

interface HandleOperation {
    currentLogic: OPERATION_TYPE
    path: string[]
    value: any
    pathValues: PathValues
}

interface HandleMoveOptions {
    pathValues: PathValues
    path: string[]
    fromPath: string
    currentLogic: OPERATION_TYPE
}

const handleAdd = ({ currentLogic, path, value, pathValues }: HandleOperation): PathValues => {
    switch (currentLogic) {
        case undefined:
        case REMOVE:
            return dissocPath(path, pathValues)
        default:
            return assocPath(path, value, pathValues)
    }
}

const handleMove = ({ path, pathValues, fromPath, currentLogic }: HandleMoveOptions): PathValues => {
    switch (currentLogic) {
        case ADD:
            const nestedFrom = getNestedPaths(fromPath)
            const currentValue = ramPath(nestedFrom, pathValues)
            const removed: PathValues = dissocPath(nestedFrom, pathValues)
            return assocPath(path, currentValue, removed)
        default:
            return assocPath(path, fromPath, pathValues)
    }
}

const evaluatePathValues = (options: Options): PathValues => {
    const { operation, pathValues, pathLogic, path } = options
    const currentLogic = ramPath(path, pathLogic) as OPERATION_TYPE
    switch (operation.op) {
        case ADD:
            return handleAdd({ currentLogic, path, value: operation.value, pathValues })
        case REMOVE:
            return dissocPath(path, pathValues)
        case REPLACE:
        case ADD_REPLACE:
            return assocPath(path, operation.value, pathValues)
        case MOVE:
            return handleMove({ pathValues, fromPath: operation.from, path, currentLogic })
        default:
            throw new Error(`Unexpected operation ${operation}`)
    }
}

export default evaluatePathValues
