const api=require('novelcovid');
const state=require('axios');
const state1=require('axios');
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
    try{
    var aray={};
    var world={};
    const {countryname}=req.body;
    var cntry=String(countryname);
   
    //This Object will contain cases on particular date for a specified country
    var CountriesTimeline={}
    

    //dummy part of the code//
        var collection=await state1.get('https://api.rootnet.in/covid19-in/stats/latest');
        //console.log(collection.data.data.regional);
    //

    //console.log(cntry);
    aray=await api.countries({country:String(countryname)});
     world=await api.all();
    //console.log(aray2); 
    CountriesTimeline=await api.historical.countries({country:String(countryname),days:200});
    var countrylist=[]

    //list of all infected countries
    countrylist=await api.countries();
    var countOfCountry=countrylist.length;
    
    //the below commented api was giving static data
    //dta=await state.get('http://covid19-india-adhikansh.herokuapp.com/states');
    
    //All state of a specified country
    //


    var StateData=[];
    StateData=collection.data.data.regional;
    //console.log(StateData);
    //list containing state cases total
    var StateCase=[]

    //list containing deaths in states
    var StateDeath=[]

    //list containing recovered cases in States
    var StateRecover=[]

    //list Containing State Names
    var StateName=[]
    StateData.forEach((i)=>{
        
            StateName.push(i.loc);
            StateCase.push(i.totalConfirmed);
            StateRecover.push(i.discharged);
            StateDeath.push(i.deaths);
        
    });
    //console.log(StateName.length);
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
        Y_Recover:Y_Recover,
        
        
      }
      var StateWiseStat={
        StateName:StateName,
        StateCase:StateCase,
        StateDeath:StateDeath,
        StateRecover:StateRecover,
      }

     
      

    if(Object.keys(aray).length == 0){
        res.send("No such country exists");
    }
    else{
    res.render('coviddata.ejs',{aray:aray,graphs:graphs,StateData:StateData,countOfCountry:countOfCountry,countrylist:countrylist,world:world,StateWiseStat:StateWiseStat});
    }
}
catch(e){
    res.render("error.ejs");
}

    
});

Router.get('/about',(req,res)=>{
    res.render('about.ejs');
})
module.exports=Router;
