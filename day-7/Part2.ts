import { getFileData } from "./utils";

const data = getFileData("input.txt").replace(/\r/g, "").trimEnd();
const lines = data.split("\n");

const height = lines.length;
const width = lines[0].length;

const startX = lines[0].indexOf("S");

let active = new Map<number, bigint>();
active.set(startX, 1n);

let finished: bigint = 0n;

for (let r = 1; r < height; r++) {
  const row = lines[r];
  const next = new Map<number, bigint>();

  for (const [x, count] of active) {
    if (row[x] === "^") {
      const lx = x - 1;
      if (lx < 0) {
        finished += count;
      } else {
        next.set(lx, (next.get(lx) ?? 0n) + count);
      }

      const rx = x + 1;
      if (rx >= width) {
        finished += count;
      } else {
        next.set(rx, (next.get(rx) ?? 0n) + count);
      }
    } else {
      next.set(x, (next.get(x) ?? 0n) + count);
    }
  }

  active = next;
}

for (const count of active.values()) {
  finished += count;
}

console.log(finished.toString());
