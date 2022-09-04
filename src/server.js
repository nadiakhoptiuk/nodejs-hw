const app = require("./app");
const dotenv = require("dotenv");
const { connectionToDB } = require("./db/connection");

dotenv.config();

const PORT = process.env.PORT || 3000;

connectionToDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
