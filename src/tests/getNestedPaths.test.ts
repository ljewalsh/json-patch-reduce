import test from "ava"
import getNestedPaths from "../getNestedPaths"

test("returns an array made up of one string when the path has one layer", (t) => {
    const path = "/foo"
    const nestedPaths = getNestedPaths(path)

    t.deepEqual(nestedPaths, ["foo"])
})

test("returns an array made up of two strings when the path has two layers", (t) => {
    const path = "/foo/bar"
    const nestedPaths = getNestedPaths(path)

    t.deepEqual(nestedPaths, ["foo", "bar"])
})

test("maintains array index", (t) => {
    const path = "/foo/bar/0"
    const nestedPaths = getNestedPaths(path)

    t.deepEqual(nestedPaths, ["foo", "bar", "0"])
})
