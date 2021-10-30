"use strict";
const express = require("express");
require("express-async-errors");
const session = require("express-session");
const morgan = require("morgan");

const app = express();

require("./mongo");
require("./models/user");


app.use(express.urlencoded({ extended: false }));
app.use(express.json()).use(morgan());
app.use(session({
  secret:"my secret key",
  saveUninitialized:true,
  resave:false,
}))
app.use((req,res,next)=>{
  res.locals.message = req.session.message;
  delete req.session.message;
  next()
})

app.set("view engine", "ejs");


app.use("", require("./routes/user"));


app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Routes not found");
  next(error);
});

if (app.get("env") === "production") {
  app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
      message: error.message,
    });
  });
}

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack,
  });
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () =>
  console.log(`server connect on port ${PORT}`)
);
