// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const scale = 1.15;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all numbers followed by 'px'
    const newContent = content.replace(/\b(\d+)px\b/g, (match, p1) => {
        const val = parseInt(p1, 10);
        if (val === 1) return '1px'; // Keep 1px borders as 1px
        const newVal = Math.round(val * scale);
        return newVal + 'px';
    });

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                walkDir(fullPath);
            }
        } else {
            if (file.endsWith('.css') || file.endsWith('.tsx') || file.endsWith('.ts')) {
                processFile(fullPath);
            }
        }
    }
}

walkDir('/Users/boo/Desktop/portfolioblue/app');
walkDir('/Users/boo/Desktop/portfolioblue/components');
