const AWS = require('aws-sdk');
require('dotenv').config();
const fs=require('fs');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secertAccessKey=process.env.AWS_SECRET_ACCESS_KEY;
const name = process.env.S3_BUCKET;

console.log("S3",accessKeyId);
AWS.config.update({
"accessKeyId":accessKeyId,
"secertAccessKey":secertAccessKey,
"region":region,
})

var s3 = new AWS.S3();

//uploads file to s3
function uploadFile(path,file_name){
    console.log("S3",path);
    const file =fs.createReadStream(path);

    const params ={
        Bucket: name,
        Body:file,
        Key:file_name,
    }
    return s3.upload(params).promise();
}
function uploadImage(path,file_name){
    console.log("S3",path);
    const file =fs.createReadStream(path);
    const params ={ 
        Bucket: name,
        Body:file,
        Key:file_name,
    }
    return s3.upload(params).promise();
}
function getFileStream(file_name){
    var s3 = new AWS.S3();

    const params ={
        Key:file_name,
        Bucket: name,
        
    }
    console.log("S3", params);
    const object =s3.getObject(params).createReadStream();
    console.log("S3", "Got Object");
    return object;
    
}
exports.getFileStream =getFileStream;
exports.uploadFile = uploadFile;
exports.uploadImage = uploadImage;
//downloads file from s3