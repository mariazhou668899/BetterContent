const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();

//..............................................
// Delete to avoid copying
//..............................................


app.listen(PORT, () => console.log('Server running on port ' + PORT));
