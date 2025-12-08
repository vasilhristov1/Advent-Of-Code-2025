import { getFileData, mergeRanges, parseDatabase } from "./utils";
import { Range } from "./types";

function countAllFreshFromRanges(ranges: Range[]): number {
    const merged = mergeRanges(ranges);

    let total = 0;

    for (const r of merged) {
        total += (r.end - r.start + 1);
    }

    return total;
}

async function main() {
    const data = getFileData('input.txt');
    const { ranges } = parseDatabase(data);

    const result = countAllFreshFromRanges(ranges);

    console.log('Total fresh IDs:', result);
}

main().catch(console.error);
