import { Operation } from './types'

import organisePatchByPaths from './organisePatchByPaths'

const reducePath = (patch: Operation[] ) => {
    const patchByPaths = organisePatchByPaths(patch, {})

}

export default reducePath
