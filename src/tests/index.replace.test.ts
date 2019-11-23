import test from "ava"
import reducePatch from "../"
import { AddOperation, CopyOperation, MoveOperation, OPERATION_TYPE, RemoveOperation, ReplaceOperation } from "../types"

const { ADD, COPY, REMOVE, REPLACE, MOVE } = OPERATION_TYPE

test("A lone replace-operation is maintainted", (t) => {
    const patch = [
        { op: REPLACE, path: "/foo", value: "bar" } as ReplaceOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test("A replace followed by a remove is stripped out", (t) => {

    const patch = [
        { op: REPLACE, path: "/foo", value: "bar" } as ReplaceOperation,
        { op: REMOVE, path: "/foo" } as RemoveOperation,
    ]

    const expectedPatch = [
        { op: REMOVE, path: "/foo" } as RemoveOperation,
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPatch, reducedPatch)
})

test("A replace followed by a move are both maintained", (t) => {
    const patch = [
        { op: REPLACE, path: "/foo", value: "bar" } as ReplaceOperation,
        { from: "/foo", op: MOVE, path: "/bar" } as MoveOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test("A replace followed by a copy is maintained", (t) => {

    const patch = [
        { op: REPLACE, path: "/foo", value: "bar" } as ReplaceOperation,
        { from: "/foo", op: COPY, path: "/baz" } as CopyOperation,
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(patch, reducedPatch)
})
