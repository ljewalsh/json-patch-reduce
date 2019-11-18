import test from 'ava'
import { Patch, OPERATION_TYPE, RemoveOperation, AddOperation, ReplaceOperation } from '../types'
import reducePatch from '../'

const { ADD, REPLACE, REMOVE, ADD_REPLACE } = OPERATION_TYPE

test('A lone remove-operation is maintainted', t => {
    const patch = [
        { op: REMOVE, path: "/foo" } as RemoveOperation
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test('A remove-operation is stripped out when a later add-operation conflicts it (the conflicting add-operation is also stripped out)', t => {

    const patch = [
        { "op": REMOVE, "path": "/foo" } as RemoveOperation,
        { "op": ADD, "path": "/bar", "value": "baz" } as AddOperation,
        { "op": ADD, "path": "/foo", "value": "bar" } as AddOperation,
    ]

    const expectedPatch = [
        { "op": ADD, "path": "/bar", "value": "baz" } as AddOperation
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPatch, reducedPatch)
})

test.only('A remove operation with nested paths strips out all add-operations within the path', t=> {
    const patch = [
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,
        { op: ADD, path: "/foo/bar", value: "baz" } as AddOperation,
        { op: REMOVE, path: "/foo" } as RemoveOperation
    ]

    const expectedPatch: Patch = []
    const reducedPatch = reducePatch(patch)
    console.dir({ reducedPatch }, { depth: null })
    t.deepEqual(expectedPatch, reducedPatch)
})
