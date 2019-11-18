import test from "ava"
import { OPERATION_TYPE, AddOperation, RemoveOperation, ReplaceOperation } from "../types"
import constructPathData from "../constructPathData"

const { ADD, REPLACE, REMOVE, ADD_REPLACE } = OPERATION_TYPE

test("returns expected logic and value when the patch includes a lone replace operation", t => {
    const patch = [
        {
            op: REPLACE,
            path: "/foo",
            value: "baz"
        } as ReplaceOperation
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {
        foo: REPLACE
    }

    const expectedPathValue = {
        foo: "baz"
    }

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})

test("returns expected logic when the patch includes a lone remove operation", t => {
    const patch = [
        {
            op: REMOVE,
            path: "/foo",
            } as RemoveOperation
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {
        foo: REMOVE
    }

    const expectedPathValue = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})

test("returns expected logic when the patch includes a lone add operation", t => {
    const patch = [
        {
            op: ADD,
            path: "/foo",
            value: "baz"
        } as AddOperation
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {
        foo: ADD
    }
    const expectedPathValue = {
        foo: "baz"
    }

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})

test("returns expected logic when the patch includes an add then remove operation", t => {
    const patch = [
        {
            op: ADD,
            path: "/foo",
            value: "baz"
        } as AddOperation,
        {
            op: REMOVE,
            path: "/foo",
        } as RemoveOperation
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {}
    const expectedPathValue = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})

test("returns expected logic when the patch includes a replace then remove operation", t => {
    const patch = [
        {
            op: REPLACE,
            path: "/foo",
            value: "baz"
        } as ReplaceOperation,
        {
            op: REMOVE,
            path: "/foo",
        } as RemoveOperation
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {
        foo: REMOVE
    }
    const expectedPathValue = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})

test("returns expected logic when the patch includes an add then a replace operation", t => {
    const patch = [
        {
            op: ADD,
            path: "/foo",
            value: "initialValue"
            } as AddOperation,
        {
            op: REPLACE,
            path: "/foo",
            value: "updatedValue"
         } as ReplaceOperation,
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {
        foo: ADD_REPLACE
    }
    const expectedPathValue = {
        foo: "updatedValue"
    }

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})


test("returns expected logic when the patch includes an remove then an add operation", t => {
    const patch = [
        {
            op: REMOVE,
            path: "/foo",
        } as RemoveOperation,
        {
            op: ADD,
            path: "/foo",
            value: "baz"
        } as AddOperation,
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {}
    const expectedPathValue = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})

test("returns expected logic when the patch includes an replace then a remove operation", t => {
    const patch = [
        {
            op: REPLACE,
            path: "/foo",
            value: "baz"
        } as ReplaceOperation,
        {
            op: REMOVE,
            path: "/foo",
        } as RemoveOperation,
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {
        foo: REMOVE
    }
    const expectedPathValue = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})

test("returns expected logic when the patch includes an add, replace, and then a remove operation", t => {
    const patch = [
        {
            op: ADD,
            path: "/foo",
            value: "initialValue"
        } as AddOperation,
        {
            op: REPLACE,
            path: "/foo",
            value: "updatedValue"
        } as ReplaceOperation,
        {
            op: REMOVE,
            path: "/foo"
        } as RemoveOperation
    ]

    const { pathLogic, pathValue } = constructPathData(patch)

    const expectedLogic = {}
    const expectedPathValue = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValue, expectedPathValue)
})
