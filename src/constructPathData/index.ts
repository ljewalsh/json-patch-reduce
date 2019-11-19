import { Patch, Operation, PathLogic, PathValues, PathData } from '../types'
import getNestedPaths from './../getNestedPaths'
import evaluatePathLogic from './evaluatePathLogic'
import evaluatePathValues from './evaluatePathValues'

const constructPathData = (patch: Patch, pathLogic: PathLogic = {}, pathValues: PathValues = {}): PathData => {
    while (patch.length > 0){
        const operation = patch.shift() as Operation
        const nestedPaths = getNestedPaths(operation.path)
        const updatedPathLogic = evaluatePathLogic({ pathLogic, operation, path: nestedPaths }) 
        const updatedPathValues = evaluatePathValues({ pathValues, pathLogic: updatedPathLogic, operation, path: nestedPaths })
        return constructPathData(patch, updatedPathLogic, updatedPathValues)
    }
    return {
        pathLogic,
        pathValues
    }
}

export default constructPathData

