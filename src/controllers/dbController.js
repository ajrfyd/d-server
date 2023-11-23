const fs = require("fs");
const { resolve } = require("path");
const { go, map, filter, each, find, pipe, some  } = require("fxjs");

const basePath = resolve();
const filename = {
  tags: resolve(basePath, "src/data/tags.json"),
  posts: resolve(basePath, "src/data/posts.json")
};

const getData = (fileName) => JSON.parse(fs.readFileSync(filename[fileName]), "utf-8");
const setData = (fileName, data) => fs.writeFileSync(filename[fileName], JSON.stringify(data));

const getDuplicateTags = (savedTags, newTags) => go(savedTags, filter(tag => find(savedTag => savedTag.label === tag.label, newTags)));
const getNewTags = (savedTags, newTags) => go(savedTags, filter(tag => !find(savedTag => savedTag.label === tag.label, newTags)));
const findSameLabel = (label, arr) => find(tag => tag.label === label, arr);

module.exports = {
  readDb: (target) => {
    return JSON.parse(fs.readFileSync(filename[target], "utf-8")) || [];
  },
  getPostsData: () => {
    const posts = getData("posts");
    return posts;
  },
  getPostById: (id) => {
    const posts = getData("posts");
    return go(posts, filter(post => post.id === id), ([a]) => a);
  },
  getPostsByTagId: (id) => {
    const posts = getData("posts");
    // return go(posts, filter(post => post.tags.some(tag => tag.id === id)));
    return go(posts, filter(post => some(tag => tag.id === id, post.tags)));
  },
  getPostsByTitle: (title) => {
    const posts = getData("posts");
    return go(posts, filter(post => post.title.toLowerCase().includes(title.toLowerCase())));
  },
  getTagsData: () => {
    const tags = getData("tags");
    return tags;
  },
  writePost: (post) => {
    const savedTags = getData("tags");
    const savedPosts = getData("posts");
    const duplicatedTags = getDuplicateTags(savedTags, post.tags);
    const newPost = { ...post, tags: go(post.tags, map(tag => findSameLabel(tag.label, duplicatedTags) ? findSameLabel(tag.label, duplicatedTags) : tag )) }
    const newTags = getNewTags(newPost.tags, duplicatedTags);
    if(newTags.length) {
      console.log("this!")
      setData("tags", [...newTags, ...savedTags]);
    }
    console.log(newPost)
    setData("posts", [newPost, ...savedPosts]);
  }
}