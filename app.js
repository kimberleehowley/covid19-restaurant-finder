const express = require("express");
const { urlencoded } = require("body-parser");
const routes = require("./routes");

// Configuring the app
const app = express();
app.use(express.json());
app.use("/", routes);
app.use(urlencoded({ extended: false }));

// Throw an error when a resource is not found
app.use((req, res, next) => {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

// Custom error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// Preparing port
const port = process.env.PORT || 5000;

// Telling where to listen
app.listen(port, () =>
  console.log(
    `SF Chronicle restaurant data listening on http://localhost:${port}!`
  )
);
