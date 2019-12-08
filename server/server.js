const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cityBl = require('./cityBL')
const app = express();

const PORT = 3201;
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

app.get('/citys', (req, res) => {
    cityBl.getAllCity(false, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.status(200).send(data);
        }
    })
});

app.get('/citys/:cityId', (req, res) => {
    cityBl.getOneCity(req.params.cityId, false, function (e, data) {
        if (e) {
            if (e === 'no id found') {
                return res.status(401).send();
            }
            else {
                return res.status(500).send();
            }
        } else {
            console.log(data);
            return res.status(202).send(data);
        }
    })
})
app.delete('/citys/:cityId', (req, res) => {
    cityBl.deleteOneCity(Number(req.params.cityId), function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {

            return res.status(200).send();
        }
    })
});
app.post('/citys', (req, res) => {
    let city = req.body;
    cityBl.createCity(city, (e, data) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.status(200).send();
        }
    })
});
app.listen(process.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`),
);