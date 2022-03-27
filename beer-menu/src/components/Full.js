import { useEffect, useState } from "react";
import noimg from '../no-image-available.jpg';
import Beer from './Beer';
const FullComponent = () => {
    const [beers, setBeers] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const apiBaseURL="https://api.punkapi.com/v2/beers?per_page=11";
    const beerName="&beer_name=";
    const foodName="&food=";
    const abvGreaterValue="&abv_gt=";
    const abvLessValue="&abv_lt=";
    let beerValue ="";  
    let foodValue ="";  
    let abvgtValue ="";  
    let abvltValue ="";  
    let APIStringBuilder = apiBaseURL;
    
  
    function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }
    function checkBeerValue(){
        if(beerValue==null || beerValue ==""){
            console.log("beerValue: blank. do nothing");
        }else{
            APIStringBuilder = APIStringBuilder +beerName+beerValue;
            console.log("beerValue: "+beerValue);
            console.log("APIStringBuilder: "+APIStringBuilder);
        }
    }
    function checkFoodValue(){
        if(foodValue==null || foodValue ==""){
            console.log("foodValue: blank. do nothing");
        }else{
            APIStringBuilder = APIStringBuilder +foodName+foodValue;
            console.log("foodValue: "+beerValue);
            console.log("APIStringBuilder: "+APIStringBuilder);
        }
    }
    function checkABVgtValue(){
        if(abvgtValue==null || abvgtValue ==""){
            console.log("abvgtValue: blank. do nothing");
        }else{
            APIStringBuilder = APIStringBuilder +abvGreaterValue+abvgtValue;
            console.log("abvgtValue: "+beerValue);
            console.log("APIStringBuilder: "+APIStringBuilder);
        }
    }
    function checkABVltValue(){
        if(abvltValue==null || abvltValue ==""){
            console.log("abvltValue: blank. do nothing");
        }else{
            APIStringBuilder = APIStringBuilder +abvLessValue+abvltValue;
            console.log("abvltValue: "+beerValue);
            console.log("APIStringBuilder: "+APIStringBuilder);
        }
    }

    
    //  useEffect(()=>{
    //     setTimeout( async ()=>{
    //         const res = await fetch('https://api.punkapi.com/v2/beers');
    //         const data = await res.json();
    //         setBeers(data);
    //     },2000)
    // }, [])

    const getBeerInputValue = (event)=>{
        beerValue = replaceAll(event.target.value," ", "_");
        console.log(beerValue);
    };
    const getFoodInputValue = (event)=>{
        foodValue = event.target.value;
        console.log(foodValue);
    };
    const getAbvGTInputValue = (event)=>{
        abvgtValue = event.target.value;
        console.log(abvgtValue);
    };
    const getAbvLTInputValue = (event)=>{
        abvltValue = event.target.value;
        console.log(abvltValue);
    };

     
    

    const SearchData = async() =>{
        const url = `https://jsonplaceholder.typicode.com/todos/1`
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
    }
    // LoadData();

    const  SearchBeers = async() => { 
        setIsPending(true);
        checkBeerValue();
        checkFoodValue();
        checkABVgtValue();
        checkABVltValue();

          
        console.log("API Query string: "+ APIStringBuilder);
        const res = await fetch(APIStringBuilder);
        const data = await res.json();
        setBeers(data);
        setIsPending(false);


        // }   
    }

    return ( 
        <div className="searchBox">
            <h2>Search for Beer</h2>
                <input className="SearchInputs" type="text" placeholder="Beer Name" onChange={getBeerInputValue} />
                <input className="SearchInputs" type="text" placeholder="Food" onChange={getFoodInputValue}/>
                <input className="SearchInputs" type="text" placeholder="ABV Greater than" onChange={getAbvGTInputValue}/>
                <input className="SearchInputs" type="text" placeholder="ABV Less than"  onChange={getAbvLTInputValue}/>
                <button onClick={SearchBeers} className="search">Search</button>
                {/* <button onClick={search} className="search">Search</button> */}
            {/* <Beer /> */}
             

            {beers && beers.map(beer => (
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

                
            {isPending && <div>loading...</div> } 


        </div>

       

     );
}
 
export default FullComponent;