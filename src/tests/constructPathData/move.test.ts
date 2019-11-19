import test from "ava"
import { OPERATION_TYPE, AddOperation, RemoveOperation, ReplaceOperation, MoveOperation } from "../../types"
import constructPathData from "../../constructPathData"

const { ADD, REPLACE, REMOVE, ADD_REPLACE, MOVE } = OPERATION_TYPE

test("returns expected logic when the patch includes a lone move operation", t => {
    const patch = [
        {
            op: MOVE,
            path: "/foo",
            from: "/bar"
            } as MoveOperation
    ]

    const { pathLogic, pathValues } = constructPathData(patch)

    const expectedLogic = {
        foo: MOVE
    }

    const expectedPathValues = {
        foo: '/bar'
    }

    t.deepEqual(pathLogic, expectedLogic)
    t.deepEqual(pathValues, expectedPathValues)
})
