const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const config = require('./utils/config.js')
const contacts = require('./routes/contactRouter.js')
const notFound = require('./middlewares/not-found.js')


mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log('Connected to mongodb.');
})
.catch((error)=>{
  console.log(error.reason);
})


//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('Welcome to HNG-Certificate Api')
});

//routes
app.use('/api/contactus',contacts)


app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    })
  })
  
app.use(notFound)


app.listen(config.PORT , ()=>{
    console.log(`connected to backend - ${config.PORT}`);
});

// Export the Express API
module.exports = app;