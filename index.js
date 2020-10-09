process.env.PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.listen(process.env.PORT, error => console.log(error || `Server is running`));