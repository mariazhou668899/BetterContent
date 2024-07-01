const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();

const limiter = rateLimit({
    windowMS: 10 * 60 * 1000, // 10 minutes
    max: 90
});

app.use(limiter);
app.set('trust proxy', 1);

// Increase payload size limit to 50 megabytes
app.use(express.json({ limit: '50mb' }));

// Enable cors
app.use(cors());

// Routes
app.use('/openai', require('./routes/openai.js'));

app.get('/', async (req, res) => {
    res.status(200).json("OpenAI Proxy Service is running");
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
