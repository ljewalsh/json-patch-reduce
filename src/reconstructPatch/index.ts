import { map, path } from 'ramda'
import { PathData, Path, Patch, OPERATION_TYPE, PathLogic } from '../types'
import deconstructNestedPaths from './deconstructNestedPaths'

const { ADD, ADD_REPLACE, REMOVE, REPLACE, MOVE } = OPERATION_TYPE

const reconstructPatchFromPathData = ({ pathLogic, pathValues }: PathData): Patch => {
    const deconstructedPaths = deconstructNestedPaths(pathLogic)
    return map((deconstructedPath: string[]) => {
        const logic = path(deconstructedPath, pathLogic)
        const formattedPath = '/' + deconstructedPath.join('/')
        switch (logic){
            case ADD:
            case ADD_REPLACE:
                return { op: ADD, path: formattedPath, value: path(deconstructedPath, pathValues) }
            case REMOVE:
                return { op: REMOVE, path: formattedPath }
            case REPLACE:
                return { op: REPLACE, path: formattedPath, value: path(deconstructedPath, pathValues)}
            case MOVE:
                return {
                    op: MOVE, path: formattedPath, from: path(deconstructedPath, pathValues) as string
                }
            default:
                throw Error(`Did not recognise pathLogic ${logic}`)
        }
    }, deconstructedPaths)
}

export default reconstructPatchFromPathData
