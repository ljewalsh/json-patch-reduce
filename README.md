# json-patch-reduce

A library for reducing a JSON patch (http://jsonpatch.com/)

# How does it work?

json-patch-reduce looks for operations in your patch that contradict each other or that can be simplified.

# Examples

Conflicting add and remove operations are stripped out (regardless of order):

```
original path:

[
        { op: "add", path: "/foo/bar", value: "bar" },
        { op: "add", path: "/bar", value: "baz" },
        { op: "remove", path: "/foo" }
]

reduced path:
[
        { op: "add", path: "/bar", value: "baz" }
]
```

Conflicting replace and remove operations are stripped out:

```
original path:

[
        { op: "replace", path: "/foo/bar", value: "bar" },
        { op: "add", path: "/bar", value: "baz" },
        { op: "remove", path: "/foo" }
]

reduced path:
[
        { op: "add", path: "/bar", value: "baz" }
]
```

Correlating adds and replaces are simplified:

```
original path:
[
        { op: "add", path: "/foo", value: "baz" },
        { op: "replace", path: "/foo", value: "bar" },
]

reduced path:
[
        { op: "add", path: "/foo", value: "bar" },
]
```

Correlating adds and moves are simplified:

```
original path:
[
        { op: "add", path: "/foo", value: "bar" },
        { op: "move", path: "/baz", from: "/foo" },
]

reduced path:
[
        { op: "add", path: "/baz", value: "bar" },
]
```

Correlating moves and removes are simplified:

```
original path:
[
        { op: "move", path: "/baz", from: "/foo" },
        { op: "remove", path: "/baz" }
]

reduced path:
[
        { op: "remove", path: "/foo" },
]
```


