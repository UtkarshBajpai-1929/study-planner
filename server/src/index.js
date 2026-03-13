import dotenv from "dotenv";
dotenv.config({
  path: './.env'
});
import connectToDb from "./db/index.js";
import app from "./app.js";
connectToDb()
.then(()=>{
  const PORT  =  process.env.PORT;
  app.listen(PORT, ()=>{
    console.log("Server is running at port:", PORT);
  })
})
.catch((err)=>{
  console.log(err);
})