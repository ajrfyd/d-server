const fs = require("fs");
const { resolve } = require("path");

const basePath = resolve();
const filename = {
  tags: resolve(basePath, "src/data/tags.json"),
  posts: resolve(basePath, "src/data/posts.json")
};

module.exports = {
  readDb: (target) => {
    return JSON.parse(fs.readFileSync(filename[target], "utf-8")) || [];
  },
  createDb: (target, data) => {
    
  }
}