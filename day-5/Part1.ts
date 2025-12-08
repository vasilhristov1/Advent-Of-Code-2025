import { getFileData, mergeRanges, parseDatabase } from "./utils";
import { Range } from "./types";

function countFreshAvailable(ranges: Range[], ids: number[]): number {
    const merged = mergeRanges(ranges);
    let count = 0;

    for (const id of ids) {
        let isFresh = false;

        for (const r of merged) {
            if (id < r.start) {
                break;
            }

            if (id >= r.start && id <= r.end) {
                isFresh = true;

                break;
            }
        }

        if (isFresh) {
            count++;
        }
    }

    return count;
}

async function main() {
    const data = getFileData('input.txt');
    const { ranges, ids } = parseDatabase(data);

    const result = countFreshAvailable(ranges, ids);
    
    console.log('Fresh available ID count:', result);
}

main().catch(console.error);
