import React from 'react';
import Header from './Header';
import HomeDisplay from './HomeDisplay';
import './App.css';
import Dropdown from './FilterComponents/Dropdown';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      searchParam: ""
    }
    this.setCourse = (courseName) => {
      this.setState({courseName: courseName});
    }

    this.setSearch = (search) => {
      this.setState({searchParam: search});
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Dropdown setCourse={this.setCourse} />
        <HomeDisplay />
      </div>
    );
  }
}


export default App;
