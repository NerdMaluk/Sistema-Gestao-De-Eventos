const db = require('../config/dbConfig');

module.exports = {
    createEvent: async (req, res) => {
        const { title, description, event_date, location } = req.body;
        const userId = req.user.id;
        await db.query(
            'INSERT INTO events (title, description, event_date, location, user_id) VALUES ($1, $2, $3, $4, $5)',
            [title, description, event_date, location, userId]
        );
        res.status(201).json({ message: 'Evento criado com sucesso' });
    },

    listEvents: async (req, res) => {
        const events = await db.query('SELECT * FROM events');
        res.json(events.rows);
    },

    updateEvent: async (req, res) => {
        const { id } = req.params;
        const { title, description, event_date, location } = req.body;
        const userId = req.user.id;
        await db.query(
            'UPDATE events SET title = $1, description = $2, event_date = $3, location = $4 WHERE id = $5 AND user_id = $6',
            [title, description, event_date, location, id, userId]
        );
        res.json({ message: 'Evento atualizado com sucesso' });
    },

    deleteEvent: async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;
        await db.query('DELETE FROM events WHERE id = $1 AND user_id = $2', [id, userId]);
        res.json({ message: 'Evento deletado com sucesso' });
    }
};
