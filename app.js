const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


const passport = require('passport');
require('./middlewares/auth');

app.use(passport.initialize());

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api', authRoutes);
app.use('/api/events', eventRoutes);


module.exports = app;
