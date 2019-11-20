import test from "ava"
import constructPathData from "../../constructPathData"
import { AddOperation, MoveOperation, OPERATION_TYPE, RemoveOperation, ReplaceOperation } from "../../types"

const { ADD, REPLACE, REMOVE, ADD_REPLACE, MOVE } = OPERATION_TYPE

test("returns expected logic and value when the patch includes a lone replace operation", (t) => {
    const patch = [
        {
            op: REPLACE,
            path: "/foo",
            value: "baz",
        } as ReplaceOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({ patch })

    const expectedLogic = {
        foo: REPLACE,
    }

    const expectedPathValues = {
        foo: "baz",
    }

    const expectedPaths = [[ "foo" ]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})

test("returns expected logic when the patch includes a replace then remove operation", (t) => {
    const patch = [
        {
            op: REPLACE,
            path: "/foo",
            value: "baz",
        } as ReplaceOperation,
        {
            op: REMOVE,
            path: "/foo",
        } as RemoveOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({ patch })

    const expectedLogic = {
        foo: REMOVE,
    }
    const expectedPathValues = {}
    const expectedPaths = [["foo"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})

test("returns expected logic when the patch includes an add then a replace operation", (t) => {
    const patch = [
        {
            op: ADD,
            path: "/foo",
            value: "initialValue",
            } as AddOperation,
        {
            op: REPLACE,
            path: "/foo",
            value: "updatedValue",
         } as ReplaceOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({ patch })

    const expectedLogic = {
        foo: ADD_REPLACE,
    }
    const expectedPathValues = {
        foo: "updatedValue",
    }
    const expectedPaths = [["foo"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
})

test("returns expected logic when the patch includes an add, replace, and then a remove operation", (t) => {
    const patch = [
        {
            op: ADD,
            path: "/foo",
            value: "initialValue",
        } as AddOperation,
        {
            op: REPLACE,
            path: "/foo",
            value: "updatedValue",
        } as ReplaceOperation,
        {
            op: REMOVE,
            path: "/foo",
        } as RemoveOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({ patch })

    const expectedLogic = {}
    const expectedPathValues = {}
    const expectedPaths = [["foo"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})
