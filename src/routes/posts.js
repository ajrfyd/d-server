const { 
  writePost, 
  getPostsData, 
  getTagsData, 
  getPostById, 
  getPostsByTagId,
  getPostsByTitle
} = require("../controllers/dbController.js");

const postRoute = [
  {
    method: "get",
    path: "/",
    handler: async (req, res) => {
      try {
        const data = await getPostsData("posts");
        const tags = await getTagsData("tags");
        return res.json({
          posts: data,
          tags
        });
      } catch(e) {
        console.log(e);
      }
    }
  },
  {
    method: "post",
    path: "/write",
    handler: (req, res) => {
      const { body } = req;
      try {
        writePost(body);
        return res.json({ status: 200, message: "success"});
      } catch(e) {
        return res.json({ status: 500, message: e.message });
      }
    }
  },
  {
    method: "get",
    path: "/:id",
    handler: async (req, res) => {
      const post = await getPostById(req.params.id);
      console.log(post);
      return res.json({
        post,
        status: !post ? 400 : 200,
        message: !post ? "Not Found" : "success"
      });
    }
  },
  {
    method: "get",
    path: "/tag/:id",
    handler: async (req, res) => {
      const posts = await getPostsByTagId(req.params.id);
      console.log(posts);
      return res.json({
        posts,
        status: !posts ? 400 : 200,
        message: !posts ? "Not Found" : "success"
      });
    }
  },
  {
    method: "get",
    path: "/title/:title",
    handler: async (req, res) => {
      const posts = await getPostsByTitle(req.params.title);
      return res.json({
        posts,
        status: !posts ? 400 : 200,
        message: !posts ? "Not Found" : "success"
      });
    }
  }
]

module.exports = postRoute;