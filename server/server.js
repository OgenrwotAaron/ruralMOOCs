const express = require('express');
const app=express();
const fileupload=require('express-fileupload');
const path=require('path');

app.use(fileupload());

app.post('/upload',(req,res)=>{
    if(req.files === null){
        return res.status(400).json({msg:'No file uploaded'});
    }
    const file=req.files.file
    const dir=path.join(__dirname,'..','client','public','uploads');
    file.mv(`${dir}/${file.name}`,err=>{
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({fileName:file.name,filePath:`/uploads/${file.name}`})
        console.log('Start Processing with FFMpeg and ShakaPackager');
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,_=>{
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit');
})