export enum OPERATION_TYPE {
    ADD = 'add',
    REMOVE = 'remove',
    REPLACE = 'replace',
    ADD_REPLACE = 'add-replace'
}

export type Path = string

export interface RemoveOperation {
    op: OPERATION_TYPE.REMOVE,
    path: Path
}

export interface AddOperation {
    op: OPERATION_TYPE.ADD,
    path: Path,
    value: any
}

export interface ReplaceOperation {
    op: OPERATION_TYPE.REPLACE,
    path: Path,
    value: any
}

export type Operation = RemoveOperation | AddOperation | ReplaceOperation

export type Patch = Operation[]

export interface PathLogic {
    [ property: string ]: string
}

export interface PathValue {
    [ key: string ]: any
}

export interface PathData {
    pathValue: PathValue,
    pathLogic: PathLogic
}
