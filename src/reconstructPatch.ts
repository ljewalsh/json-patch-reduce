import { isNil, map, path as ramPath, reject } from "ramda"
import getNestedPaths from "./getNestedPaths"
import { OPERATION_TYPE, Patch, Path, PathLogic, PathValues } from "./types"

const { ADD, ADD_REPLACE, REMOVE, REPLACE, MOVE, MOVE_REMOVE, COPY } = OPERATION_TYPE

interface Options {
    pathLogic: PathLogic
    pathValues: PathValues
    paths: string[][]
}

const reconstructPatchFromPathData = ({ pathLogic, pathValues, paths }: Options): Patch  => {
    const operations = map((path: string[]) => {
        const logic = ramPath(path, pathLogic)
        const formattedPath = "/" + path.join("/")
        switch (logic) {
            case ADD:
            case ADD_REPLACE:
                return { op: ADD, path: formattedPath, value: ramPath(path, pathValues) }
            case REMOVE:
                return { op: REMOVE, path: formattedPath }
            case MOVE_REMOVE:
                return { op: REMOVE, path: ramPath(path, pathValues) }
            case REPLACE:
                return { op: REPLACE, path: formattedPath, value: ramPath(path, pathValues)}
            case MOVE:
                return {
                    from: ramPath(path, pathValues) as string, op: MOVE, path: formattedPath,
                }
            case COPY:
                return {
                    from: ramPath(path, pathValues) as string, op: COPY, path: formattedPath,
                }
            case undefined:
                break
            default:
                throw Error(`Did not recognise pathLogic ${logic}`)
        }
    }, paths)
    return reject(isNil, operations) as Patch
}

export default reconstructPatchFromPathData
