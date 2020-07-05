// LightHouse Audit
// Google Listing
// Custom Domain
let dotenv = require('dotenv')
dotenv.config()
let express = require('express')
let http = require('http')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
let multer = require('multer')
let storage = multer.memoryStorage()
let upload = multer({ storage: storage })
let cookieParser = require('cookie-parser')
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let PostSchema = new Schema({
    id: ObjectId,
    description: String,
    //author: String,
    //video: String,
    post: String,
    image: String,
    dateCreated: Date
})
let Posts = mongoose.model('Post', PostSchema)
let app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
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
app.post('/post/create', upload.single('image'), function (req, res) {
    let image = req.file.buffer.toString('base64')
    let newPost = new Posts({
        description: req.body.description,
        post: req.body.post,
        //author: req.body.author,
       // video: req.body.video,
        id: req.params.id,
        image: image,
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