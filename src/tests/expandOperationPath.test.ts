import test from 'ava'
import expandOperationPath from '../expandOperationPath'

test('Expands path composed of one sub-path to correct data structure', async (t) => {
    const operation = { "op": "add", "path": "/foo", "value": "bar" }
    const path = operation.path
    const paths = path.split('/').splice(1)

    const data = expandOperationPath({ paths, operation, data: {} })

    const expectedData = {
        'foo': {
            '/': [{ "op": "add", "path": "/foo", "value": "bar" }] 
        }
    }

    t.deepEqual(expectedData, data)
})

test('Expands path composed of more than one sub-path to expected data structure', async (t) => {
    const operation = { "op": "add", "path": "/foo/bar/pop", "value": "bar" }
    const path = operation.path
    const paths = path.split('/').splice(1)

    const data = expandOperationPath({ paths, operation, data: {} })

    const expectedData = {
        'foo': {
            'bar': {
                'pop': { 
                    '/': [ { "op": "add", "path": "/foo/bar/pop", "value": "bar" }]
                }
            }
        }
    }

    t.deepEqual(data, expectedData)
})
