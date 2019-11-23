import test from "ava"
import reducePatch from "../"
import { AddOperation, CopyOperation, MoveOperation, OPERATION_TYPE, RemoveOperation, ReplaceOperation } from "../types"

const { ADD, COPY, REMOVE, REPLACE, MOVE } = OPERATION_TYPE

test("A lone add-operation is maintainted", (t) => {
    const patch = [
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test("Conflicting add and remove operations are stripped out", (t) => {

    const patch = [
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,

        { op: ADD, path: "/bar", value: "baz" } as AddOperation,

        { op: REMOVE, path: "/foo" } as RemoveOperation,
    ]

    const expectedPatch = [
        { op: ADD, path: "/bar", value: "baz" } as AddOperation,
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPatch, reducedPatch)
})

test("correlating add and replace operations are simplified", (t) => {

    const patch = [
        { op: ADD, path: "/foo", value: "baz" } as AddOperation,
        { op: REPLACE, path: "/foo", value: "bar" } as ReplaceOperation,

    ]

    const expectedPath = [
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPath, reducedPatch)
})

test("An add followed by a move is simplified", (t) => {
    const patch = [
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,
        { from: "/foo", op: MOVE, path: "/bar" } as MoveOperation,
    ]

    const expectedPatch = [
        { op: ADD, path: "/bar", value: "bar" } as AddOperation ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(expectedPatch, reducedPatch)
})

test("An add followed by a copy is maintained", (t) => {
    const patch = [
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,
        { from: "/foo", op: COPY, path: "/bar" } as CopyOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})
