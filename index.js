var express=require('express');
var app=express();
const api=require('novelcovid');
const bodyParser=require('body-parser');
//middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('veiw engine','ejs');


//routes

app.use('/',require('./Routes/get'));

app.use(express.static(__dirname + '/assets')); 
//Listening to port
var PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
});
