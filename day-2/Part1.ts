// CONSTANTS
import { RANGE_DIVIDER } from './constants';

// UTILS
import { getFileData, hasRepeatedPattern, parseIdRange } from './utils';

async function main() {
    let sumOfInvalidIds = 0;

    const ranges = getFileData('input.txt')
        .trim()
        .split(RANGE_DIVIDER)
        .filter(r => r.length > 0);

    for (const range of ranges) {
        const [start, end] = parseIdRange(range);

        for (let id = start; id <= end; id++) {
            if (hasRepeatedPattern(id, 2, 2)) {
                sumOfInvalidIds += id;
            }
        }
    }

    console.log(`Sum of invalid IDs: ${sumOfInvalidIds}`);
}

main().catch(console.error);