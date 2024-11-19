import fs from 'fs';
import path from 'path';

function listDirectory(dir, depth = 0) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach((entry) => {
        const entryPath = path.join(dir, entry.name);

        // Skip node_modules or other excluded directories
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) return;

        const prefix = ' '.repeat(depth * 2) + (entry.isDirectory() ? '📁 ' : '📄 ');

        console.log(prefix + entry.name);

        if (entry.isDirectory()) {
            listDirectory(entryPath, depth + 1);
        }
    });
}

// Run the script
const rootDir = process.cwd(); // Adjust to target specific directory if needed
console.log(`📂 ${rootDir}`);
listDirectory(rootDir);
