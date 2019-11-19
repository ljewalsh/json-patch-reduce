import test from 'ava'
import { OPERATION_TYPE, AddOperation, ReplaceOperation, RemoveOperation, PathValues, PathLogic } from '../../types'
import reconstructPatch from '../../reconstructPatch'

const { ADD, REMOVE, REPLACE, ADD_REPLACE } = OPERATION_TYPE

test('Empty pathLogic and pathValuess evaluates to an empty patch', t => {
    const pathLogic: PathLogic = {}
    const pathValues: PathValues = {}

    const reconstructedPatch = reconstructPatch({ pathLogic, pathValues })
    
    t.deepEqual(reconstructedPatch, [])
})

test('pathLogic properties  with the add value evaluate to a add-operation with the correct value', t => {
    const pathLogic: PathLogic  = {
        foo: ADD
    }

    const pathValues: PathValues = {
        foo: 'bar'
    }

    const expectedPatch = [{
        op: ADD, path: '/foo', value: 'bar' 
    } as AddOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic, pathValues
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test('pathLogic properties with the replace value evaluate to a replace-operation with the correct value', t => {
    const pathLogic: PathLogic  = {
        foo: REPLACE
    }

    const pathValues: PathValues = {
        foo: 'bar'
    }

    const expectedPatch = [{
        op: REPLACE, path: '/foo', value: 'bar' 
    } as ReplaceOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic, pathValues
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test('pathLogic properties with the remove value evaluate to a remove operation', t => {
    const pathLogic: PathLogic  = {
        foo: REMOVE
    }

    const pathValues: PathValues = {}

    const expectedPatch = [{
        op: REMOVE, path: '/foo' 
    } as RemoveOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic, pathValues
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test('pathLogic properties with the add_replace value evaluate to a add operation with the correct value', t => {
    const pathLogic: PathLogic  = {
        foo: ADD_REPLACE
    }

    const pathValues: PathValues = {
        foo: 'bar'
    }

    const expectedPatch = [{
        op: ADD, path: '/foo', value: 'bar' 
    } as AddOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic, pathValues
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test('nested paths are handled correctly', t => {
    const pathLogic: PathLogic  = {
        foo: {
            bar: ADD
        }
    }

    const pathValues: PathValues = {
        foo: {
            bar: 'baz'
        }
    }

    const expectedPatch = [{
        op: ADD, path: '/foo/bar', value: 'baz' 
    } as AddOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic, pathValues
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})
