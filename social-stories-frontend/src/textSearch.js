import React from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

//formUpdate taken from https://medium.com/byte-sized-react/controlled-forms-in-react-68e59362a119
//html code taken from https://react-bootstrap.github.io/components/navbar/

class TextSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({ input: '' });
        this.formUpdate = (event) => {
            this.setState({ input: event.target.value });
        }
        this.searchUpdate = () => {
            this.props.setSearch(this.state.input);
            this.setState({ input: '' }); //resets the search bar text field to blank
        }
    }

    render() {
        return (
            <>
                <Form inline>
                    <FormControl type="text" value={this.state.input} placeholder="Search" className="mr-sm-2" onChange={this.formUpdate}/>
                    <Button variant="outline-success" onClick={this.searchUpdate}>Search</Button>
                </Form>
            </>
            );
    }
}

export default TextSearch;
