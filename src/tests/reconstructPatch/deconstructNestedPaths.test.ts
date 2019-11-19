import test from "ava"
import deconstructNestedPaths from "../../reconstructPatch/deconstructNestedPaths"
import { OPERATION_TYPE } from "../../types"

const { ADD, REMOVE } = OPERATION_TYPE

test("Returns a simple path as is", (t) => {
    const pathLogic = {
        foo: ADD,
    }

    const deconstructedPaths = deconstructNestedPaths({ pathLogic })
    t.deepEqual(deconstructedPaths, [["foo"]])
})

test("Can deconstruct a simple nested path", (t) => {
    const pathLogic = {
        foo: {
            bar: ADD,
        },
    }

    const deconstructedPath = deconstructNestedPaths({ pathLogic })

    t.deepEqual(deconstructedPath, [["foo", "bar"]])
})

test("Can deconstruct a complex nested path", (t) => {
    const pathLogic = {
        foo: {
            bar: ADD,
            baz: REMOVE,
        },
    }

    const deconstructedPath = deconstructNestedPaths({ pathLogic })

    t.deepEqual(deconstructedPath, [["foo", "bar"], ["foo", "baz"]])
})

test("Can deconstruct a path with an array", (t) => {
    const pathLogic = {
        foo: {
            bar: [ ADD, REMOVE ],
        },
    }

    const deconstructedPath = deconstructNestedPaths({ pathLogic })

    t.deepEqual(deconstructedPath, [["foo", "bar", "0"], ["foo", "bar", "1"]])
})

test("Does not include array paths that are not operation types", (t) => {
    const pathLogic = {
        foo: {
            bar: [ "one", REMOVE ],
        },
    }

    const deconstructedPath = deconstructNestedPaths({ pathLogic })

    t.deepEqual(deconstructedPath, [["foo", "bar", "1"]])
})
