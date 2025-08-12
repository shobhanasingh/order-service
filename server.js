const app = require("./app");
const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Order-Server running on port ${port}`);
});
