import * as fs from 'fs';
import { Range } from './types';

export const getFileData = (fileName: string): string => {
    return fs.readFileSync(fileName, 'utf8');
};

export function parseDatabase(input: string): { ranges: Range[]; ids: number[] } {
    const [rangesBlock, idsBlock = ""] = input.trim().split('\n\n');

    const ranges: Range[] = rangesBlock
        .trim()
        .split('\n')
        .filter(line => line.length > 0)
        .map(line => {
            const [start, end] = line.split('-').map(Number);

            return { start, end };
        });

    const ids: number[] = idsBlock
        .trim()
        .split('\n')
        .filter(line => line.length > 0)
        .map(Number);

    return { ranges, ids };
}

export function mergeRanges(ranges: Range[]): Range[] {
    if (ranges.length === 0) {
        return [];
    }

    const sorted = [...ranges].sort((a, b) =>
        a.start === b.start ? a.end - b.end : a.start - b.start
    );

    const merged: Range[] = [];

    let current = { ...sorted[0] };

    for (let i = 1; i < sorted.length; i++) {
        const r = sorted[i];

        if (r.start <= current.end + 1) {
            current.end = Math.max(current.end, r.end);
        } else {
            merged.push(current);
            current = { ...r };
        }
    }

    merged.push(current);

    return merged;
}
