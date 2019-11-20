import test from "ava"
import reconstructPatch from "../reconstructPatch"
import {
    AddOperation,
    CopyOperation,
    MoveOperation,
    OPERATION_TYPE,
    PathLogic,
    Paths,
    PathValues,
    RemoveOperation,
    ReplaceOperation,
} from "../types"

const { ADD, REMOVE, REPLACE, ADD_REPLACE, MOVE, COPY } = OPERATION_TYPE

test("Empty pathLogic and pathValues evaluates to an empty patch", (t) => {
    const pathLogic: PathLogic = {}
    const pathValues: PathValues = {}
    const paths: Paths = []

    const reconstructedPatch = reconstructPatch({ pathLogic, pathValues, paths })

    t.deepEqual(reconstructedPatch, [])
})

test("pathLogic properties with the add value evaluate to a add-operation with the correct value", (t) => {
    const pathLogic: PathLogic  = {
        foo: ADD,
    }

    const pathValues: PathValues = {
        foo: "bar",
    }

    const paths: Paths = [["foo"]]

    const expectedPatch = [{
        op: ADD, path: "/foo", value: "bar",
    } as AddOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic, pathValues, paths,
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test("pathLogic properties with the replace value evaluate to a replace-operation with the correct value", (t) => {
    const pathLogic: PathLogic  = {
        foo: REPLACE,
    }

    const pathValues: PathValues = {
        foo: "bar",
    }

    const paths = [["foo"]]

    const expectedPatch = [{
        op: REPLACE, path: "/foo", value: "bar",
    } as ReplaceOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic,
        pathValues,
        paths,
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test("pathLogic properties with the remove value evaluate to a remove operation", (t) => {
    const pathLogic: PathLogic  = {
        foo: REMOVE,
    }

    const pathValues: PathValues = {}
    const paths: Paths = [["foo"]]

    const expectedPatch = [{
        op: REMOVE, path: "/foo",
    } as RemoveOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic,
        pathValues,
        paths,
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test("pathLogic properties with the move value evaluate to a move operation", (t) => {
    const pathLogic: PathLogic  = {
        foo: MOVE,
    }

    const pathValues: PathValues = {
        foo: "/bar",
    }

    const paths = [["foo"]]

    const expectedPatch = [{
        from: "/bar",
        op: MOVE,
        path: "/foo",
    } as MoveOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic,
        pathValues,
        paths,
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test.skip("pathLogic properties with the copy value evaluate to a copy operation", (t) => {
    const pathLogic: PathLogic  = {
        foo: COPY,
    }

    const pathValues: PathValues = {
        foo: "/bar",
    }

    const paths = [["foo"]]

    const expectedPatch = [{
        from: "/bar",
        op: COPY,
        path: "/foo",
    } as CopyOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic,
        pathValues,
        paths,
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})

test("pathLogic properties with the add_replace value evaluate to a add operation with the correct value", (t) => {
    const pathLogic: PathLogic  = {
        foo: ADD_REPLACE,
    }

    const pathValues: PathValues = {
        foo: "bar",
    }

    const paths = [["foo"]]

    const expectedPatch = [{
        op: ADD, path: "/foo", value: "bar",
    } as AddOperation ]

    const reconstructedPatch = reconstructPatch({
        pathLogic,
        pathValues,
        paths,
    })

    t.deepEqual(reconstructedPatch, expectedPatch)
})
