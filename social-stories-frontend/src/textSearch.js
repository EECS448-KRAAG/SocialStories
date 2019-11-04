/**
 * Search bar module.
 * @module textSearch
 * @requires none
 */

import React from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

//formUpdate taken from https://medium.com/byte-sized-react/controlled-forms-in-react-68e59362a119
//html code taken from https://react-bootstrap.github.io/components/navbar/

class TextSearch extends React.Component {
    /**
    * Constructor for class TextSearch
    * @name constructor
    * @memberof module:textSearch
    * @function
    * @param props {Object} An object containing everything another class passes into TextSearch (in this case, the App.js function setSearch)
    * @returns none
    */
    constructor(props) {
        super(props);
        this.state = ({ input: '' });
        /**
        * Updates the value of input when the user types something into the search bar
        * @name formUpdate
        * @memberof module:textSearch
        * @function
        * @param event {Object} The event object created when the user types something into the search bar
        * @returns none
        */
        this.formUpdate = (event) => {
            this.setState({ input: event.target.value });
        }
        /**
        * Updates the value of searchParam in App.js when the search button is pressed, resets the search field to be blank.
        * @name searchUpdate
        * @memberof module:textSearch
        * @function
        */
        this.searchUpdate = () => {
            this.props.setSearch(this.state.input);
            this.setState({ input: '' }); //resets the search bar text field to blank
        }
    }

    /**
    * Provides UI for search bar
    * @name render
    * @memberof searchUpdate
    * @function
    * @returns The UI to be displayed.
    */
    render() {
        return (
            <>
                <Form inline>
                    <FormControl type="text" value={this.state.input} placeholder="Search" className="mr-sm-2" onChange={this.formUpdate} />
                    <Button variant="outline-success" onClick={this.searchUpdate}>Search</Button>
                </Form>
            </>
        );
    }
}

export default TextSearch;
