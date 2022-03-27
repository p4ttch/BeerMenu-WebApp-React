import { useEffect, useState } from "react";



const SearchAPI = () => {

    const [beer, setBeer] = useState(null);
    
    useEffect(()=>{
            setTimeout( async () =>{
                    const res = await fetch('https://api.punkapi.com/v2/beers/1');
                    const data = await res.json();
                    setBeer(data);
                }, 2000)
            })
            
    // const [profile, setProfile] = useState(null)
    // useEffect(()=>{
    //     setTimeout( async () =>{
    //         const res = await fetch('https://jsonplaceholder.typeicode.com/users/1');
    //         const data = await res.json();
    //         setProfile(data);
    //     }, 1000)
    // })

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

            {/* {profile && (
                <div className="beer">
                    <h3>{profile.username}</h3>
                </div>
            )} */}

            {beer && (
                <div className="beer">
                    <h3>{beer.name}</h3>
                </div>
            )}
            
            {!beer && <div>loading...</div> }


        </div>

       

     );
}
 
export default SearchAPI;