const api=require('novelcovid');
const state=require('axios');
//Api for covid 19


api.settings({
    baseUrl: 'https://api.covid19api.com/summary'
})








var root=require('express')
var Router=root();

//Renderings ejs template
Router.get('/',(req,res)=>{
    res.render('homepage.ejs');
})
Router.get('/find',(req,res)=>{
    res.render('findform.ejs')
})
Router.post('/find',async(req,res)=>{
    var aray={};
    const {countryname}=req.body;
    var cntry=String(countryname);
   
    //This Object will contain cases on particular date for a specified country
    var CountriesTimeline={}
    

    //console.log(cntry);
    aray=await api.countries({country:String(countryname)}); 
    CountriesTimeline=await api.historical.countries({country:String(countryname),days:365});
    
    dta=await state.get('http://covid19-india-adhikansh.herokuapp.com/states');
    
    StateData=[];
    StateData=dta.data.state;
    //console.log(StateData);
    
    //console.log(CountriesTimeline);
    //X-axis array will contain dates
       
        var X_axis=[]
        X_axis=Object.keys(CountriesTimeline.timeline.cases);    

        // Y_axis will contain the cases
        var Y_axis=[]
        Y_axis=Object.values(CountriesTimeline.timeline.cases);

    // creating collection which will hold the record of deaths
        
        Y_Deaths=[]
        Y_Deaths=Object.values(CountriesTimeline.timeline.deaths);
    // creating collection  which will hold the record of recovered people

    Y_Recover=[];
    Y_Recover=Object.values(CountriesTimeline.timeline.recovered);

    //Chartjs code
        
       
     
   
      var graphs={
        X_axis: X_axis,
        Y_axis: Y_axis,
        Y_Deaths: Y_Deaths,
        Y_Recover:Y_Recover
      }

     
      

      
    if(JSON.stringify(aray)=='{}'){
        res.send("No such country exists");
    }
    else{
    res.render('coviddata.ejs',{aray:aray,graphs:graphs,StateData:StateData});
    }
});

Router.get('/about',(req,res)=>{
    res.render('about.ejs');
})
module.exports=Router;
