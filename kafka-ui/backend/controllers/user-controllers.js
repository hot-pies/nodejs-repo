const { validationResult}=require('express-validator');
const HttpError = require('../models/http-error');


const DUMMY_USER=[
    {
        id: 'test',
        name: 'vivek kumar',
        password: 'test',
        email: 'vivekkumar@gmail.com'
    }
];

const getUsers=async(req,res,next)=>{
    const id=req.params.username;
    console.log('Find user information',id);
    const username=DUMMY_USER.find(u=>{
        return u.id===id;
    });

    if(!username){
        return next(HttpError('Could not find the users',404));
    }
};

const login=async(req,res,next)=>{
    const {username,password}=req.body;
    console.log('login',username,password);

    let existingUser;
    try{
        existingUser=DUMMY_USER.find(u=>{
            console.log('User Exist',username);
            return u.id===username && u.password===password;
        });
    }catch(err){
        const error = new HttpError(
            'Loggin failed, Please try again laer',500
        );
        return next(error);
    }

    if(!existingUser || existingUser.password!==password){
        const error = new HttpError(
            'Invalid credentials, Could not log you in',401
        );
        return next(error);
    }

    res.json({
        message: 'Login in success',
        userExist: true
    });
};

exports.getUsers=getUsers;
exports.login=login;