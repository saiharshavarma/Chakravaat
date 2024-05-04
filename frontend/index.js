const OpenAI = require('openai')
const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3001

const openai = new OpenAI({
  organization: process.env.ORG_KEY,
  apiKey: process.env.API_KEY
})

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello world!")
})

app.post("/", async(req, res) => {
  const { message } = req.body
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    prompt: `You are a smart metereologist that analyzes cyclones
    ${message}
    `,
    max_tokens: 150,
    temperature: 0
  })
  console.log(response.data)
  res.send("Text answer")
})

app.listen(port, () => {
  console.log("App is listening on port " + port)
})