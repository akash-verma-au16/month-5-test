const fs = require('fs')
const csv = require('csv-parser')
const exp = require('express')
const app = exp()
const netflix = require('./db/netflix.json')
const results = []

app.use(exp.json())

fs.createReadStream('./src/db/netflix_titles.csv')
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => {
        if(data.cast !== undefined) data.cast = data.cast.split(',')
        if(data.listed_in !== undefined) data.listed_in = data.listed_in.split(',')
        results.push(data)
    })
    .on('end', () => fs.writeFileSync('./src/db/netflix.json', JSON.stringify(results, null, 2)))

app.get('/netflix/:id', (req, res) => {
    let found = false
    try {
        netflix.forEach(show => {
            if(show.show_id === req.params.id) {
                found = true
                res.send(show)
            }
        })
        if(!found) res.send('the given show id could not be found...')
    } catch (error) {
        res.send('give the correct show id after your route (eg. - s1,s2,s3....)')
    }
})

app.get('*', (req, res) => {
    res.send('give the correct route for accessing data...!!')
})

app.listen(3000, () => console.log('Server up on port 3000....'))