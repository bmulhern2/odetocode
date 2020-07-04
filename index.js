// install dotenv && configure
// 

let express = require('express')
let http = require('http')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let uri = "mongodb+srv://bmulhern2:Bmole22%21%21@cluster0-eopst.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let PostSchema = new Schema({
    _id: ObjectId,
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
        _id: _id
    })
    Posts.create(newPost)
    res.redirect('/')
})
app.get('/post/:id', async function (req, res) {
    await Posts.findById({_id: req.params.id}, function(posts) {
        try {
            console.log(posts)
            res.render('post', { posts: posts })
        } catch (error) {
            console.log(error)
        }
    })
})
http.createServer(app).listen('8080')