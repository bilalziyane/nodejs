const express = require("express")
const fs = require("fs")
const {middlewareVerification} = require("./utils")
const app = express()
const PORT = 3000
app.use(express.static("./exam-estf-2023-2024"))
app.use(express.json())

app.get("/jokes",(req,res)=>{
  fs.readFile("./database/jokes.json",(err,data)=>{
      if(err)
          return res.status(500).send("error on the server")
      let jokes = JSON.parse(data.toString()).jokes
      res.status(200).json(jokes)
  });
})
app.post("/jokes",middlewareVerification,(req,res)=>{
  let {author,joke,likes} = req.body
  fs.readFile("./database/jokes.json",(err,dataFile)=>{
      if(err)
          return res.status(500).send("error on the server")
      let data = JSON.parse(dataFile.toString())
      let jokeToSave = {
          id:data.lastId,
          author,
          joke,
          likes
      }
      data.jokes.push(jokeToSave)
      data.lastId++
      fs.writeFile("./database/jokes.json",JSON.stringify(data,null,4),(err)=>{
          if(err)
              return res.status(500).send("error on the server")
          res.status(201).json(jokeToSave)
      })
  });
})

app.delete("/jokes/:id",(req,res)=>{
  let {id} = req.params
  fs.readFile("./database/jokes.json",(err,data)=>{
      if(err)
          return res.status(500).send("error on the server")
      let dataFile = JSON.parse(data.toString())
      let jokes = dataFile.jokes
      let jokesIndex = jokes.findIndex(ele=>ele.id==id)
      if(jokesIndex==-1)
          return res.status(404).send("question not found")
      dataFile.jokes = jokes.filter(ele=>ele.id!=id)
      fs.writeFile("./database/jokes.json",JSON.stringify(dataFile,null,4),(err)=>{
          if(err)
              return res.status(500).send("error on the server")
          res.status(200).json("question is deleted with success")
      })
  });
})
app.put("/jokes/:id",middlewareVerification,(req,res)=>{
  let {id} = req.params
  fs.readFile("./database/jokes.json",(err,data)=>{
      if(err)
          return res.status(500).send("error on the server")
      let dataFile = JSON.parse(data.toString())
      let jokes = dataFile.jokes
      let jokeData = jokes.find(ele=>ele.id==id)
      if(!jokeData)
          return res.status(404).send("joke not found")
     jokeData.likes=jokeData.likes+1
     fs.writeFile("./database/jokes.json",JSON.stringify(dataFile,null,4),(err)=>{
      if(err)
          return res.status(500).send("error on the server")
      res.status(200).json(jokeData)
  })
  });
})
app.listen(PORT,()=> console.log('server started at port: ',PORT))
