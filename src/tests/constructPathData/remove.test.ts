import test from "ava"
import { OPERATION_TYPE, AddOperation, RemoveOperation, ReplaceOperation, MoveOperation } from "../../types"
import constructPathData from "../../constructPathData"

const { ADD, REPLACE, REMOVE, ADD_REPLACE, MOVE } = OPERATION_TYPE

test("returns expected logic when the patch includes a lone remove operation", t => {
    const patch = [
        {
            op: REMOVE,
            path: "/foo",
            } as RemoveOperation
    ]

    const { pathLogic, pathValues } = constructPathData(patch)

    const expectedLogic = {
        foo: REMOVE
    }

    const expectedPathValues = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
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

    const { pathLogic, pathValues } = constructPathData(patch)

    const expectedLogic = {
        foo: REMOVE
    }
    const expectedPathValues = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
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

    const { pathLogic, pathValues } = constructPathData(patch)

    const expectedLogic = {}
    const expectedPathValues = {}

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
})
