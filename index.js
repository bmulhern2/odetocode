/*
   Apache License
   Version 2.0, January 2004
   http://www.apache.org/licenses/

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES  CONDITIONS OF  KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

//To Do

/*
All 100s lighthouse article
(forEach the nav bar)
Single picture schema: logo
Video of commands + link field
Style tag from index to post
Email list for new posts with SendGrid
*/

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
let xml = require('xml')
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let LogoSchema = new Schema({
    logo: String,
    id: ObjectId
})
let Logo = mongoose.model('Logo', LogoSchema)
let PostSchema = new Schema({
    id: ObjectId,
    description: String,
    author: String,
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
app.use(require('prerender-node'))
app.get('/', function (req, res) {
    Posts.find({}, function(err, posts) {
        if(!err) {
    res.render("index", { posts: posts.reverse() })
        } else {
            console.log(err)
        }
    })
})
app.get('/sitemap.xml', function (req, res) {
    res.sendFile(__dirname + "/sitemap.xml")
})
app.get('/admin/logo', function (req, res) {
    res.render('logo')
})
app.get('/admin', function (req, res) {
    res.render('admin')
})
app.post('/post/create', upload.single('image'), function (req, res) {
    let image = req.file.buffer.toString('base64')
    let newPost = new Posts({
        description: req.body.description,
        post: req.body.post,
        author: req.body.author,
       // video: req.body.video,
        id: req.params.id,
        image: image,
        dateCreated: Date.now()
    })
    Posts.create(newPost)
    res.redirect('/')
})
app.post("/logo/create", upload.single('image'), function(req, res) {
    let logo = req.file.buffer.toString('base64')
    let newlogo = new Logo({
        logo: logo,
        id: req.body.id
    })
    Logo.create(newlogo)
    res.redirect("/")
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