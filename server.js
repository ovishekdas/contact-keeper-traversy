const express = require('express')
const connectDB = require('./config/db')

const app = express()

// connect db
connectDB()

//init middleware
app.use(express.json({extended: false, limit: "50mb"}))

app.get('/', (req, res) => {
    res.send('hello world')
})


app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server startet on port ${PORT}`)
})