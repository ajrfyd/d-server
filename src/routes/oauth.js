const axios = require("axios");

const oauthRoute = [
  {
    method: "post",
    path: "/",
    handler: async(req, res) => {
      try {
        const { data } = await axios("https://github.com/login/oauth/access_token", {
          method: "post",
          headers: {
            Accept: "application/json"
          },
          data: {
            client_id: req.body.clientId,
            client_secret: process.env.GH_SECRET,
            code: req.body.code 
          }
        });

        const { data: userInfo } = await axios.get("https://api.github.com/user", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${data.access_token}`
          }
        });

        return res.json({
          userId: userInfo.login,
        });
      } catch(e) {
        return res.json({
          status: 500,
          message: e.message
        })
      }
    }
  }
]

module.exports = oauthRoute;