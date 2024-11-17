const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');
require('dotenv').config();

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await db.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hashedPassword]);
            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length > 0) {
            const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
            if (validPassword) {
                const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
                return res.json({ token });
            }
        }
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
};
