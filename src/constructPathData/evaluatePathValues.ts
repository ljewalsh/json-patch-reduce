import { dissocPath, assocPath, path as ramPath } from 'ramda'
import { AddOperation, ReplaceOperation, OPERATION_TYPE, PathLogic, PathValues, Operation, PathData } from '../types'

const { ADD, REMOVE, REPLACE, ADD_REPLACE, MOVE, COPY } = OPERATION_TYPE

interface Options {
    path: string[],
    operation: Operation,
    pathValues: PathValues,
    pathLogic: PathLogic
}

interface HandleOperation {
    currentLogic: OPERATION_TYPE,
    path: string[],
    value: any,
    pathValues: PathValues
}

const handleAdd = ({ currentLogic, path, value, pathValues }: HandleOperation): PathValues => {
    switch(currentLogic){
        case undefined:
        case REMOVE:
            return dissocPath(path, pathValues)
        default:
            return assocPath(path, value, pathValues)
    }
}

const evaluatePathValues = (options: Options): PathValues => {
    const { operation, pathValues, pathLogic, path } = options
    const currentLogic = ramPath(path, pathLogic) as OPERATION_TYPE
    switch (operation.op){
        case ADD:
            return handleAdd({ currentLogic, path, value: operation.value, pathValues })
        case REMOVE:
            return dissocPath(path, pathValues)
        case REPLACE:
        case ADD_REPLACE:
            return assocPath(path, operation.value, pathValues)
        case MOVE:
        case COPY:
            return assocPath(path, operation.from, pathValues)
        default:
            throw new Error(`Unexpected operation ${operation}`)
    }
}

export default evaluatePathValues
