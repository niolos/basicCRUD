let express= require('express');
const app = express();
let router = express.Router()
let users =require("../models/user")

router.route('/').get((req,res)=>{
    users.find((err,data)=>{
        if(err){
            throw err
        }
        else{
            res.json(data)
        }
    })
})

router.route('/create').post((req,res)=>{
    users.create(req.body, (err,data)=>{
        if (err){
            throw err
        }
        else{
            res.json(data)
        }
    })
})

router.route('/delete/:id').delete((req,res)=>{
    users.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            throw err
        }
        else{
            res.json(data);
        }
    })
})


router.route('/find/:id').get((req,res)=>{
    users.findById(req.params.id,(err, data)=>{
        if(err){
            throw err
        }
        else{
            res.json(data);
        }
    })
})

router.route('/update/:id').put((req,res)=>{
    users.findByIdAndUpdate({_id:req.params.id}, req.body, (err, data)=>{ 
        if(err){
            throw err
        }
        else{
            res.json(data);
        }
    })
})


module.exports = router;