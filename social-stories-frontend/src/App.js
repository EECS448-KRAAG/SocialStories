import React from 'react';
import Header from './Header';
import HomeDisplay from './HomeDisplay';
import './App.css';
import Dropdown from './FilterComponents/Dropdown';

const fakePostData = [
  {
    id: "c248b389-3d30-4538-9b2c-374da66a7663",
    title: "Help Me Please: 7",
    content: "This is the body of post 7"
  },
  {
    id: "72b40153-168c-4d00-8322-fe91af1e9a36",
    title: "Help Me Please: 2",
    content: "This is the body of post 2"
  },
  {
    id: "e5e1b544-65d9-4088-a5c8-3cbdc9ddd4d2",
    title: "Help Me Please: 8",
    content: "This is the body of post 8"
  },
  {
    id: "00df5807-d6b0-4824-a3b3-ac230e4b23d9",
    title: "Help Me Please: 4",
    content: "This is the body of post 4"
  },
  {
    id: "e062d2dc-8efe-4407-af34-2259943bebc9",
    title: "Help Me Please: 0",
    content: "This is the body of post 0"
  },
  {
    id: "650aa3a4-d42c-44b3-9b34-782e55330029",
    title: "Help Me Please: 5",
    content: "This is the body of post 5"
  },
  {
    id: "4172dd8c-9c37-4f33-86f3-18ae83be2b88",
    title: "Help Me Please: 9",
    content: "This is the body of post 9"
  },
  {
    id: "e66f9522-9469-4b51-b1f1-30205947b4fa",
    title: "Help Me Please: 3",
    content: "This is the body of post 3"
  },
  {
    id: "e8b4635c-569b-41d3-9d22-238607e1bc11",
    title: "Help Me Please: 1",
    content: "This is the body of post 1"
  },
  {
    id: "83009e46-b460-447b-94ec-395e18a02498",
    title: "Help Me Please: 6",
    content: "This is the body of post 6"
  }
];

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      searchParam: "",
      data: fakePostData
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
        <HomeDisplay data={this.state.data} />
      </div>
    );
  }
}


export default App;
