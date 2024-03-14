const express = require('express');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/calification.routes'));

app.listen(process.env.PORT);
console.log('Server on port', 8080);