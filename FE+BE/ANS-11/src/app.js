const fs = require('fs');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const users = require('../db/users.json');

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        header_title: 'Sign Up',
        footer_name: 'Akash Verma'
    });
});

app.post('/userSignup', (req, res) => {
    users.push(req.body)
    fs.writeFileSync(__dirname + '/../db/users.json', JSON.stringify(users, null, 4))
    res.redirect('/userSignin')
});

app.get('/userSignin', (req, res) => {
    res.render('users', {
        ...users[users.length - 1],
        header_title: 'Sign Up',
        footer_name: 'Akash Verma'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        header_title: '404',
        footer_name: 'Akash Verma',
        header_message: ' : Page not found!'
    });
});

app.listen(port, () => console.log('Server is up on port ' + port));