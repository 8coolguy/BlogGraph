const express =require('express');
const router =express.Router();
const fs = require('fs');
//models
const Blog =require('../../models/Blog');

//@route GET api/blogs
//gets all the blogs
//access should be private
router.get('/',(req,res) => {
    Blog.find()
        .sort()
        .then(blogs => res.json(blogs))
});
//@route GET api/blogs
//gets all the blogs by author
//access should be private
router.get('/author/:author',(req,res) => {
    const author = req.params.author;
    console.log("Blog Get",author)
    Blog.find({user:author})
        .sort({date:1})
        .then(blogs =>res.json(blogs))

});
//@route GET api/blogs
//gets all the blogs by author
//access should be private
router.get('/file/:path' ,(req,res) => {
    var path = req.params.path;
    path =atob(path);
    //console.log("Blog GET",path);
    // Check if file specified by the filePath exists
    fs.exists(path, function (exists) {
        if (exists) {
            // Content-type is very interesting part that guarantee that
            // Web browser will handle response in an appropriate manner.
            
            res.writeHead(200, {
                "Content-Type": "text/markdown",
            });
            fs.createReadStream(path).pipe(res);
            return;
        }else{
            res.status(404).json({ "success": false });
        }
    });
});
router.get('/image/:path' ,(req,res) => {
    var path = req.params.path;
    path =atob(path);
    
    res.sendFile(path); 
});
//@route GET api/blogs
//gets single by title
//access should be private
router.get('/title/:title',(req,res) => {
    const title = req.params.title;
    console.log("Blog Get",title)
    Blog.find({title:title})
        .then(blogs =>res.json(blogs))
});
//@route POST api/blogs
//creates a new blog
//access should be private
router.post('/',(req,res) =>{
    //console.log("Api",req);
    //need to check if the user exists
    if(!req.files || !req.files.article_file){
        return res.status(404).json({success:false,reason:"No Article"})
    }
    let article=req.files.article_file;
    //need to create a unique file name
    let article_file_path = process.cwd() + '/Static/articles/' + req.body.title +".md";
    
    let thumbnail_path;
    try{
        article.mv(article_file_path);
        
        if(req.files.thumbnail_file){
            //need to create a unique file name
            thumbnail_path = process.cwd() + '/Static/thumbnails/' + req.body.title+".png";
            req.files.thumbnail_file.mv(thumbnail_path);
        }
    }catch(err){
        return res.status(500).json({success:false,reason:"File upload"});
    }
    const newBlog = new Blog({
        title:req.body.title,
        user:req.body.user,
        related_title:req.body.related_title,
        article_file_path:article_file_path,
        thumbnail_file_path:thumbnail_path,
    });
    newBlog.save()
        .then(blog => res.json(blog))
        .catch(err => res.status(404).json({success:false}));
});
router.delete('/:id',(req,res) => {
    Blog.findById(req.params.id)
        .then(blog => blog.remove().then(()=> res.json({success:true})))
        .catch(err => res.status(404).json({success:false}));
});
module.exports =router;

