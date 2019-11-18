import { keys, map } from 'ramda'
import { PathData, Path, Patch, OPERATION_TYPE, PathLogic } from './types'

const { ADD, ADD_REPLACE, REMOVE, REPLACE } = OPERATION_TYPE

const reconstructPatchFromPathData = ({ pathLogic, pathValue }: PathData): Patch => {
    const paths = keys(pathLogic) as Path[]
    return map((path: Path) => {
        const logic = pathLogic[path]
        const formattedPath = '/' + path
        switch (logic){
            case ADD:
            case ADD_REPLACE:
                return { op: ADD, path: formattedPath, value: pathValue[path] }
            case REMOVE:
                return { op: REMOVE, path: formattedPath }
            case REPLACE:
                return { op: REPLACE, path: formattedPath, value: pathValue[path]}
            default:
                throw Error(`Did not recognise pathLogic ${logic}`)
        }
    }, paths)
}

export default reconstructPatchFromPathData
