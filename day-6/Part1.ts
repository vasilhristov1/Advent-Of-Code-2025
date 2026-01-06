import { getFileData } from "./utils";

const data = getFileData("input.txt").trim().replace(/\r/g, "");
const lines = data.split("\n").filter(l => l.length > 0);

const opLine = lines[lines.length - 1];
const operations = opLine.trim().split(/\s+/);

const numberLines = lines.slice(0, -1);
const numbersArray: bigint[][] = numberLines.map(line =>
  line.trim().split(/\s+/).map(BigInt)
);

const cols = Math.min(operations.length, ...numbersArray.map(r => r.length));

let totalSum = 0n;

for (let col = 0; col < cols; col++) {
  const op = operations[col];

  if (op === "+") {
    let result = 0n;

    for (let row = 0; row < numbersArray.length; row++) {
        result += numbersArray[row][col];
    }

    totalSum += result;
  } else if (op === "*") {
    let result = 1n;

    for (let row = 0; row < numbersArray.length; row++) {
        result *= numbersArray[row][col];
    }

    totalSum += result;
  } else {
    throw new Error(`Unknown operator: "${op}" at col ${col}`);
  }
}

console.log(totalSum.toString());