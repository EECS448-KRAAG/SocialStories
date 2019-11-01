import React from 'react';
import Filter from './FilterComponents/filter'
// import VisibleCourses from './FilterComponents/VisibleCourses'
import Header from './Header';
import ResultFilter from './FilterComponents/ReactFilter'
import HomeDisplay from './HomeDisplay';
import './App.css';
import Dropdown from './FilterComponents/Dropdown';
// import VisibleCourses from './Filter/VisibleCourses';



function App() {
  return (
    <div className="App">
      <Header />
      {/* <VisibleCourses /> */}
      {/* <p>hey this is before the filter</p> */}
      {/* <Filter /> <br /> */}
      <Dropdown />
      {/* <p>Hey this is the filter back</p><br /> */}
      {/* <ResultFilter /> */}
      
      
      <HomeDisplay />
    </div>
  );
}


export default App;

// React.render(<App courses ={courses} />, document.getElementById('app'))
