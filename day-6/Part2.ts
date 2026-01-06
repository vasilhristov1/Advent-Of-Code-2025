import { getFileData } from "./utils";

const data = getFileData("input.txt").replace(/\r/g, "").trimEnd();
const rawLines = data.split("\n").filter(l => l.length > 0);

const opRowIndex = rawLines.length - 1;

const width = Math.max(...rawLines.map(l => l.length));
const lines = rawLines.map(l => l.padEnd(width, " "));

const isSeparatorCol = (col: number): boolean => {
  for (let r = 0; r < lines.length; r++) {
    if (lines[r][col] !== " ") {
        return false;
    }
  }

  return true;
}

type Block = { 
    start: number; 
    end: number 
};

const blocks: Block[] = [];

let c = 0;

while (c < width) {
  while (c < width && isSeparatorCol(c)) {
    c++;
  }

  if (c >= width) {
    break;
  }

  const start = c;

  while (c < width && !isSeparatorCol(c)) {
    c++;
  }

  const end = c;

  blocks.push({ start, end });
}

let total = 0n;

for (const b of blocks) {
  const opSlice = lines[opRowIndex].slice(b.start, b.end);
  const opMatch = opSlice.match(/[+*]/);

  if (!opMatch) {
    throw new Error(`No operator found in block ${b.start}-${b.end}`);
  }

  const op = opMatch[0] as "+" | "*";

  const numsLeftToRight: bigint[] = [];

  for (let col = b.start; col < b.end; col++) {
    let digits = "";

    for (let row = 0; row < opRowIndex; row++) {
      const ch = lines[row][col];

      if (ch >= "0" && ch <= "9") {
        digits += ch;
      }
    }

    if (digits.length > 0) {
        numsLeftToRight.push(BigInt(digits));
    }
  }

  const nums = numsLeftToRight.reverse();

  let result = op === "+" ? 0n : 1n;
  for (const n of nums) {
    if (op === "+") {
        result += n;
    } else {
        result *= n;
    }
  }

  total += result;
}

console.log(total.toString());
