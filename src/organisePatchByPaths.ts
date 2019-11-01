import { OrganisedPatch, Operation } from './types'
import expandOperationPath from './expandOperationPath'

const organisePatchByPaths = (patch: Operation[], patchByPaths: OrganisedPatch): OrganisedPatch => {
    while (patch.length > 0){
        const nextOperation = patch.shift() as Operation
        const path = nextOperation.path
        const paths = path.split('/').splice(1)
        const data = expandOperationPath({ paths, operation: nextOperation, data: patchByPaths })
        console.dir(data, { depth: null })
        return organisePatchByPaths(patch, data)
        // const relatedOperations = patchByPaths[path] || []
        // relatedOperations.push(nextOperation)
        // patchByPaths[path] = relatedOperations
        // return organisePatchByPaths(patch, patchByPaths)
    }
    return patchByPaths
}

export default organisePatchByPaths
