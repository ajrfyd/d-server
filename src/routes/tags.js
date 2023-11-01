const { readDb } = require("../controllers/dbController");

const tagRoute = [
  {
    method: "get",
    path: "/",
    handler: async (req, res) => {
      try {
        const data = await readDb("tags");
        return res.json(data);
      } catch(e) {
        console.log(e);
      }
    }
  }
]

module.exports = tagRoute;