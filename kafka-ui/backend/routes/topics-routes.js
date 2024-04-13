const express=require('express');
const router=express.Router();
const {check}=require('express-validator');

const topicControllers=require('../controllers/topics-controllers');
router.get('/describe/:topicname',topicControllers.getTopicDetails);
router.post('/create',topicControllers.createTopic);
router.patch('/alter/:topicname',topicControllers.alterTopic);
router.delete('/delete/:topicname',topicControllers.deleteTopic);


module.exports=router;