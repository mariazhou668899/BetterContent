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

            const apiBody = {
                model: "gpt-3.5-turbo-instruct",
                prompt: body.prompt,
                max_tokens: body.max_tokens,
                temperature: body.temperature,
				top_p: body.top_p,
                frequency_penalty: body.frequency_penalty,
                presence_penalty: body.presence_penalty,
            }
			
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


router.post('/generations', async (req, res) => {
    try {
        const body = req.body;
        if (body.prompt == undefined) {
            res.status(402).json('request missing prompt')
        } else if (body.n == undefined){
			 res.status(403).json('request missing number of images')
		}
		else {
			const url = OPAI_BASE_URL + '/images/generations';
            const apiBody = {
				"model": "dall-e-2",
				"prompt": body.prompt,
				"n": body.n,
				"size": "256x256",
            }
            var options = {
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPAI_CREDENTIALS}` }
            }
            const apiRes = await needle('post', url, apiBody, options)
			
			console.log('after - API Request IMG body:', apiRes.body)
			
			if (apiRes.body) {
				const apiResURL = apiRes.body.data;
				res.status(200).json({"imgURL": apiResURL});
			} else {
				console.log('after - API Request IMG body:', apiRes.body);
				res.status(500).json({error: "No image URL found in the response"});
			}

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})



module.exports = router;
