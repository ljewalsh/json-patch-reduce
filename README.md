# json-patch-reduce

A library for reducing a JSON patch (http://jsonpatch.com/)

# How does it work?

json-patch-reduce looks for operations in your patch that contradict each other or that can be simplified.

For example, correlating add and remove operations are stripped out:

```
original path:

[
        { op: "add", path: "/foo", value: "bar" },
        { op: "add", path: "/bar", value: "baz" },
        { op: "remove", path: "/foo" }
]

reduced path:
[
        { op: "add", path: "/bar", value: "baz" }
]
```

Simplification example:

```
[
        { op: "add", path: "/foo", value: "baz" },
        { op: "replace", path: "/foo", value: "bar" },
]

[
        { op: "add", path: "/foo", value: "bar" },
]
```

