if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const db = require('../config/dbConfig')

const router = express.Router()

router.post('/ngo/info/:id', async (req, res) => {
    try {
        const query = 'SELECT ngo_name as name, description, email, location, image, moreinfo FROM ngo WHERE ngo_id = $1';
        const { rows } = await db.query(query, [req.params.id]);

        const data = rows[0];
    
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/all/ngo', async (req, res) => {
    try {
        const query = 'SELECT ngo_name as name, description, ngo_id as id, location, image, moreinfo FROM ngo';
        const { rows } = await db.query(query);
    
        return res.json(rows);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/ngo/submit/donation/:id', async (req, res) => {
    try {
        const query = 'SELECT user_id FROM users WHERE phone_number = $1 AND email = $2';
        const { rows } = await db.query(query, [req.body.number, req.body.email]);

        let touse_userid = 0;

        if (rows.length > 0) {
            touse_userid = rows[0].user_id;
        } else {
            await db.query(
                'INSERT INTO users(user_name, age, occupation, phone_number, location_latitude, location_longitude, gender, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
                [req.body.name, req.body.age, req.body.occupation, req.body.number, req.body.latitude, req.body.longitude, req.body.gender, req.body.email]
            );

            const query2 = 'SELECT user_id FROM users WHERE phone_number = $1 AND email = $2';
            const { rows: rows2 } = await db.query(query2, [req.body.number, req.body.email]);
            touse_userid = rows2[0].user_id;
        }

        await db.query('INSERT INTO donation(user_id, ngo_id, amount_paid) VALUES($1, $2, $3)', [touse_userid, req.params.id, req.body.amount]);

        return res.json({ success: true });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});



module.exports = router