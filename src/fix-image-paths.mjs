import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

const files = globSync("src/**/*.{js,jsx}");
let changedCount = 0;

for (const file of files) {
  let content = readFileSync(file, "utf8");
  const original = content;

  content = content.replace(
    /(\w+)="\/images\/([^"]+)"/g,
    '$1={`${import.meta.env.BASE_URL}images/$2`}'
  );

 content = content.replace(
    /"url\('\/images\/([^']+)'\)"/g,
    "`url('${import.meta.env.BASE_URL}images/$1')`"
  );
content = content.replace(
  
    /(["'])\/images\/([^"']+)\1/g,
    "`${import.meta.env.BASE_URL}images/$2`"
  );

  if (content !== original) {
    writeFileSync(file, content, "utf8");
    changedCount++;
    console.log("Updated:", file);
  }
}

console.log(`\nDone. ${changedCount} file(s) updated.`);