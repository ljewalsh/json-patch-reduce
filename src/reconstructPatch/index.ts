import { map, path } from "ramda"
import getNestedPaths from "../getNestedPaths"
import { OPERATION_TYPE, Patch, Path, PathLogic, PathValues } from "../types"
import deconstructNestedPaths from "./deconstructNestedPaths"

const { ADD, ADD_REPLACE, REMOVE, REPLACE, MOVE } = OPERATION_TYPE

interface Options {
    pathLogic: PathLogic
    pathValues: PathValues
}

const reconstructPatchFromPathData = ({ pathLogic, pathValues }: Options): Patch  => {
    const deconstructedPaths = deconstructNestedPaths({ pathLogic })
    return map((deconstructedPath: string[]) => {
        const logic = path(deconstructedPath, pathLogic)
        const formattedPath = "/" + deconstructedPath.join("/")
        switch (logic) {
            case ADD:
            case ADD_REPLACE:
                return { op: ADD, path: formattedPath, value: path(deconstructedPath, pathValues) }
            case REMOVE:
                return { op: REMOVE, path: formattedPath }
            case REPLACE:
                return { op: REPLACE, path: formattedPath, value: path(deconstructedPath, pathValues)}
            case MOVE:
                return {
                    from: path(deconstructedPath, pathValues) as string, op: MOVE, path: formattedPath,
                }
            default:
                throw Error(`Did not recognise pathLogic ${logic}`)
        }
    }, deconstructedPaths)
}

export default reconstructPatchFromPathData
