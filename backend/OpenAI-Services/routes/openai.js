const express = require('express');
const needle = require('needle');

const router = express.Router();
const nodemailer = require('nodemailer');


// Env vars
const OPAI_BASE_URL = process.env.OPAI_BASE_URL;
const OPAI_CREDENTIALS = process.env.OPAI_CREDENTIALS;





// Middleware to log requests
router.use((req, res, next) => {
    console.log('Received request:', req.method, req.originalUrl);
    console.log('Request body:', req.body);
    next();
});



router.post('/completions/3.0', async (req, res) => {
    try {
        const body = req.body;
        if (body.prompt == undefined || body.prompt.trim().length == 0) {
            res.status(401).json('request missing prompt')
        } else if (body.model == undefined) {
            res.status(405).json('request missing data model')
        } else {
            const url = OPAI_BASE_URL + '/completions';

....................................................................................	

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
});





module.exports = router;
