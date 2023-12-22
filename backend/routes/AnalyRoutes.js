if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');

const db = require('../config/dbConfig')

const router = express.Router()

router.post('/getmap/cords/:id', async (req, res) => {
    try {
        const query = 'SELECT donation.amount_paid as content, users.location_latitude as lng, users.location_longitude as lat FROM users , donation WHERE donation.ngo_id = $1 AND users.user_id = donation.user_id';
        const { rows } = await db.query(query, [req.params.id]);
        return res.json({ data: rows});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.post('/total/donations/:id' , async(req , res) =>{
    try {
        const query = 'SELECT SUM(donation.amount_paid) AS total FROM ngo JOIN donation ON ngo.ngo_id = donation.ngo_id WHERE ngo.ngo_id = $1 GROUP BY ngo.ngo_id, ngo.ngo_name'
        const { rows } = await db.query(query, [req.params.id])
        return res.json({data : rows})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/today/donations/:id' , async(req , res) =>{
    try {
        const query = 'SELECT SUM(donation.amount_paid) AS todaytotal FROM ngo JOIN donation ON ngo.ngo_id = donation.ngo_id WHERE ngo.ngo_id = $1 AND CAST(donation.date AS date) = CURRENT_DATE GROUP BY ngo.ngo_id, ngo.ngo_name';
        const { rows } = await db.query(query, [req.params.id])
        return res.json({data : rows})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/top/donations/:id' , async(req , res) =>{
    try {
        const query = 'SELECT donation.amount_paid as amt, users.user_name AS donor, users.email as email FROM ngo JOIN donation ON ngo.ngo_id = donation.ngo_id JOIN users ON donation.user_id = users.user_id WHERE ngo.ngo_id = $1 ORDER BY donation.amount_paid DESC LIMIT 3'
        const { rows } = await db.query(query, [req.params.id])
        return res.json({data : rows})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/age/donations/:id' , async(req , res) =>{
    try {
        const query = 'SELECT users.age FROM users JOIN donation ON users.user_id = donation.user_id WHERE donation.ngo_id = $1'
        const { rows } = await db.query(query, [req.params.id])
        return res.json({data : rows})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/age/donations/:id' , async(req , res) =>{
    try {
        const query = 'SELECT users.age FROM users JOIN donation ON users.user_id = donation.user_id WHERE donation.ngo_id = $1'
        const { rows } = await db.query(query, [req.params.id])
        return res.json({data : rows})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/occupation/donations/:id' , async(req , res) =>{
    try {
        const query = 'SELECT users.occupation AS asset, SUM(donation.amount_paid) AS amount FROM donation JOIN users ON donation.user_id = users.user_id WHERE donation.ngo_id = $1 GROUP BY users.occupation'
        const { rows } = await db.query(query, [req.params.id])
        return res.json({data : rows})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/gender/donations/:id' , async(req , res) =>{
    try {
        const query = 'SELECT SUM(donation.amount_paid) AS males FROM donation JOIN users ON donation.user_id = users.user_id WHERE donation.ngo_id = $1 AND users.gender = \'Male\''
        const { rows } = await db.query(query, [req.params.id])
        return res.json({data : rows})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router