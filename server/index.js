const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose');
const core = require('cors');
const app = express();
const routeAuth = require('./router/Auth');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.cwehu.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connect mogodb success');
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

app.use(express.json());
app.use(core());

app.use('/api/auth', routeAuth)

connectDB();


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {{
    console.log(`Server is running on port ${PORT}`);
}})