const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// view engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
  const items = [
    { name: 'ซื้อของในซูเปอร์' },
    { name: 'ออกกำลังกาย' },
    { name: 'อ่านหนังสือ' },
    { name: 'เขียนโปรเจกต์เว็บ' }
  ];

  res.render('main', { items });
});

// server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
