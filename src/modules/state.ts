export type Tag = "X" | "0";

export type Player = {
    tag: Tag;
    name?: string;
}

export const state: { whoseTurn: null | Tag } = {
    whoseTurn: null
};