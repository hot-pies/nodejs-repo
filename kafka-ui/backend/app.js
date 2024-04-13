const express = require('express');
const bodyParser = require('body-parser');

const userRoutes=require('./routes/user-routes');
const topicRoutes=require('./routes/topics-routes');
const HttpError=require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-allow-Origin','*');
    res.setHeader(
        'Access-Control-allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PATHC','DELETE');
    next();
});

app.use('/api/topic',topicRoutes);
app.use('/api/user',userRoutes);

app.use((req,res,next)=>{
    const error=new HttpError('Could not find this route',404);
    throw error;
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code ||500);
    res.json({message: error.message || 'An unknown error occure'});
});

app.listen(5000);