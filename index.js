const express= require('express')
const app=express()
const cors=require('cors')
const chatbot = require('./chatbot')
const PORT = 3001
app.use(cors()) 
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post('/chat', chatbot.collectMessages)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
