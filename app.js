const express = require('express')
const app = express()
const router = require('./routes')
const exphbs = require('express-handlebars').engine
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


if (process.env.NODE.ENV !== 'production') {
  require('dotenv').config()
}


require('./config/mongoose')

const Port = process.env.Port

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    selected: function (a, b) {
      if (Number(a) === Number(b)) {
        return 'selected'
      } else {
        return ''
      }
    }
  }
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(Port, () => console.log(`This sever is running on http://localhost:${Port}.`))