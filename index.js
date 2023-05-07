const express= require('express')
const app=express()
const cors=require('cors')
const chatbot = require('./chatbot')

app.use(cors()) 
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/test', chatbot.test)
app.post('/chat', chatbot.collectMessages)
app.listen(3001, () => {
  console.log('Server is listening on port 3001...');
});
