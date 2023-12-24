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

router.post('/today/donations/:id', async (req, res) => {
    try {
        const query = 'SELECT COALESCE(SUM(donation.amount_paid), 0) AS todaytotal FROM ngo JOIN donation ON ngo.ngo_id = donation.ngo_id WHERE ngo.ngo_id = $1 AND CAST(donation.date AS date) = CURRENT_DATE GROUP BY ngo.ngo_id, ngo.ngo_name';
        const { rows } = await db.query(query, [req.params.id]);

        const data = rows.length > 0 ? rows : [{ todaytotal: 0 }];

        return res.json({ data });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});


router.post('/top/donations/:id' , async(req , res) =>{
    try {
        const query = 'SELECT donation.amount_paid as amt, users.user_name AS donor, users.email as email FROM ngo JOIN donation ON ngo.ngo_id = donation.ngo_id JOIN users ON donation.user_id = users.user_id WHERE ngo.ngo_id = $1 ORDER BY donation.amount_paid DESC LIMIT 3'
        const { rows } = await db.query(query, [req.params.id])
        return res.json({data : rows})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/age/donations/:id', async (req, res) => {
    try {
        const query = `
            SELECT
                COUNT(CASE WHEN users.age <= 18 THEN 1 END) AS "b18",
                COUNT(CASE WHEN users.age > 18 AND users.age <= 30 THEN 1 END) AS "r1830",
                COUNT(CASE WHEN users.age > 30 AND users.age <= 60 THEN 1 END) AS "r3060",
                COUNT(CASE WHEN users.age > 60 AND users.age <= 80 THEN 1 END) AS "r6080",
                COUNT(CASE WHEN users.age > 80 AND users.age <= 100 THEN 1 END) AS "r80100",
                COUNT(CASE WHEN users.age > 100 THEN 1 END) AS "up100"
            FROM
                users
            JOIN
                donation ON users.user_id = donation.user_id
            WHERE
                donation.ngo_id = $1
        `;

        const { rows } = await db.query(query, [req.params.id]);
        const ageCount = rows[0];

        return res.json(ageCount);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.post('/occupation/donations/:id', async (req, res) => {
    try {
        const query = 'SELECT users.occupation AS asset, SUM(donation.amount_paid) AS amount FROM donation JOIN users ON donation.user_id = users.user_id WHERE donation.ngo_id = $1 GROUP BY users.occupation';
        const { rows } = await db.query(query, [req.params.id]);

        // Initialize the result object with enum values
        const transformedData = {
            Employed: 0,
            Unemployed: 0,
            SelfEmployed: 0,
            Student: 0,
            Retired: 0,
        };

        // Update the result object with actual amounts from the database
        rows.forEach(({ asset, amount }) => {
            const key = asset;
            transformedData[key] = amount;
        });

        return res.json(transformedData);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});


router.post('/gender/donations/:id', async (req, res) => {
    try {
        const query = 'SELECT COALESCE(SUM(donation.amount_paid), 0) as sum FROM donation JOIN users ON donation.user_id = users.user_id WHERE donation.ngo_id = $1 AND users.gender = \'Male\' ';
        const { rows: maleRows } = await db.query(query, [req.params.id]);

        const query2 = 'SELECT COALESCE(SUM(donation.amount_paid), 0) as sum FROM donation JOIN users ON donation.user_id = users.user_id WHERE donation.ngo_id = $1 AND users.gender = \'Female\' ';
        const { rows: femaleRows } = await db.query(query2, [req.params.id]);

        const query3 = 'SELECT COALESCE(SUM(donation.amount_paid), 0) as sum FROM donation JOIN users ON donation.user_id = users.user_id WHERE donation.ngo_id = $1 AND users.gender = \'Others\' ';
        const { rows: othersRows } = await db.query(query3, [req.params.id]);

        return res.json({ male: maleRows[0].sum, female: femaleRows[0].sum, others: othersRows[0].sum });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});



module.exports = router