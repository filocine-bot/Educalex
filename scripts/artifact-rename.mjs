import { renameSync, existsSync, readFileSync, writeFileSync } from "node:fs";
if (existsSync("dist-artifact/artifact.html")) renameSync("dist-artifact/artifact.html", "dist-artifact/index.html");
// El servidor de artefactos rechaza U+FFFD literal; dentro del JS se escribe como escape equivalente.
const file = "dist-artifact/index.html";
const html = readFileSync(file, "utf8").replaceAll("�", "\\uFFFD");
writeFileSync(file, html);
console.log("Listo: dist-artifact/index.html");
