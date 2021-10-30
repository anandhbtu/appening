const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("appening");

const {validateSchema} = require('../helpers/validation_schema')

router.post("/add",async(req,res)=>{
    console.log('req.body :>> ', req.body);
    let data = req.body 
    delete data.button; 
     const result =  validateSchema.validateAsync(data)
     const doesExist =  await User.findOne({email:data.email})
     const test =  await User.find()
     console.log('test :>> ', test);
    console.log('doesExist :>> ', doesExist);
     result.then((message)=>{
         
        if(doesExist!=null){
            req.session.message={
                type:"danger",
                message:"This email has been aleady resistered!"
            };
            res.redirect('/')
        }else{
            const user = new User({
                userName:req.body.userName,
                fatherName:req.body.fatherName,
                dob:req.body.dob,
                address:req.body.address,
                city:req.body.city,
                state:req.body.state,
                pin:req.body.pin,
                phoneNo:req.body.phoneNo,
                email:req.body.email,
            });
            user.save((err)=>{
                if(err){
                   
                   req.session.message={
                    type:"danger",
                    message:err.message
                };
                res.redirect('/')
                }else{
                    req.session.message={
                        type:"success",
                        message:"user add successfully!"
                    };
                    res.redirect('/')
                }
            })
         
        }
        
           
        
    }).catch((err)=>{
        req.session.message={
            type:"danger",
            message:err.message
        };
        res.redirect('/')
     })
    
     
})

router.get('/',async(req,res)=>{
    
    User.find().exec((err,users)=>{
        if(err){
            res.json({message:err.message});
        }else{
            res.render("../views/index.ejs",{
                title:"Home Page",
                usersList:users
            })
        }
    })
})

router.get("/add",(req,res)=>{
    res.render("add_users",{title:"Add Users"});
})

router.get('/edit/:id',(req,res)=>{
let id = req.params.id;
User.findById(id,(err,user)=>{ 
    console.log('user in edit :>> ', user._id);
    if(err){
        res.redirect('/');
    }else{
        if(user==null){
res.redirect('/')
        }else{
            res.render('../views/edit_user.ejs',{
                title:"Edit User",
                usersList:user
            })
        }
    }
})
})


router.get('/show/:id',(req,res)=>{
    let id = req.params.id;
    User.findById(id,(err,user)=>{ 
        console.log('user in edit :>> ', user._id);
        if(err){
            res.redirect('/');
        }else{
            if(user==null){
    res.redirect('/')
            }else{
                res.render('../views/show_user.ejs',{
                    title:"Show User",
                    usersList:user
                })
            }
        }
    })
    })

router.post('/update/:id',(req,res)=>{
    let id = req.params.id;
    User.findByIdAndUpdate(id,{
        userName:req.body.userName,
        fatherName:req.body.fatherName,
        dob:req.body.dob,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        pin:req.body.pin,
        phoneNo:req.body.phoneNo,
        email:req.body.email,
    },(err,result)=>{
        if(err){
            res.json({message:err.message,type:'danger'})
        }else{
            req.session.message={
                type:'success',
                message:'User updated successfully!'
            };
       res.redirect("/");
        }
    })

    
})
module.exports = router;
