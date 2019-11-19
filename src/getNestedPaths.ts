import { Path } from "./types"

const getNestedPaths = (path: Path) => {
    return path.split("/").slice(1)
}

export default getNestedPaths
