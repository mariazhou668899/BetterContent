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

			
            var options = {
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPAI_CREDENTIALS}` }
            }
			
            const apiRes = await needle('post', url, apiBody, options)
			
			console.log('after - API Request body:', apiRes.body)
			
            const apiResText = apiRes.body.choices[0].text;
			
            res.status(200).json({"text": apiResText})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
});





module.exports = router;
