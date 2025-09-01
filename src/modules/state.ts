export const state = { whoseTurn: undefined };

export type Tag = "X" | "0";

export type Player = {
    tag: Tag;
    name?: string;
}