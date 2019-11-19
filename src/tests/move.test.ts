import test from 'ava'
import { Patch, OPERATION_TYPE, MoveOperation, AddOperation, ReplaceOperation } from '../types'
import reducePatch from '../'

const { MOVE } = OPERATION_TYPE

test('A lone move-operation is maintainted', t => {
    const patch = [
        { op: MOVE, path: "/foo", from: "/bar" } as MoveOperation
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})
