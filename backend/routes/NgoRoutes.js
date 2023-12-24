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
        const query = 'SELECT ngo_name as name, description, email, location, image, moreinfo FROM ngo WHERE ngo_id = $1';
        const { rows } = await db.query(query, [req.params.id]);

        const data = rows[0];
    
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router