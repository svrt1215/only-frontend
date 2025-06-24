// index.js
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './page/Home';
import About from './page/About';
import Facilities from './page/Facilities';
import ProgramAndCourses from './page/ProgramAndCourses';
import Institutional from './page/Institutional';
import Contact from './page/Contact';
import Result from './page/Result';
import UploadResult from './page/UploadResult';
import OurFaculty from './page/OurFaculty';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <> 
  <Toaster position="top-right" />
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/programAndCourses" element={<ProgramAndCourses />} />
      <Route path="/institutional" element={<Institutional />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/result" element={<Result />} />
      <Route path="/uploadResult" element={<UploadResult/>}/>
      <Route path="/programs/:programId" element={<ProgramAndCourses />} />
      <Route path="/faculty" element={<OurFaculty/>}/>
    </Routes>
  </Router>
  </>
);
