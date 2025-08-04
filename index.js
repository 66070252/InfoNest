const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('สวัสดีโลก');
});

// เริ่มต้น server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});