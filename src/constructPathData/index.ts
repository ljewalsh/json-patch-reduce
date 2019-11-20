import { contains } from "ramda"
import {
    Operation,
    Patch,
    PathData,
    PathLogic,
    PathValues,
} from "../types"
import getNestedPaths from "./../getNestedPaths"
import evaluatePathLogic from "./evaluatePathLogic"
import evaluatePathValues from "./evaluatePathValues"

interface Options {
    patch: Patch,
    pathLogic?: PathLogic,
    pathValues?: PathValues,
    paths?: string[][]
}

const constructPathData = ({ patch, pathLogic = {}, pathValues = {}, paths = []}: Options): PathData => {
    while (patch.length > 0) {
        const operation = patch.shift() as Operation
        const nestedPaths = getNestedPaths(operation.path)
        const updatedPathLogic = evaluatePathLogic({ pathLogic, operation, path: nestedPaths })
        const updatedPathValues = evaluatePathValues({
            operation,
            path: nestedPaths,
            pathLogic: updatedPathLogic,
            pathValues,
        })
        if (contains(nestedPaths, paths) === false) {
            paths.push(nestedPaths)
        }
        return constructPathData({
            patch,
            pathLogic: updatedPathLogic,
            pathValues: updatedPathValues,
            paths,
        })
    }
    return {
        pathLogic,
        pathValues,
        paths,
    }
}

export default constructPathData
