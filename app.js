const http=require('http');

const server =http.createServer((req,res)=>{
    if(req.url==='/'){
        console.log("Hello")
        res.write("Hello World")
        res.end()
    }
    if(req.url==='/api/course'){
        res.write(JSON.stringify([1,2,3]))
        res.end()
    }

})

server.listen(3000);