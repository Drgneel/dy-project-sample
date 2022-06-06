const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3001;
const API_KEY = process.env.REACT_APP_DY_API_KEY;

app.use(cookieParser());
app.use((req, res, next) => {
  console.log("Hello");
  const dyCookie = req.cookies["_dyid"];
  res.cookie("_dyid_server", dyCookie, {
    maxAge: 31540000000,
  });
  next();
});

app.get("/", async (req, res) => {
  const data = JSON.stringify({
    requests: [
      {
        id: "21",

        action: "update",

        body: {
          data: {
            sku: "21",

            group_id: "50",

            url: "https://www.google.com/1",

            name: "20 Indian Recipe Chicken Sausages",

            price: 35,

            in_stock: true,

            image_url: "https://picsum.photos/200/300",

            categories: "Fresh Food|Meat|Sausages",

            color: "green",

            hfss: true,
          },
        },
      },
    ],
  });

  const config = {
    method: "post",

    url: "https://dy-api.eu/v2/feeds/104512/bulk",

    headers: {
      "DY-API-key": API_KEY,

      "Content-Type": "application/json",
    },

    data: data,
  };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })

  //     .catch(function (error) {
  //       console.log(error);
  //     });
  const resp = await axios(config);
  console.log(resp);
  res.send("Hello World!");
});
app.get("/test", (req, res) => {
  res.send("Hello Test!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});