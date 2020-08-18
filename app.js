const express    = require('express'),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require('mongoose');

mongoose.set('useUnifiedTopology', true)
//insert cloud db here
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true})
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);




app.get('/', (req, res) => {
    res.render("landing")
})

app.get("/campgrounds", (req, res) => {
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else{
            res.render('campgrounds', {campgrounds: allCampgrounds})
        }
    })
})
app.get("/campgrounds/new", (req, res) => {
    res.render('new')
})

app.get('/campgrounds/:id', (req, res) =>{
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log('err')
        } else {
            res.render('show', {campground: foundCampground})
        }
    })

})

app.post('/campgrounds', (req, res) => {
    const name = req.body.name
    const image = req.body.image
    const description = req.body.description
    var newCampground = {name: name, image: image, description: description}
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else{
            res.redirect('/campgrounds')
        }
    })
})



app.listen(3000, function(){
    console.log("YelpCamp Server Works!")
});


