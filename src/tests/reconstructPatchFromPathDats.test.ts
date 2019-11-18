import test from 'ava'
import { OPERATION_TYPE, AddOperation, ReplaceOperation, RemoveOperation, PathValue, PathLogic } from '../types'
import reconstructPatchFromPathData from '../reconstructPatchFromPathData'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

test('Empty pathLogic and pathValues evaluates to an empty patch', t => {
    const pathLogic: PathLogic = {}
    const pathValue: PathValue = {}

    const reconstructedPatch = reconstructPatchFromPathData({ pathLogic, pathValue })
    
    t.deepEqual(reconstructedPatch, [])
})

test('pathLogic properties  with the add value evaluate to a add-operation with the correct value', t => {
    const pathLogic: PathLogic  = {
        foo: ADD
    }

    const pathValue: PathValue = {
        foo: 'bar'
    }

    const expectedPatch = [{
        op: ADD, path: '/foo', value: 'bar' 
    } as AddOperation ]

    const reconstructedPatch = reconstructPatchFromPathData({
        pathLogic, pathValue
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test('pathLogic properties with the replace value evaluate to a replace-operation with the correct value', t => {
    const pathLogic: PathLogic  = {
        foo: REPLACE
    }

    const pathValue: PathValue = {
        foo: 'bar'
    }

    const expectedPatch = [{
        op: REPLACE, path: '/foo', value: 'bar' 
    } as ReplaceOperation ]

    const reconstructedPatch = reconstructPatchFromPathData({
        pathLogic, pathValue
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test('pathLogic properties with the remove value evaluate to a remove operation', t => {
    const pathLogic: PathLogic  = {
        foo: REMOVE
    }

    const pathValue: PathValue = {}

    const expectedPatch = [{
        op: REMOVE, path: '/foo' 
    } as RemoveOperation ]

    const reconstructedPatch = reconstructPatchFromPathData({
        pathLogic, pathValue
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test('pathLogic properties with the add_replace value evaluate to a add operation with the correct value', t => {
    const pathLogic: PathLogic  = {
        foo: ADD_REPLACE
    }

    const pathValue: PathValue = {
        foo: 'bar'
    }

    const expectedPatch = [{
        op: ADD, path: '/foo', value: 'bar' 
    } as AddOperation ]

    const reconstructedPatch = reconstructPatchFromPathData({
        pathLogic, pathValue
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test('nested paths are handled correctly', t => {
    const pathLogic: PathLogic  = {
        foo: {
            bar: ADD
        }
    }

    const pathValue: PathValue = {
        foo: {
            bar: 'baz'
        }
    }

    const expectedPatch = [{
        op: ADD, path: '/foo/bar', value: 'baz' 
    } as AddOperation ]

    const reconstructedPatch = reconstructPatchFromPathData({
        pathLogic, pathValue
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})
