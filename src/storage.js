const fs = require("fs");

module.exports = {
    read: (path) => {
        try {
            return fs.readFileSync(path).toString().split("\n");
        } catch {
            throw new Error(`Failed to read file '${path}'`);
        }
    },
    write: (path, content) => {
        try {
            return fs.writeFileSync(path, content);
        } catch {
            throw new Error(`Failed to write file '${path}'`);
        }
    }
};
