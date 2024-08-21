const express = require('express');
const app = express();
const exportRoutes = require('./routes/export');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

app.use('/export', exportRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
