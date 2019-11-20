import test from "ava"
import reducePatch from "../"
import { AddOperation,  OPERATION_TYPE, RemoveOperation, ReplaceOperation } from "../types"

const { ADD, REPLACE, REMOVE } = OPERATION_TYPE

test("nested paths are handled correctly", (t) => {
    const patch = [{
        op: ADD,
        path: "/foo/bar",
        value: "baz",
    } as AddOperation,
        {
        op: REMOVE,
        path: "/foo",
        } as RemoveOperation,
    ]

    const expectedPatch = [{
        op: REMOVE,
        path: "/foo",
    } as RemoveOperation ]
    const reducedPatch = reducePatch(patch)

    t.deepEqual(reducedPatch, expectedPatch)
})

test("paths with arrays are handled correctly", (t) => {
    const patch = [{
        op: ADD,
        path: "/foo/bar/1",
        value: "baz",
    } as AddOperation,
        {
            op: REPLACE,
            path: "/foo/bar/1",
            value: "bop",
        } as ReplaceOperation,
    ]
    const paths = [["foo", "bar", "1"]]

    const expectedPatch = [{
        op: ADD, path: "/foo/bar/1", value: "bop",
    } as AddOperation ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPatch, reducedPatch)
})
