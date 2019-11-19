import test from 'ava'
import { OPERATION_TYPE } from '../types'
import deconstructNestedPaths from '../deconstructNestedPaths'

const { ADD, REMOVE } = OPERATION_TYPE


test('Returns a simple path as is', t=> {
    const pathLogic = {
        'foo': ADD
    }

    const deconstructedPaths = deconstructNestedPaths(pathLogic)
    t.deepEqual(deconstructedPaths, [['foo']])
})

test('Can deconstruct a simple nested path', t=> {
    const pathLogic = {
        'foo': {
            'bar': ADD
        }
    }

    const deconstructedPath = deconstructNestedPaths(pathLogic)

    t.deepEqual(deconstructedPath, [['foo','bar']])
})

test('Can deconstruct a complex nested path', t=> {
    const pathLogic = {
        'foo': {
            'bar': ADD,
            'baz': REMOVE
        }
    }

    const deconstructedPath = deconstructNestedPaths(pathLogic)

    t.deepEqual(deconstructedPath, [['foo','bar'], ['foo', 'baz']])
})
