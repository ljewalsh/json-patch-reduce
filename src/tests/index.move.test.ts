import test from "ava"
import reducePatch from "../"
import { AddOperation, MoveOperation, OPERATION_TYPE, Patch, RemoveOperation, ReplaceOperation } from "../types"

const { MOVE, ADD, REPLACE, REMOVE } = OPERATION_TYPE

test("A lone move is maintainted", (t) => {
    const patch = [
        { from: "/bar", op: MOVE, path: "/foo" } as MoveOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test("A move followed by a remove is simplified", (t) => {
    const patch = [
        { from: "/bar", op: MOVE, path: "/foo" } as MoveOperation,
        { op: REMOVE, path: "/foo" } as RemoveOperation,
    ]

    const expectedPatch = [{ op: REMOVE, path: "/bar" } as RemoveOperation ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(expectedPatch, reducedPatch)
})
