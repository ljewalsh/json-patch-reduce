
const structure = [
    [
        {
        op: 'remove',
        path: '/foo'
    },
        {
        op: 'add',
        path: '/foo',
        value: 'bar'
    },
        {
        op: 'remove',
        path: '/foo'
    },
    ],
    [
        {
        op: 'add',
        path: '/bar',
        value: 'baz'
    },
        // {
        //     op: 'replace',
        //     path: '/bar',
        //     value: 'potato'
        // }
    ]
]

const nemesises = {
    'add': 'remove',
    'remove': 'add'
}


const reduceOperations = (operations) => {
    while (operations.length > 1){
        let reducedOperations = []
        const currentOperation = operations.shift()
        const nemesis = nemesises[currentOperation.op]
        for (remainingOp of operations){
            if (remainingOp.op === nemesis){
                    return reduceOperations(operations.splice(0))
                }
                else {
                    reducedOperations.push(remainingOp)
                }
            }
        console.log('here')
            reducedOperations = [ currentOperation ].concat(reducedOperations)
            return reduceOperations(reducedOperations)
        }
    return operations
}

const test = (structure) => {
    const reducedPatch = []
    for (const pathOperations of structure){
        if (pathOperations.length === 1){
            reducedPatch.push(pathOperations[0])
        }
        else {
            const reducedOperations = reduceOperations(pathOperations)
            reducedPatch.concat(reducedOperations)
        }
    }
    return reducedPatch
}

const reducedPatch = test(structure)
console.log(reducedPatch)
