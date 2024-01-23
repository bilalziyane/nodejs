const verifyjoke = (author,joke)=>{
  if(!author)
      return {state:false, msg:"question is required"}
  if(joke.length<=4)
      return  {state:false, msg:"question must contains at least 4 caracters"}
  return {state:true, msg:""}
}
const middlewareVerification  = (req,res,next)=>{
  // refaire la verification
  let {author,joke} = req.body
  let {state,msg} = verifyjoke(author,joke)
  if(state)
      return next()
  res.status(400).send(msg)
}
module.exports={
  verifyjoke,
  middlewareVerification
}