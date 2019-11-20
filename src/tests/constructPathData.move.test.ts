import test from "ava"
import constructPathData from "../constructPathData"
import { AddOperation, MoveOperation, OPERATION_TYPE, RemoveOperation, ReplaceOperation } from "../types"

const { ADD, REPLACE, REMOVE, ADD_REPLACE, MOVE, MOVE_REMOVE } = OPERATION_TYPE

test("returns expected logic when the patch includes a lone move operation", (t) => {
    const patch = [
        {
            from: "/bar",
            op: MOVE,
            path: "/foo",
        } as MoveOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({ patch })

    const expectedLogic = {
        foo: MOVE,
    }

    const expectedPathValues = {
        foo: "/bar",
    }

    const expectedPaths = [[ "foo" ]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})

test("returns expected logic when the patch includes a move and then a remove operation", (t) => {
    const patch = [
        {
            from: "/bar",
            op: MOVE,
            path: "/foo",
        } as MoveOperation,
        {
            op: REMOVE,
            path: "/foo",
        } as RemoveOperation,
    ]

    const { pathLogic, pathValues, paths } = constructPathData({ patch })

    const expectedLogic = {
        foo: MOVE_REMOVE,
    }

    const expectedPathValues = {
        foo: "/bar",
    }

    const expectedPaths = [[ "foo" ]]

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
    t.deepEqual(paths, expectedPaths)
})
