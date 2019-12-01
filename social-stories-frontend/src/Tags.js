/**
 * Header module.
 * @module Tags
 * @requires none
 */
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
  /**
   * Updates the value of input when user input to the textbox
   * @name handleInputChange
   * @memberof module:Tags
   * @function
   * @param e {Object} The event object created when user input to the textbox
   * @returns none
   */
  handleInputChange(e) {
    this.setState({ input: e.target.value });   
  }
  /**
   * Remove the item
   * @name handleRemoveItem
   * @memberof module:Tags
   * @function
   * @param index {Object} The index of the object to be deleted
   * @returns The object after removing the deleted object
   */
  handleRemoveItem(index) {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    }
  }
  /**
   * When Enter is pressed, make it into a tag
   * @name handleInputKeyDown
   * @memberof module:Tags
   * @function
   * @param e {Object} The event object created when user input to the textbox
   * @returns none
   */
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
  /**
    * Provides UI for Tags
    * @name render
    * @memberof module:Tags
    * @function
    * @returns The UI to be displayed.
    */
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
