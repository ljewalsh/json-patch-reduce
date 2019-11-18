import { dissoc, assoc } from 'ramda'
import { AddOperation, ReplaceOperation, OPERATION_TYPE, PathLogic, PathValue, Operation, PathData } from './types'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

const dissociatePath = (pathLogic: PathLogic, pathValue: PathValue, path: string) => ({
    pathLogic: dissoc(path, pathLogic) as PathLogic,
    pathValue: dissoc(path, pathValue) as PathValue
})

interface Options {
    operation: Operation,
    pathValue: PathValue,
    pathLogic: PathLogic
}

const evaluatePath = (options: Options): PathData  => {
    const { operation, pathValue, pathLogic } = options
    const { op, path } = operation
    const currentLogic = pathLogic[path]
    switch (op){
        case ADD:
            if (currentLogic == REMOVE){
                return dissociatePath(pathLogic, pathValue, path)
            }
            return {
                pathLogic: assoc(path, ADD, pathLogic),
                pathValue: assoc(path, (operation as AddOperation).value, pathValue)
            }
        case REMOVE:
            if (currentLogic == ADD || currentLogic == ADD_REPLACE){
                return dissociatePath(pathLogic, pathValue, path)
            }
            return {
                pathLogic: assoc(path, REMOVE, pathLogic),
                pathValue: dissoc(path, pathValue)
            }
        case REPLACE:
            if (currentLogic == ADD){
                return {
                    pathLogic: assoc(path, ADD_REPLACE, pathLogic),
                    pathValue: assoc(path, (operation as ReplaceOperation).value, pathValue)
                }
            }
            return {
                pathLogic: assoc(path, REPLACE, pathLogic),
                pathValue: assoc(path, (operation as ReplaceOperation).value, pathValue)
            }
        default:
            throw new Error(`Unexpected operation ${op}`)
    }
}

export default evaluatePath

