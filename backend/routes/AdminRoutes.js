if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const db = require('../config/dbConfig')

const router = express.Router()

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

router.post('/login', async (req, res) => {

    try {

        if (!req.body.username || !req.body.password) {
            throw Error('All fields must be filled')
        }

        const values = [req.body.username]

        const query = 'SELECT * FROM admin WHERE username = $1'

        const { rows } = await db.query(query, values)

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Admin not found' })
        }

        const dbhasp = rows[0].password

        const match = await bcrypt.compare(req.body.password, dbhasp)

        if (!match) {
            return res.status(400).json({ error: 'Password incorrect' })
        } else {
            const token = createToken(rows[0].ngo_id , 'Admin')
            return res.json({ success: true, authToken: token })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/all/ngo', async (req, res) => {
    try {
        const query = 'SELECT ngo_name as name, description, ngo_id as id, location, moreinfo , email FROM ngo WHERE is_verified = false';
        const { rows } = await db.query(query);
    
        return res.json(rows);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/verify/:id', async (req, res) => {
    try {
        const values = [req.params.id]
        const query = 'UPDATE ngo SET is_verified = true WHERE ngo_id = $1';
        const { rows } = await db.query(query , values);
    
        return res.json(rows);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const values = [req.params.id]
        const query = 'DELETE FROM ngo WHERE ngo_id = $1';
        const { rows } = await db.query(query , values);
    
        return res.json(rows);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router