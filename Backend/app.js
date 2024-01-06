const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require ('fetch')


app.use(express.json())

const corsoption = {
    origin: 'http://localhost:5173',
}
app.use(cors(corsoption))


const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const dataRoutes = require('./routes/dataRoutes');
app.use('/', dataRoutes);


app.use(bodyParser.json());


const puerto = 3000;

app.listen(puerto, () =>{
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
})
