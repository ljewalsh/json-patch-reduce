import { dissocPath, assocPath, path as ramPath } from 'ramda'
import { AddOperation, ReplaceOperation, OPERATION_TYPE, PathLogic, PathValue, Operation, PathData } from './types'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

const dissociatePath = (pathLogic: PathLogic, pathValue: PathValue, path: string[]) => ({
        pathLogic: dissocPath(path, pathLogic) as PathLogic,
        pathValue: dissocPath(path, pathValue) as PathValue
})

interface Options {
    operation: Operation,
    pathValue: PathValue,
    pathLogic: PathLogic
}

const evaluatePath = (options: Options): PathData  => {
    const { operation, pathValue, pathLogic } = options
    const { op, path } = operation
    const nestedPaths = path.split('/').slice(1)
    const currentLogic = ramPath(nestedPaths, pathLogic)
    switch (op){
        case ADD:
            if (currentLogic == REMOVE){
                return dissociatePath(pathLogic, pathValue, nestedPaths)
            }
            return {
                pathLogic: assocPath(nestedPaths, ADD, pathLogic),
                pathValue: assocPath(nestedPaths, (operation as AddOperation).value, pathValue)
            }
        case REMOVE:
            if (currentLogic == ADD || currentLogic == ADD_REPLACE){
                return dissociatePath(pathLogic, pathValue, nestedPaths)
            }
            return {
                pathLogic: assocPath(nestedPaths, REMOVE, pathLogic),
                pathValue: dissocPath(nestedPaths, pathValue)
            }
        case REPLACE:
            if (currentLogic == ADD){
                return {
                    pathLogic: assocPath(nestedPaths, ADD_REPLACE, pathLogic),
                    pathValue: assocPath(nestedPaths, (operation as ReplaceOperation).value, pathValue)
                }
            }
            return {
                pathLogic: assocPath(nestedPaths, REPLACE, pathLogic),
                pathValue: assocPath(nestedPaths, (operation as ReplaceOperation).value, pathValue)
            }
        default:
            throw new Error(`Unexpected operation ${op}`)
    }
}

export default evaluatePath

