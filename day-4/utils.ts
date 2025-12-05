import * as fs from 'fs';

// CONSTANTS & TYPES
import { Cell, directions, EMPTY, PAPER } from './constants';

export const getFileData = (fileName: string): string => {
    return fs.readFileSync(fileName, 'utf8');
};

export const isPaper = (char: string): boolean => char === PAPER;

export function countAdjacentPaper(grid: string[], row: number, col: number): number {
    let count = 0;

    for (const [di, dj] of directions) {
        const ni = row + di;
        const nj = col + dj;

        if (ni < 0 || ni >= grid.length) continue;
        if (nj < 0 || nj >= grid[ni].length) continue;

        if (isPaper(grid[ni][nj])) {
            count++;
        }
    }

    return count;
}

export function getAccessiblePapers(grid: string[]): Cell[] {
    const result: Cell[] = [];

    for (let i = 0; i < grid.length; i++) {
        const line = grid[i];

        for (let j = 0; j < line.length; j++) {
            const cell = line[j];

            if (!isPaper(cell)) continue;

            const paperCount = countAdjacentPaper(grid, i, j);

            if (paperCount < 4) {
                result.push({ row: i, col: j });
            }
        }
    }

    return result;
}

export function removeCell(grid: string[], cell: Cell): void {
    const row = grid[cell.row];

    grid[cell.row] = row.slice(0, cell.col) + EMPTY + row.slice(cell.col + 1);
}