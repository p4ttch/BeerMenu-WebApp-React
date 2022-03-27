import { useEffect, useState } from "react";
import noimg from '../no-image-available.jpg';
import Beer from './Beer';

const FullComponent = () => {
    // states to keep search values
    const [beers, setBeers] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [BeerSearch, setBeerSearch] = useState(null);
    const [FoodPairSearch, setFoodPairSearch] = useState(null);
    const [ABV_GTSearch, setABV_GTSearch] = useState(null);
    const [ABV_LTSearch, setABV_LTSearch] = useState(null);
    const [PaginationState, setPaginationState] = useState(1);
    const [PrevPage, setPrevPage] = useState(false);
    const [NextPage, setNextPage] = useState(false);
    const [noResults, setNoResults] = useState(false);
    // vars to build api string
    const apiBaseURL="https://api.punkapi.com/v2/beers?per_page=11";
    const beerName="&beer_name=";
    const foodName="&food=";
    const abvGreaterValue="&abv_gt=";
    const abvLessValue="&abv_lt=";
    const pageing="&page=";
    let APIStringBuilder = apiBaseURL;
    
    // replacing empty spaces in searches with _ for api to work
    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    // Functions that build the api url
    function checkBeerValue(){
        if(BeerSearch==null || BeerSearch ==""){
         //   console.log("beerValue: blank. do nothing");
        }else{
            APIStringBuilder = APIStringBuilder +beerName+BeerSearch;
        }
    }
    function checkFoodValue(){
        if(FoodPairSearch==null || FoodPairSearch ==""){
          //  console.log("FoodPairSearch: blank. do nothing");
        }else{
            APIStringBuilder = APIStringBuilder +foodName+FoodPairSearch;
        }
    }
    function checkABVgtValue(){
        if(ABV_GTSearch==null || ABV_GTSearch ==""){
            // console.log("ABV_GTSearch: blank. do nothing");
        }else{
            APIStringBuilder = APIStringBuilder +abvGreaterValue+ABV_GTSearch;
        }
    }
    function checkABVltValue(){
        if(ABV_LTSearch==null || ABV_LTSearch ==""){
            // console.log("ABV_LTSearch: blank. do nothing");
        }else{
            APIStringBuilder = APIStringBuilder +abvLessValue+ABV_LTSearch;
        }
    }
     
    function fnc_pageing(){
        APIStringBuilder = APIStringBuilder +pageing+PaginationState;
        console.log("func_pging: "+PaginationState);
    }
    // Calls all the functions that build the API RUL
    function BuildAPI_URL(pgNum){
        // if page 1
        fnc_pageing();
        checkBeerValue();
        checkFoodValue();
        checkABVgtValue();
        checkABVltValue();
    }

 
    const getBeerInputValue = (event)=>{
        let newBeerValue = replaceAll(event.target.value," ", "_");
        setBeerSearch(newBeerValue);
        console.log("BeerSearch: "+BeerSearch+" newBeerValue: "+newBeerValue);
    };
    const getFoodInputValue = (event)=>{
        let newFoodValue = replaceAll(event.target.value," ", "_");
        setFoodPairSearch(newFoodValue);
        console.log("FoodSearch: "+foodName+" newFoodValue: "+newFoodValue);
    };
    const getAbvGTInputValue = (event)=>{
        let newABV_GtValue = replaceAll(event.target.value," ", "_");
        setABV_GTSearch(newABV_GtValue);
        console.log("BeerSearch: "+BeerSearch+" newABV_GtValue: "+newABV_GtValue);
    };
    const getAbvLTInputValue = (event)=>{
        let newABV_LtValue = replaceAll(event.target.value," ", "_");
        setABV_LTSearch(newABV_LtValue);
        console.log("BeerSearch: "+BeerSearch+" newABV_LtValue: "+newABV_LtValue);
    };
 
    // Function that gets called on main search
    const  SearchBeers = async() => { 
        setIsPending(true);
        // let page = 1;
        // if(nextPg==null){
        //     console.log("nextPg is null / object");
        // }
        // console.log("inside search: "+nextPg);
        BuildAPI_URL();
        // BuildAPI_URL(pageNumber);

        // specificaly using an alert > consol.log to see the loading section is working
       // alert(APIStringBuilder);

        // console.log("API Query string: "+ APIStringBuilder);
        const res = await fetch(APIStringBuilder);
        const data = await res.json();
        const dataLength = data.length;
        // console.log(">>>>>>>>>>     DataLength: "+ dataLength);
        if(dataLength == 11){
            // console.log("##### activat pagination")
            setNextPage(true);
        }else{
            setNextPage(false);
        }

        /* Check any results came back, and set state to show message to user.
        */
        if(dataLength==0){
            setNoResults(true);
        }else{
            setNoResults(false);
        }
        if(PaginationState>1){
            setPrevPage(true);
        }else{
            setPrevPage(false);
        }
        setBeers(data);
        setIsPending(false);
    }


    const PagiSearchPrev = async()=>{
        setPaginationState(PaginationState-1);
        SearchBeers();
    }
    
    const PagiSearchNext = async()=>{
        let newstate = PaginationState+1;
        console.log("newstate: " + newstate);
        setPaginationState(newstate);
        // let nextPg = PaginationState+1;
        console.log("pgstatesetter: " + PaginationState);
        SearchBeers();
    }
    
    return ( 
        <div className="searchBox">
            <h2>Search for Beer</h2>
            <div className="inputContainer">
                <label>Beer Name:</label>
                <input id='textbox_id' className="SearchInputs" type="text" placeholder="Example: Buzz" onChange={getBeerInputValue} />
                <label>Food Pairing:</label>
                <input className="SearchInputs" type="text" placeholder="Example: Bacon sandwich " onChange={getFoodInputValue}/>
                <label>Alcohol by volume(ABV) Greater than:</label>
                <input className="SearchInputs" type="text" placeholder="Example: 4" onChange={getAbvGTInputValue}/>
                <label>Alcohol by volume(ABV) Less than:</label>
                <input className="SearchInputs" type="text" placeholder="Example: 2"  onChange={getAbvLTInputValue}/>
                <button onClick={SearchBeers} className="searchBtn">Search</button>
            </div>
            
            <div className="pagiContainer">
                {PrevPage && (
                    <button onClick={PagiSearchPrev} className="searchBtn prevBtn"> Prev </button>
                )}
                {beers && (
                    <div className="PageInfo">Page: {PaginationState}</div>
                )}

                {NextPage&& (
                    <button onClick={PagiSearchNext} className="searchBtn nextBtn">Next</button>
                )}
            </div>

            {/* {this html should be a component recieving props} */}
            {beers && beers.slice(0, 10).map(beer => (
                <div className="beer" key={beer.id}>
                    {beer.image_url && <img src={beer.image_url} className="beer-logo" alt={beer.image_url} /> } 
                    {!beer.image_url && <img src={noimg} className="beer-logo" alt="not-found" /> } 
                     
                    <div className="desc-container">
                        <h3 className="beer-name">{beer.name}</h3>
                        <p  className="beer-abv">
                            <b>Alcohol by volume: </b>{beer.abv}</p>
                        <p  className="beer-desc">{beer.description}</p>
                    </div>
                </div>
            ))}

                
            {isPending && <div className="LoadingIndicator"> Beers Are Pouring...</div> } 
            {noResults && <div className="NoResults">🥺 404: No beers Found.</div> } 
        </div>
     );
}
 
export default FullComponent;