import test from "ava"
import reducePatch from "../"
import { AddOperation, MoveOperation, OPERATION_TYPE, Patch, RemoveOperation, ReplaceOperation } from "../types"

const { MOVE, ADD, REPLACE, REMOVE } = OPERATION_TYPE

test("A lone move-operation is maintainted", (t) => {
    const patch = [
        { from: "/bar", op: MOVE, path: "/foo" } as MoveOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})

test("A move-operation followed by a remove-operation is simplified", (t) => {
    const patch = [
        { from: "/bar", op: MOVE, path: "/foo" } as MoveOperation,
        { op: REMOVE, path: "/foo" } as RemoveOperation,
    ]

    const expectedPatch = [{ op: REMOVE, path: "/bar" } as RemoveOperation ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(expectedPatch, reducedPatch)
})

test("An add followed by a move is simplified", (t) => {
    const patch = [
        { op: ADD, path: "/foo", value: "bar" } as AddOperation,
        { from: "/foo", op: MOVE, path: "/bar" } as MoveOperation,
    ]

    const expectedPatch = [
        { op: ADD, path: "/bar", value: "bar" } as AddOperation ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(expectedPatch, reducedPatch)
})

test("A replace followed by a move are both maintained", (t) => {
    const patch = [
        { op: REPLACE, path: "/foo", value: "bar" } as ReplaceOperation,
        { from: "/foo", op: MOVE, path: "/bar" } as MoveOperation,
    ]

    const reducedPatch = reducePatch(patch)
    t.deepEqual(patch, reducedPatch)
})
