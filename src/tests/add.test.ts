import test from 'ava'
import { AddOperation, RemoveOperation, ReplaceOperation, OPERATION_TYPE } from '../types'
import reducePatch from '../'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

test('A lone add-operation is maintainted', t => {
    const patch = [
        { op: ADD, path: "/foo", value: 'bar' } as AddOperation
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test('An add-operation is stripped out when a later remove-operation conflicts it (the conflicting remove-operation is also stripped out)', t => {

    const patch = [
        { "op": ADD, "path": "/foo", "value": "bar" } as AddOperation,

        { "op": ADD, "path": "/bar", "value": "baz" } as AddOperation,

        { "op": REMOVE, "path": "/foo" } as RemoveOperation
    ]

    const expectedPatch = [
        { "op": ADD, "path": "/bar", "value": "baz" } as AddOperation
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPatch, reducedPatch)
})

test('correlating add and replace operations are simplified', t => {

    const patch = [
        { "op": ADD, "path": "/foo", "value": "baz" } as AddOperation,
        { "op": REPLACE, "path": "/foo", "value": "bar" } as ReplaceOperation,

    ]

    const expectedPath = [
        { "op": ADD, "path": "/foo", "value": "bar" } as AddOperation
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPath, reducedPatch)
})
