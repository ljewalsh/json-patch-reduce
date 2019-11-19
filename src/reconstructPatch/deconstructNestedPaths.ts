import { concat, contains, keys, values } from "ramda"
import { OPERATION_TYPE, Path, PathLogic } from "../types"

type DeconstructedPath = string[]

interface Options {
    pathLogic: PathLogic,
    deconstructedPath?: DeconstructedPath,
    deconstructedPaths?: DeconstructedPath[]
}

const isOperationType = (currentLogic: any) => {
    return contains(currentLogic, values(OPERATION_TYPE))
}

const deconstructNestedPaths = ({
    pathLogic,
    deconstructedPath = [],
    deconstructedPaths = [],
}: Options): DeconstructedPath[] => {
    const paths = keys(pathLogic) as Path[]
    while (paths.length > 0) {
        const path = paths.shift() as Path
        const currentLogic = pathLogic[path]
        if (typeof currentLogic === "object") {
            return deconstructNestedPaths({
                deconstructedPath: concat(deconstructedPath, [path]),
                deconstructedPaths,
                pathLogic: currentLogic,
        })
        }
        if (isOperationType(currentLogic)) {
        const updatedDeconstructedPath = concat(deconstructedPath, [path])
        deconstructedPaths.push(updatedDeconstructedPath)
        }
    }
    return deconstructedPaths
}

export default deconstructNestedPaths
