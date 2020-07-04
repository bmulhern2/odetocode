// Add Date Added
// LightHouse Audit
// Google Listing
let dotenv = require('dotenv')
dotenv.config()
let express = require('express')
let http = require('http')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let PostSchema = new Schema({
    id: ObjectId,
    description: String,
    post: String,
    dateCreated: Date

})
let Posts = mongoose.model('Post', PostSchema)
let app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', async function (req, res) {
    await Posts.find({}, function(err, posts) {
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
app.post('/post/create', function (req, res) {
    let newPost = new Posts({
        description: req.body.description,
        post: req.body.post,
        id: req.params.id,
        dateCreated: Date.now()
    })
    Posts.create(newPost)
    res.redirect('/')
})
app.get('/post/:id', function (req, res) {
    Posts.findById(req.params.id, function(err, Post) {
        if (!err) {
            res.render('post', {Post: Post})
        } else {
            console.log(err)
        }
    })
})
http.createServer(app).listen(process.env.PORT)