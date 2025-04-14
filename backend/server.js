const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const syncRoutes = require("./routes/syncRoutes");
const viewRoutes = require("./routes/viewRoutes");

require('./db/schema');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/sync", syncRoutes);
app.use("/api/view", viewRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));