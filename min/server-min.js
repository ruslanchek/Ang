var express=require("express"),app=express(),fs=require("fs");app.use(express["static"](__dirname)),app.get("*",function(e,s){s.set("content-type","text/html"),s.send(fs.readFileSync(__dirname+"/index.html","utf8"))}),app.listen(80);