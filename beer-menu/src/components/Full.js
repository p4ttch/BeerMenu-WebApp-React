import { useEffect, useState } from "react";

const FullComponent = () => {
 
    const [beers, setBeers] = useState(null);
    useEffect(()=>{
        setTimeout( async ()=>{
            const res = await fetch('https://api.punkapi.com/v2/beers');
            const data = await res.json();
            setBeers(data);
        },2000)
    }, [])



    const handleClick = () =>{
        console.log('hello');
    }

    return ( 
        <div className="searchBox">
            <h2>Search for Beer</h2>
                <input className="SearchInputs" type="text" placeholder="Beer Name"/>
                <input className="SearchInputs" type="text" placeholder="ABV"/>
                <input className="SearchInputs" type="text" placeholder="Food"/>
            <button onClick={handleClick} className="search">Search</button>

             

            {beers && beers.map(beer => (
                <div className="beer" key={beer.id}>
                    <img src={beer.image_url} className="beer-logo" alt="{beer.name}" />
                    <div className="desc-container">
                        <h3 className="beer-name">{beer.name}</h3>
                        <p  className="beer-abv">
                            <b>Alcohol by volume: </b>{beer.abv}</p>
                        <p  className="beer-desc">{beer.description}</p>
                    </div>
                </div>
            ))}


            {!beers && <div>loading...</div> } 


        </div>

       

     );
}
 
export default FullComponent;