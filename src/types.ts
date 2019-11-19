export enum OPERATION_TYPE {
    ADD = 'add',
    REMOVE = 'remove',
    REPLACE = 'replace',
    ADD_REPLACE = 'add-replace',
    MOVE = 'move',
    REPLACE_MOVE = 'replace-move'
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

export interface MoveOperation {
    op: OPERATION_TYPE.MOVE,
    path: Path,
    from: Path
}

export type Operation = RemoveOperation | AddOperation | ReplaceOperation | MoveOperation

export type Patch = Operation[]

export interface PathLogic {
    [ property: string ]: Record<string, OPERATION_TYPE> | OPERATION_TYPE
}

export interface PathValues {
    [ key: string ]: any
}

export interface PathData {
    pathValues: PathValues,
    pathLogic: PathLogic
}
