/*const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/

const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true
    });



 ////////

const cool = require('cool-ascii-faces')
    const express = require('express')
    const path = require('path')
const PORT = process.env.PORT || 5000
    

    express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/form'))
    .get('/cool', (req, res) => res.send(cool()))
    .get('/db', async (req, res) => {
            try {
                const client = await pool.connect()
                const result = await client.query('SELECT * FROM test_table');
                const results = { 'results': (result) ? result.rows : null};
                res.render('pages/db', results );
                client.release();
            } catch (err) {
                console.error(err);
                res.send("Error " + err);
            }
        })
    
    .get('/', (req, res) => res.send('Hello World!'))

    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

    function calculateRate(req, res ) {
    var mail = req.query.mail
    var weight = req.query.weight
    var cost = 0.0

    if (mail == "Letters (Stamped)") {
	if (weight >= 3.5) {
	    cost = 1.00
	} else if (weight >= 3.0) {
	    cost = .85
	} else if (weight >= 2.0) {
	    cost = .70
	} else {
	    cost = .55
	}
    } else if (mail == "Letters (Metered)") {
	if (weight >= 3.5) {
	    cost = .95
	} else if (weight >= 3.0) {
	    cost = .80
	} else if (weight >= 2.0) {
	    cost = .65
	} else {
	    cost = .50
	}
    } else if (mail == "Large Envelopes (Flats)") {
	if (weight >= 13.0) {
	    cost = 2.8
	} else if (weight >= 12.0) {
	    cost = 2.65
	} else if (weight >= 11.0) {
	    cost = 2.5
	} else if (weight >= 10.0) {
	    cost = 2.35
	} else if (weight >= 9.0) {
	    cost = 2.2
	} else if (weight >= 8.0) {
	    cost = 2.05
	} else if (weight >= 7.0) {
	    cost = 1.9
	} else if (weight >= 6.0) {
	    cost = 1.75
	} else if (weight >= 5.0) {
	    cost = 1.6
	} else if (weight >= 4.0) {
	    cost = 1.45
	} else if (weight >= 3.0) {
	    cost = 1.3
	} else if (weight >= 2.0) {
	    cost = 1.15
	} else {
	    cost = 1.0
	}
    } else if (mail == "First-Class Package Service-Retail") {
	if (weight >= 13.0) {
	    cost = 5.71
	} else if (weight >= 9.0) {
	    cost = 5.19
	} else if (weight >= 5.0) {
	    cost = 4.39
	} else {
	    cost = 3.66
	}
    } else {
	cost = 0
    }

    var params = {mail: mail, weight: weight, cost: cost}

    res.render('pages/postage', params)

}