export enum OPERATION_TYPE {
    ADD = "add",
    REMOVE = "remove",
    REPLACE = "replace",
    ADD_REPLACE = "add-replace",
    MOVE = "move",
    COPY = "copy",
    MOVE_REMOVE = "move-remove",
    REPLACE_COPY = "replace-copy",
    COPY_MOVE = "copy-move",
}

export type Path = string
export type Paths = string[][]

export interface RemoveOperation {
    op: OPERATION_TYPE.REMOVE
    path: Path
}

export interface AddOperation {
    op: OPERATION_TYPE.ADD
    path: Path
    value: any
}

export interface AddReplaceOperation {
    op: OPERATION_TYPE.ADD_REPLACE
    path: Path
    value: any
}

export interface ReplaceOperation {
    op: OPERATION_TYPE.REPLACE
    path: Path
    value: any
}

export interface MoveOperation {
    op: OPERATION_TYPE.MOVE
    path: Path
    "from": string
}

export interface CopyOperation {
    op: OPERATION_TYPE.COPY
    path: Path
    "from": string
}

export interface CopyMoveOperation {
    op: OPERATION_TYPE.COPY_MOVE,
    path: Path,
    "from": string
}

export type Operation = RemoveOperation |
    AddOperation |
    ReplaceOperation |
    MoveOperation |
    CopyOperation |
    AddReplaceOperation |
    CopyMoveOperation

export type Patch = Operation[]

export interface PathLogic {
    [ property: string ]: Record<string, any> | OPERATION_TYPE
}

export interface PathValues {
    [ key: string ]: any
}

export interface PathData {
    pathValues: PathValues
    pathLogic: PathLogic
    paths: Paths
}
