
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';

import Container from './layout/Container';

import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Projects from './components/pages/Projects';
import Project, { NoMatch } from './components/pages/Project';




function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
            <Container customClass="min_heigth">
                <Routes>
                   <Route    exact path="/" element= {< Home />}/>
                    <Route   path="/newproject" element= {< NewProject />}/>
                     <Route  path="/company" element= {< Company />}/>
                    <Route   path="/contact" element= {< Contact />}/>
                   <Route    path="/projects" element= {< Projects />}/>
                  <Route     path="/project/:id" element= {< Project/>}/>
                </Routes> 
            </Container>
            <Footer/>
        </Router>
    </div>
    
  );
}

export default App;
