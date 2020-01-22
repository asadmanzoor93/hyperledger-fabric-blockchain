// modules =================================================
let express        = require('express');
let app            = express();
let bodyParser     = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(fileUpload());


// set our port
let port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
// require('./app/routes')(app); // configure our routes

const router = express.Router();
const ProductController = require('../javascript/app/controllers/productController');
const UserController = require('../javascript/app/controllers/userController');
app.get('/', async(req, res) => {
    return res.send({message: 'Hyperledger Fabric API is working!'});
});
app.get('/list-products', ProductController.listProducts);
app.post('/store-product', ProductController.storeProduct);
app.post('/buy-product', ProductController.buyProduct);
app.post('/review-product', ProductController.reviewProduct);
app.get('/get-user/:userId', UserController.getUser);
app.post('/store-user', UserController.storeUser);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
