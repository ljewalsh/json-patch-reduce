import test from "ava"
import constructPathData from "../constructPathData"
import { AddOperation, MoveOperation, OPERATION_TYPE, RemoveOperation, ReplaceOperation } from "../types"

const { ADD, REPLACE, REMOVE, ADD_REPLACE, MOVE } = OPERATION_TYPE

test("returns expected logic when the patch includes a lone add operation", (t) => {
    const patch = [
        {
            op: ADD,
            path: "/foo",
            value: "baz",
        } as AddOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({ patch })

    const expectedLogic = {
        foo: ADD,
    }
    const expectedPathValues = {
        foo: "baz",
    }

    const expectedPaths = [["foo"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})

test("returns expected logic when the patch includes an add then remove operation", (t) => {
    const patch = [
        {
            op: ADD,
            path: "/foo",
            value: "baz",
        } as AddOperation,
        {
            op: REMOVE,
            path: "/foo",
        } as RemoveOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({patch})

    const expectedLogic = {}
    const expectedPathValues = {}
    const expectedPaths = [["foo"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})
