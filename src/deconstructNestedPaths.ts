import { keys, concat } from 'ramda'
import { PathLogic, Path } from './types'

type DeconstructedPath = string[] 

const deconstructNestedPaths = (pathLogic: PathLogic, deconstructedPath: DeconstructedPath = [], deconstructedPaths: DeconstructedPath[] = []): DeconstructedPath[] => {
    const paths = keys(pathLogic) as Path[] 
    while (paths.length > 0){
        const path = paths.shift() as Path
        const currentLogic = pathLogic[path]
        const updatedDeconstructedPath = concat(deconstructedPath, [path])
        if (typeof currentLogic === 'object'){
            return deconstructNestedPaths(currentLogic as PathLogic, updatedDeconstructedPath, deconstructedPaths)
        }
        deconstructedPaths.push(updatedDeconstructedPath)
    }
    return deconstructedPaths
}

export default deconstructNestedPaths
