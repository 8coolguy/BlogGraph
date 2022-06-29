const express =require('express');
const router =express.Router()
const User =require('../../models/User');


//@route GET api/users
//gets all the users
//access should be private
router.get('/search/:query',(req,res) => {
    const query = req.params.query;
    
    User.find({userName:{"$regex":query}})
        .find({total_blogs:{ $gte: 1 }})
        .sort({total_blogs:-1})
        .then(users => res.json(users))

    
    
});
//@route GET api/users
//gets all the users
//access should be private
router.get('/',(req,res) => {
    User.find({total_blogs:{ $gte: 1 }})
        .sort({total_blogs:-1})
        .then(users => res.json(users))
});
//@route POST api/users
//create a user
//access should be private
router.post('/',(req,res) => {
    const newUser = new User({
        id:req.body.id,
        userName:req.body.userName,
        total_blogs:0,
    });
    newUser.save().then(user => res.json(user));
});
//@route DEL api/users
//delete a user
//access should be private
router.delete('/:id',(req,res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(()=> res.json({success:true})))
        .catch(err => res.status(404).json({success:false}));
});
//@route DEL api/users
//add 1 to num of blogs
//access should be private
router.put("/update/:user/:dir",(req,res)=>{
    const username = req.params.user;
    const dir = req.params.dir=="up"?1:-1
    User.findOne({userName:username})
        .then(user => {
            console.log("Update Users",user);
            User.updateOne({userName:username},{total_blogs:(user.total_blogs)+dir})
                .then(()=> res.json({success:true}))
        })
        .catch(err => res.status(404).json({success:false}));
    
        
})

module.exports = router;