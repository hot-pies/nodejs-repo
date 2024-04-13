const HttpError = require('../models/http-error');
const {validationResult}=require('express-validator');

const uuid=require('uuid');
const DUMMY_TOPIC=[
    {
        id: 'Test',
        partitioin_count: 1,
        replicaiton_factor: 3,
        topicname: 'my-topic'
    }
];

const getTopicDetails=(req,res,next)=>{
    const topicname=req.params.topicname;
    console.log('Describe Topic',topicname);
    const topic=DUMMY_TOPIC.find(t=>{
        return t.topicname==topicname;
    });
    if(!topic){
        return next(new HttpError('Could not found topic',404));
    }

    res.json({topic});
};

const createTopic=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty){
        console.log(errors);
        throw new HttpError('Invalid input passed, please check your data',422);
    }
    const {topicName, topicPartitionCount}=req.body;
    console.log('create topic',topicName,topicPartitionCount);
    const createTopic={
        id:uuid.v4,
        topicName,
        topicPartitionCount
    };
    DUMMY_TOPIC.push(createTopic);
    res.status(201).json({topic: createTopic});
};

const alterTopic=(req,res,next)=>{
    console.log('alter topic');
    res.status(201).json({'alter': 'topic'});
};

const deleteTopic=(req,res,next)=>{
    console.log('delete topic');
    res.json(201).json({'delete' :'topic'});

};

exports.getTopicDetails=getTopicDetails;
exports.createTopic=createTopic;
exports.alterTopic=alterTopic;
exports.deleteTopic=deleteTopic;