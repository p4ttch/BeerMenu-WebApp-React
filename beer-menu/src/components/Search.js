const SearchAPI = () => {

    const handleClick = () =>{
        console.log('hello');
    }

    return ( 
        <div className="searchBox">
            <button onClick={handleClick} className="search">Search</button>
        </div>
     );
}
 
export default SearchAPI;