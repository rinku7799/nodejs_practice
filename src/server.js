const express = require("express");
// const routes = require("./src/route");
const categoriesRouter = require("./categories");
const updateProfile = require("./updateprofile"); 
const imageRoute = require("./images");
const auth = require("./auth")
const app = express();
const port = 4000;
app.use(express.json());
// app.use(routes); 
app.use(updateProfile); 
app.use(auth);
app.use("/api", categoriesRouter); 
app.use(imageRoute); 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
