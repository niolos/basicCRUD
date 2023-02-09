require('dotenv/config')
const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const bodyParser= require('body-parser');


// const subsribers = require('./routes/subscribers-routes')

const user = require('./routes/user')

mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true }).then((x) => {
    console.log(`Connected to MongoDB Successfully! Database name: "${x.connections[0].name}"`)
        }).catch((err) => {
    console.error('Error connecting to mongodb', err)
})

const app = express();

app.use(cors(['*']));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user',user);

const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`listening to port ${port}..`));