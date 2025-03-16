const express=require('express');
const router = express.Router();
const {isGuest}=require('../middleware/auth')

router.get('/check',isGuest,async(req,res)=>{
    res.send("FROM AUTH ROUTE")
})

module.exports = router;