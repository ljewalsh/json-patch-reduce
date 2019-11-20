# json-patch-reduce

A library for reducing a JSON patch (http://jsonpatch.com/)

# How does it work?

json-patch-reduce looks for operations in your patch that contradict each other or that can be simplified. Works for nested paths (e.g. "/foo/bar") as well as paths with array indexes (e.g. "foo/bar/0").

# Examples

Conflicting add and remove operations are stripped out (regardless of order):

```
original patch:

[
        { op: "add", path: "/foo", value: "bar" },
        { op: "add", path: "/bar", value: "baz" },
        { op: "remove", path: "/foo" }
]

reduced patch:

[
        { op: "add", path: "/bar", value: "baz" }
]
```

Conflicting replace and remove operations are stripped out:

```
original patch:

[
        { op: "replace", path: "/foo/bar", value: "bar" },
        { op: "add", path: "/bar", value: "baz" },
        { op: "remove", path: "/foo" }
]

reduced patch:

[
        { op: "add", path: "/bar", value: "baz" }
]
```

Correlating adds and replaces are simplified:

```
original patch:

[
        { op: "add", path: "/foo", value: "baz" },
        { op: "replace", path: "/foo", value: "bar" },
]

reduced patch:

[
        { op: "add", path: "/foo", value: "bar" },
]
```

Correlating adds and moves are simplified:

```
original patch:

[
        { op: "add", path: "/foo", value: "bar" },
        { op: "move", path: "/baz", from: "/foo" },
]

reduced patch:

[
        { op: "add", path: "/baz", value: "bar" },
]
```

Correlating moves and removes are simplified:

```
original patch:

[
        { op: "move", path: "/baz", from: "/foo" },
        { op: "remove", path: "/baz" }
]

reduced patch:

[
        { op: "remove", path: "/foo" },
]
```

Correlating copy and replaces are simplified:

```
original patch:

[
        { op: "copy", path: "/bar", from: "/foo" },
        { op: "replace", path: "/baz" }
]

reduced patch:

[
        { op: "add", path: "/bar", value: "/baz" },
]
```
