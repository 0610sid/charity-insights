if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require("express")

const cors = require("cors")
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const adminroutes = require('./routes/AdminRoutes')
const analytics = require('./routes/AnalyRoutes')
const ngoroutes = require('./routes/NgoRoutes')

const db = require('./config/dbConfig')

const createToken = (id , role , verify) => {
    return jwt.sign({ id , role , verify }, process.env.SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    })
}

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/admin/' , adminroutes)
app.use('/' , analytics)
app.use('/' , ngoroutes)

app.post('/signup', async (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password || !req.body.name || !req.body.describe) {
            throw new Error('All fields must be filled')
        }

        if (!validator.isEmail(req.body.email)) {
            throw new Error('Enter a valid email')
        }
        
        if (!validator.isStrongPassword(req.body.password, { minLength: 8, minUppercase: 0, minSymbols: 0 })) {
            throw new Error('Password must be of minimum 8 characters')
        }

        const query = 'SELECT * FROM ngo WHERE username = $1'
        const { rows } = await db.query(query, [req.body.username])

        const salt = await bcrypt.genSalt(12)
        const hashpass = await bcrypt.hash(req.body.password, salt)

        if (rows.length !== 0) {
            throw new Error('Username already in use')
            
        } else {
            const values = [hashpass, req.body.username, req.body.email , req.body.name , req.body.describe]
            db.query('INSERT INTO ngo(email, ngo_name, password , username , description) VALUES ($3, $4, $1, $2, $5)', values, (error, results) => {
                if (error) {
                    return res.status(500).json({ error: `Error in insertion: ${error}` })
                }
                
                return res.json({ success: true })
            })
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


app.post('/login', async (req, res) => {

    try {

        if (!req.body.username || !req.body.password) {
            throw Error('All fields must be filled')
        }

        const values = [req.body.username]

        const query = 'SELECT * FROM ngo WHERE username = $1'

        const { rows } = await db.query(query, values)

        if (rows.length === 0) {
            return res.status(400).json({ error: 'User not found' })
        }

        const dbhasp = rows[0].password

        const match = await bcrypt.compare(req.body.password, dbhasp)

        if (!match) {
            return res.status(400).json({ error: 'Password incorrect' })
        } else {
            const token = createToken(rows[0].ngo_id , 'Ngo' , rows[0].is_verified)
            return res.json({ success: true, authToken: token })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})