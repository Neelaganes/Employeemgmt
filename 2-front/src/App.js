import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './login';
import Register from './register';
import Footer from './footer';
import Details from './details';
import Update from './update';
import Header from './header';
import Empdetails from './empdetails';
import Board from './board';
import YouTubeLinkForm from './youtube';
import Finance from './finance';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{

  },[]);
return(
  <>
  
    <BrowserRouter>
    <Header/>
    <div style={{margin:'60px 0px 0px 0px'}}>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/update/:role/:id" element={<Update />} />
      <Route path='/youtube' element={<YouTubeLinkForm/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/board' element={<Board/>}/>
      <Route path='/finance/:role/:name' element={<Finance/>}/>
      <Route path='/details/:role/:name' element={<Details/>}/>
      <Route path='/empdetails/:id' element={<Empdetails/>}/>
    </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
    
  
  </>
);
}

export default App;
