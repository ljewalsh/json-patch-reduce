export interface Operation {
    op: string;
    path: string;
    value?: string;
}
export interface OrganisedPatch {
    [path: string]: Operation[];
}
