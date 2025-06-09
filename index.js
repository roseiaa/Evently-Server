const express = require("express");
const app = express();
require('dotenv').config();
const { connectMongoDB } = require("./config/dbConfig.js");
const cookieParser = require("cookie-parser");


const port = process.env.PORT || 5000;


connectMongoDB();

app.use(express.json());
app.use(cookieParser());



app.use("/api/users", require("./routes/users.route.js"));
app.use("/api/payments", require("./routes/payments.route.js"));
app.use("/api/events", require("./routes/events.route.js"));
app.use("/api/bookings", require("./routes/bookings.route.js"));



app.listen(port, () => {
  console.log(`Node+Express Server is running on port ${port}`);
});
