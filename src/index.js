const express = require("express")
const dotenv = require("dotenv")
const { default: mongoose } = require("mongoose")
const routes = require('./routes')
const bodyParser = require("body-parser")
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())

routes(app);

mongoose.connect(`mongodb+srv://vantuan462002:f0cYcPEVez2evTvn@cluster0.6fe3nus.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connect Db success!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('chay tren cong:', + port)
})