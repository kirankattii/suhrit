const fs = require('fs');

let content = fs.readFileSync('src/app/home.tsx', 'utf8');

// The issue is that `{"\n"}` was written as `{"\n"}` in JS template string, which evaluated to literal newline.
// I will replace `{"` + newline + `"}` with `{"\\n"}`
content = content.replace(/\{"\n"\}/g, '{"\\n"}');

fs.writeFileSync('src/app/home.tsx', content, 'utf8');
