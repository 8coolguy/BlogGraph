const express =require('express');
const router =express.Router();
const fs = require('fs');
//models
const Blog =require('../../models/Blog');
const multer =require('multer');
const upload = multer({dest:'Static/thumbnails/'})
const {uploadFile,getFileStream,uploadImage}=require('../../s3');



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
router.get('/file/:path' ,async (req,res) => {
    var path = req.params.path;
    path =atob(path);
    console.log("Get File", path );
    if(path !== 'undefined'){
        console.log("Get File", path );
        
        try{
            res.writeHead(200, {
                "Content-Type": "text/markdown",
            });
            const stream =await getFileStream(path);
            stream.pipe(res);

        }
        catch(error){
            res.status(404).json({success:error});
        }
    }else{
        res.status(404).json({success:false});
    }
    
    

});
router.get('/image/:path' ,async (req,res) => {
    var path = req.params.path;
    path =atob(path);
    
    if(path !== 'undefined'){
        console.log("Get Image", path );
        try{
            res.writeHead(200, {
                "Content-Type": "image/png",
            });
            const stream =await getFileStream(path);
            stream.pipe(res);

        }
        catch(error){
            res.status(404).json({success:error});
        }
        
        
    }else{
        res.status(404).json({success:false});
    }
     
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
    let article_file_name=req.body.title +".md"
    let thumbnail_path;
    let thumbnail_name;
    try{
        article.mv(article_file_path,err=>{
            if(err){
                console.log("Post Blog",err)
            }else{
                uploadFile(article_file_path,req.body.title +".md")
                    .then(result=>{
                        console.log("S3",result);
                        if(req.files.thumbnail_file){
                            //need to create a unique file name
                            thumbnail_path = process.cwd() + '/Static/thumbnails/' + req.body.title+".png";
                            
                            req.files.thumbnail_file.mv(thumbnail_path,err2=>{
                                if(err2){
                                    console.log("Post Blog",err2)
                                }
                                else{
                                    uploadImage(thumbnail_path,req.body.title +".png")
                                        .then(result2=>{
                                            console.log("S3",result2);
                                            thumbnail_name=req.body.title+".png";
                                            const newBlog = new Blog({
                                                title:req.body.title,
                                                user:req.body.user,
                                                related_title:req.body.related_title,
                                                article_file_path:article_file_name,
                                                thumbnail_file_path:thumbnail_name,
                                            });
                                            console.log("Post Blog",newBlog);
                                            newBlog.save()
                                                .then(blog => res.json(blog))
                                                .catch(err => res.status(404).json({success:false}));
                                        });
                                }
                            });
                            
                        }
                        else{
                            const newBlog = new Blog({
                                title:req.body.title,
                                user:req.body.user,
                                related_title:req.body.related_title,
                                article_file_path:article_file_name,
                                thumbnail_file_path:thumbnail_name,
                            });
                            console.log("Post Blog",newBlog);
                            newBlog.save()
                                .then(blog => res.json(blog))
                                .catch(err => res.status(404).json({success:false})); 
                        }
                    });
                    
  
            }
        });
    }catch(err){
        return res.status(500).json({success:false,reason:"File upload"});
    }
    
    
    
    
});
router.delete('/:id',(req,res) => {
    Blog.findById(req.params.id)
        .then(blog => blog.remove().then(()=> res.json({success:true})))
        .catch(err => res.status(404).json({success:false}));
});
module.exports =router;

