import React from 'react';
import Header from './Header';
import HomeDisplay from './HomeDisplay';
import Dropdown from './FilterComponents/Dropdown';



/**
 * Main app module
 * @module App
 * @requires none
 */
class App extends React.Component{

  /**
 * Constructor for the app
 * @name constructor
 * @memberof module:App
 * @function 
 * @param props: variables needed by this method
 * @returns none
 */
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      searchParam: "",
      data: []
    }

  /**
   * Sets course accodrding to user input
   * @name setCourse
   * @memberof module:App
   * @function setCourse
   * @param courseName: course name given by user
   * @returns none
   */
    this.setCourse = async (courseName) => {
      await this.setState({courseName: courseName});
      await this.updateView();
    }

    /**
   * Sets search query to user input
   * @name set search
   * @memberof module:App
   * @function setSearch
   * @param search: string to search for
   * @returns none
   */
    this.setSearch = async (search) => {
      await this.setState({searchParam: search});
      await this.updateView();
    }


    /**
   * Pulls data and displays it 
   * @name update view
   * @memberof module:App
   * @function updateView
   * @param none
   * @returns none
   */
    this.updateView = async () => {
      let data = await window.fetch(`/api/course/${this.state.courseName.toLowerCase()}/search?content=${this.state.searchParam}`);
      data = await data.json();
      this.setState({data: data});
    }
  }


  componentDidMount() {
    this.updateView();
  }

  /**
   *Render - provides UI for front page
    * @name render
    * @memberof module:App
    * @function render
    * @returns UI
  */
  render() {
    return (
      <div className="App">
        <Header setSearch={this.setSearch} />
        <Dropdown setCourse={this.setCourse} />
        {/* <CreateClass /> */}
        {this.state.data && <HomeDisplay data={this.state.data} course={this.state.courseName}/>}
        <hr />
        
        <div style={{textAlign: 'center'}}>
          <p>Made with <span role="img" aria-label="heart emoji" >❤️</span> by KRAAG</p>
        </div>
      </div>
    );
  }
}

export default App;
