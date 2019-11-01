import { OrganisedPatch, Operation } from './types';
declare const organisePatchByPaths: (patch: Operation[], patchByPaths: OrganisedPatch) => OrganisedPatch;
export default organisePatchByPaths;
