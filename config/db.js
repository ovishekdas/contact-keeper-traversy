const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async ()=>{

    
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=> console.log('mongodb connected'))
    .catch(e=>{
        process.exit(1)
    })
}

module.exports = connectDB;