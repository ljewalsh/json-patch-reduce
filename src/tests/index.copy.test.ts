import test from "ava"
import reducePatch from "../"
import { AddOperation, CopyOperation, MoveOperation, OPERATION_TYPE, Patch, RemoveOperation, ReplaceOperation } from "../types"

const { ADD, COPY, MOVE, REMOVE, REPLACE } = OPERATION_TYPE

test("A lone copy-operation is maintainted", (t) => {
    const patch = [
        { from: "/bar", op: COPY, path: "/foo" } as CopyOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test("A copy-operation followed by a remove-operation is simplified", (t) => {
    const patch = [
        { from: "/bar", op: COPY, path: "/foo" } as CopyOperation,
        { op: REMOVE, path: "/foo" } as RemoveOperation,
    ]

    const expectedPatch: Patch = []

    const reducedPatch = reducePatch(patch)
    t.deepEqual(expectedPatch, reducedPatch)
})

test("A copy followed by a replace is simplified", (t) => {
    const patch = [
        { from: "/foo", op: COPY, path: "/bar" } as CopyOperation,
        { op: REPLACE, path: "/bar", value: "baz" } as ReplaceOperation,
    ]

    const expectedPatch = [{
        op: ADD, path: "/bar", value: "baz",
    } as AddOperation ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(expectedPatch, reducedPatch)
})

test("A copy followed by a move is simplified", (t) => {
    const patch = [
        { from: "/foo", op: COPY, path: "/bar" } as CopyOperation,
        { from: "/bar", op: MOVE, path: "/bop" } as MoveOperation,
    ]

    const expectedPatch = [{ from: "/foo", op: COPY, path: "/bop" } as CopyOperation]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(expectedPatch, reducedPatch)
})
