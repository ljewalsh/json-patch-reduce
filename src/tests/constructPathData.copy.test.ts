import test from "ava"
import constructPathData from "../constructPathData"
import { CopyOperation, OPERATION_TYPE, RemoveOperation, ReplaceOperation } from "../types"

const { ADD, COPY, REMOVE, REPLACE, REPLACE_COPY } = OPERATION_TYPE

test("returns expected logic when the patch includes a lone copy operation", (t) => {
    const patch = [
        {
            from: "/foo",
            op: COPY,
            path: "/bar",
        } as CopyOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({ patch })

    const expectedLogic = {
        bar: COPY,
    }
    const expectedPathValues = {
        bar: "/foo",
    }

    const expectedPaths = [["bar"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})

test("returns expected logic when the patch includes a copu then remove operation", (t) => {
    const patch = [
        {
            from: "/foo",
            op: COPY,
            path: "/bar",
        } as CopyOperation,
        {
            op: REMOVE,
            path: "/bar",
        } as RemoveOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({patch})

    const expectedLogic = {}
    const expectedPathValues = {}
    const expectedPaths = [["bar"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})

test("returns expected logic when the patch includes a copy then replace operation", (t) => {
    const patch = [
        {
            from: "/foo",
            op: COPY,
            path: "/bar",
        } as CopyOperation,
        {
            op: REPLACE,
            path: "/bar",
            value: "bop",
        } as ReplaceOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({patch})

    const expectedLogic = {
        bar: ADD,
    }
    const expectedPathValues = {
        bar: "bop",
    }
    const expectedPaths = [["bar"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})

test("returns expected logic when the patch includes a replace then a copy operation", (t) => {
    const patch = [
        {
            op: REPLACE,
            path: "/foo",
            value: "bop",
        } as ReplaceOperation,
        {
            from: "/foo",
            op: COPY,
            path: "/bar",
        } as CopyOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({patch})

    const expectedLogic = {
        bar: COPY,
        foo: REPLACE,
    }
    const expectedPathValues = {
        bar: "/foo",
        foo: "bop",
    }
    const expectedPaths = [["foo"], ["bar"]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})
