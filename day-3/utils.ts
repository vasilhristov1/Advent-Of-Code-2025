import * as fs from 'fs';

export const getFileData = (fileName: string): string => {
    return fs.readFileSync(fileName, 'utf8');
};

export function maxJoltageForBank(line: string, digitsToUse: number): number {
    const n = line.length;
    let startIndex = 0;
    let result = '';

    for (let pos = 0; pos < digitsToUse; pos++) {
        const remaining = digitsToUse - pos;
        const maxStart = n - remaining;

        let bestDigit = -1;
        let bestIndex = -1;

        for (let i = startIndex; i <= maxStart; i++) {
            const digit = parseInt(line[i]);

            if (digit > bestDigit) {
                bestDigit = digit;
                bestIndex = i;

                if (digit === 9) {
                    break;
                }
            }
        }

        result += String(bestDigit);
        startIndex = bestIndex + 1;
    }

    return Number(result);
}
