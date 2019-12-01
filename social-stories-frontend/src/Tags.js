import React from 'react';
import "./Tags.css";
import {Badge} from "react-bootstrap";

export default class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      focused: false,
      input: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value });   
  }

  handleRemoveItem(index) {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    }
  }
  
  handleInputKeyDown(e) {
    //enter keycode is 13
    let currInput = e.target.value;
      if (currInput.length !== 0)  {
      if ( e.keyCode === 13 ) {
        
          const {value} = e.target;
          
          this.setState({
            items: [...this.state.items, value],
            input: ''
          });
          this.props.tagsChange([...this.state.items, value]);
        }
    }
  }

  render() {
    return (
      <label>
        <ul className="tagContainer">
          {this.state.items.map((item, i) => 
            <li key={i} className="tagItems">
              <Badge key={i} variant="info" >
              {item}
              <span onClick={this.handleRemoveItem(i)}>  (X) </span>
              </Badge>
            </li>
          )}
          <input
            className="tagInput"
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown.bind(this) } />
        </ul>
      </label>
    );
  }

}
