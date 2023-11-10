const { readDb } = require("../controllers/dbController.js");

const postRoute = [
  {
    method: "get",
    path: "/",
    handler: async (req, res) => {
      try {
        const data = await readDb("posts");
        return res.json(data);
      } catch(e) {
        console.log(e);
      }
    }
  }
]

module.exports = postRoute;