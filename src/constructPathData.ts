import { prop, dissoc } from 'ramda'
import { Patch, Operation, PathLogic, PathValue, OPERATION_TYPE, PathData } from './types'
import evaluatePath from './evaluatePath'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

const constructPathData = (patch: Patch, pathLogic: PathLogic = {}, pathValue: PathValue = {}): PathData => {
    while (patch.length > 0){
        const operation = patch.shift() as Operation
        const { pathLogic: newLogic, pathValue: newValue } = evaluatePath({ pathLogic, pathValue, operation }) 
        return constructPathData(patch, newLogic, newValue)
    }
    console.log(pathLogic)
    return {
        pathLogic,
        pathValue
    }
}

export default constructPathData

