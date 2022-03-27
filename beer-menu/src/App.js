import logo from './logo.png';
// import './App.css';
import Navbar from './components/Navbar';
// import Search from './components/Search';
// import Beers from './components/Beers';
import Full from './components/Full';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="content">
        <img src={logo} className="App-logo" alt="logo" />
          <Full />
          {/* <Test /> */}
          {/* <Beers /> */}
      </div>
    </div>
  );
}

export default App;
