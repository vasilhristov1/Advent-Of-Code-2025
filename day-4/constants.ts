export const PAPER = '@';
export const EMPTY = '.';

export interface Cell {
    row: number;
    col: number;
}

export const directions: Array<[number, number]> = [
    [-1, -1], [-1, 0], [-1, 1],
    [ 0, -1],          [ 0, 1],
    [ 1, -1], [ 1, 0], [ 1, 1],
];