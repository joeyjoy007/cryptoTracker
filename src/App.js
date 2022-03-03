
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';

import {

  Routes,
  Route,
} from "react-router-dom";
import CoinPage from './components/CoinPage';
import {makeStyles} from '@material-ui/core';

function App() {


const useStyle = makeStyles(()=>({

  App:{

    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh"

  }
  
}))

const classes = useStyle()


  return (
    <div className={classes.App}>
    <Header/>
    <Routes>
  
    
        <Route path="/" element={<HomePage/>} />
        <Route path="/coins/:id" element={<CoinPage/>} />
      
    
   
  </Routes>
    </div>
  );
}

export default App;
