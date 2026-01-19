import { getFileData } from "./utils";

const data = getFileData("input.txt").replace(/\r/g, "").trimEnd();
const lines = data.split("\n");

let active = new Set<number>();
active.add(lines[0].indexOf("S"));

let totalSplits = 0;

for (let r = 1; r < lines.length; r++) {
    const row = lines[r];
    const next = new Set<number>();

    for (const x of active) {
        if (row[x] === "^") {
            totalSplits++;

            if (x - 1 >= 0) {
                next.add(x - 1);
            }

            if (x + 1 < lines[0].length) {
                next.add(x + 1);
            }
        } else {
            next.add(x);
        }
    }

    active = next;
}

console.log(totalSplits);
