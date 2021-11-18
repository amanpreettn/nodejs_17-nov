const express = require("express");
const  bodyParser = require("body-parser");
let data = require("./data.json");
const data1 = require("./data1.json");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

console.log(data);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("users", { data: data });
});

app.get("/about", (req, res) => {
  res.render("about", { data: data1 });
});

app.get("/adduser", (req, res) => {
  res.render("adduser");
});

app.post("/add", (req, res) => {
  console.log(req.body.name);
  let id = 1;
  if (data.length) {
    id = data[data.length - 1].id;
    id++;
  }
  
 const user = {
    name: req.body.name,
    branchname:req.body.branchname,
    id: id,
  };
  data.push(user);
  console.log(data);
  res.redirect("/home");
});

app.get("/delete/:id", (req, res) => {
  console.log("Hi");
  console.log(req.params);
  data = data.filter((data) => data.id !== +req.params.id);
  console.log(data);
  res.redirect("/home");
});

app.use(express.json());
// app.use("/api", routes);

const port = 8000;
app.listen(port, () => {
  console.log("Server is running at 8000 ");
});
