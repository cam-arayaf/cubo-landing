process.env.PORT = process.env.PORT || 8080;
const { PORT } = process.env;
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));
app.listen(PORT, () => console.log(`Server is running on port ${ PORT }`));