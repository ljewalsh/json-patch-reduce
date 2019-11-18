import test from 'ava'
import { AddOperation, RemoveOperation, ReplaceOperation, OPERATION_TYPE } from '../types'
import reducePatch from '../'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

test('A lone replace-operation is maintainted', t => {
    const patch = [
        { op: REPLACE, path: "/foo", value: 'bar' } as ReplaceOperation
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test('A replace-operation followed by a remove-operation is stripped out', t => {

    const patch = [
        { "op": REPLACE, "path": "/foo", "value": "bar" } as ReplaceOperation,
        { "op": REMOVE, "path": "/foo" } as RemoveOperation
    ]

    const expectedPatch = [
        { "op": REMOVE, "path": "/foo" } as RemoveOperation
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPatch, reducedPatch)
})
