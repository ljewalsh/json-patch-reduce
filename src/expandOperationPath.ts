import { Operation } from './types'

interface Options {
    paths: string[],
    operation: Operation,
    data: Record<string, any>
}

const expandOperationPath = ({paths, operation, data}: Options) => {
    const currentPath = paths.shift() as string
    if (paths.length > 0){
        data[ currentPath ] = expandOperationPath({ paths, operation, data: {} })
        return data
    }
    data[ currentPath ] = {
        '/':  [ operation ]
    }
    return data
}

export default expandOperationPath
