require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// routes
const productRouter = require('./routes/product.route');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.route');
const uploadeRouter = require('./routes/uploade.route');
const categoryRouter = require('./routes/category.route');

// utilties
const httpStatusText = require('./utility/httpStatusText');
const connectDB = require('./config/db');


connectDB(); 




const app = express();
app.use(cookieParser())
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(express.json());


app.use('/api/products', productRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoryRouter);
// get access token from refresh token
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadeRouter);


// global error handler
app.use((error, req, res, next)=> {
  return res.status(error.code || 500).json({status: error.status || httpStatusText.ERROR, message: error.message || 'Internal Server Error', code: error.code || 500, data: null});
})

// global path not found handler
app.all("*splat", (req, res)=> {
  return res.status(404).json({status: httpStatusText.ERROR, message: 'Path not found', code: 404, data: null});
})

app.listen(process.env.PORT || 4000, ()=> {
  console.log('Server is running on port', process.env.PORT || 4000);
})