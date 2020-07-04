let express = require('express')
let http = require('http')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let uri = "mongodb+srv://bmulhern2:Bmole22%21%21@cluster0-eopst.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let Schema = mongoose.Schema;
let PostSchema = new Schema({
    description: String,
    post: String
    // Date
    // Subsequent id

})
let Posts = mongoose.model('Post', PostSchema)
let app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function (req, res) {
    Posts.find({}, function(err, posts) {
        if(!err) {
    res.render("index", { posts: posts })
        } else {
            console.log(err)
        }
    })
})
app.get('/admin', function (req, res) {
    res.render('admin')
})
app.post('/post', function (req, res) {
    let newPost = new Posts(req.body)
    Posts.create(newPost, function() {
        console.log(newPost)
    })
    res.redirect('/')
})
http.createServer(app).listen('8080')