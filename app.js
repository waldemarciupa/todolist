const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname + '/date.js');
const port = 3000;
const items = ['Buy Food', 'Cook'];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    const day = date.getDate();
    res.render('list', {listTitle: day, newListItems: items});
});

app.post('/', (req, res) => {
   
    const item = req.body.newItem;

    if(req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work')
    } else {
        items.push(item);
        res.redirect('/')
    }

})


app.get('/work', (req, res) => {
    res.render('list', {listTitle: 'Work List', newListItems: workItems})
})

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))