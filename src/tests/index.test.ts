import test from 'ava'
import reducePatch from '../'

test('both the add and remove operations for a path are stripped out when a path is to be removed', t => {

    const patch = [
        { "op": "add", "path": "/foo", "value": "bar" },

        { "op": "add", "path": "/bar", "value": "baz" },

        { "op": "remove", "path": "/foo" }
    ]

    const expectedPath = [
        { "op": "add", "path": "/bar", "value": "baz" }
    ]

    const reducedPatch = reducePatch(patch)

    t.deepEqual(expectedPath, reducedPatch)
})

