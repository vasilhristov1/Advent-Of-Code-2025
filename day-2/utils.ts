import * as fs from 'fs';

// CONSTANTS
import { ID_RANGE_DIVIDER } from './constants';

export const getFileData = (fileName: string): string => {
    return fs.readFileSync(fileName, 'utf8');
}

export function parseIdRange(range: string): [number, number] {
  const [start, end] = range.split(ID_RANGE_DIVIDER).map(Number);

  return [start, end];
}

export function hasRepeatedPattern(id: number, minRepeats: number = 2, maxRepeats: number = Infinity): boolean {
    const stringNumber = String(id);
    const numberLength = stringNumber.length;

    const maxBlockLen = Math.floor(numberLength / minRepeats);

    for (let blockLen = 1; blockLen <= maxBlockLen; blockLen++) {
        if (numberLength % blockLen !== 0) {
            continue;
        }

        const repeats = numberLength / blockLen;

        if (repeats < minRepeats || repeats > maxRepeats) {
            continue;
        }

        const block = stringNumber.slice(0, blockLen);

        if (block.repeat(repeats) === stringNumber) {
            return true;
        }
    }

    return false;
}