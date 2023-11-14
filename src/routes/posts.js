const { writePost, getPostsData } = require("../controllers/dbController.js");

const postRoute = [
  {
    method: "get",
    path: "/",
    handler: async (req, res) => {
      try {
        const data = await getPostsData("posts");
        console.log(data);
        return res.json(data);
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
  }
]

module.exports = postRoute;