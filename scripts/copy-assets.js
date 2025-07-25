const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy assets to all build outputs
const srcAssets = path.join(__dirname, "../src/assets");
const targets = [
  path.join(__dirname, "../lib/commonjs/assets"),
  path.join(__dirname, "../lib/module/assets"),
  path.join(__dirname, "../lib/typescript/assets"),
];

if (fs.existsSync(srcAssets)) {
  targets.forEach((target) => {
    copyDir(srcAssets, target);
    console.log(`✅ Copied assets to ${target}`);
  });
} else {
  console.log("⚠️  No assets directory found at src/assets");
}
