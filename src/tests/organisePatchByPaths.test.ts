import test from 'ava'
import organisePatchByPaths from '../organisePatchByPaths'

test('Operations with paths made up of one sub-path are organised as expected', async (t) => {

    const patch = [
        { "op": "add", "path": "/foo", "value": "bar" },

        { "op": "add", "path": "/bar", "value": "baz" },

        { "op": "remove", "path": "/foo" }
    ]

    const expectedOrganisation = {
        'foo': {
            '/':
            [
                { "op": "add", "path": "/foo", "value": "bar" },
                { "op": "remove", "path": "/foo" }
            ],
        },
        'bar': 
        {
            '/': [
                { "op": "add", "path": "/bar", "value": "baz" }
            ]
        }
    }

    const organisedPatch = organisePatchByPaths(patch, {})

    t.deepEqual(organisedPatch, expectedOrganisation)

})

// test('Operations with paths made up of one or more paths are organised as expected', async (t) => {

//     const patch = [
//         { "op": "add", "path": "/foo/bar", "value": "bar" },

//         { "op": "add", "path": "/bar", "value": "baz" },

//         { "op": "remove", "path": "/foo" }
//     ]

//     const expectedOrganisation = {
//         '/foo': {
//             "bar": [{ "op": "add", "path": "/foo/bar", "value": "bar" }],
//             "/": [{ "op": "remove", "path": "/foo" }]
//         },
//         '/bar': [
//             { "op": "add", "path": "/bar", "value": "baz" },
//         ]
//     }
// })
