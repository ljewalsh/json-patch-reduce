import test from "ava"
import reducePatch from "../"
import { AddOperation, CopyOperation, OPERATION_TYPE, Patch, RemoveOperation, ReplaceOperation } from "../types"

const { ADD, COPY, REPLACE, REMOVE } = OPERATION_TYPE

test("A lone remove-operation is maintainted", (t) => {
    const patch = [
        { op: REMOVE, path: "/foo" } as RemoveOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test("Conflicting remove and then add operations are stripped out", (t) => {

    const patch = [
        { op: REMOVE, path: "/foo" } as RemoveOperation,
        { op: ADD, path: "/bar", value: "baz" } as AddOperation,
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,
    ]

    const expectedPatch = [
        { op: ADD, path: "/bar", value: "baz" } as AddOperation,
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPatch, reducedPatch)
})

test("A remove operation with nested\
    paths strips out all add, replace and copy operations within the path", (t) => {
    const patch = [
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,
        { op: ADD, path: "/foo/bar", value: "baz" } as AddOperation,
        { op: REPLACE, path: "/foo/bar", value: "bar" } as ReplaceOperation,
        { from: "/foo/bar", op: COPY, path: "/foo/bar/baz" } as CopyOperation,
        { op: REMOVE, path: "/foo" } as RemoveOperation,
    ]

    const expectedPatch: Patch = [{ op: REMOVE, path: "/foo" } as RemoveOperation ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(expectedPatch, reducedPatch)
})
