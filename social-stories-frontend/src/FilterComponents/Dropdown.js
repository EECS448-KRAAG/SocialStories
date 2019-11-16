import React from 'react';
import Select from 'react-select';
import CreateClass from './createCourse';

/**
 * Dropdown module
 * @module FilterComponent/Dropdown
 * @requires none
 */

class Dropdown extends React.Component {
    /**
     * Constructor
     * @name constructor
     * @memberof module:FilterComponent/Dropdown
     * @function constructor
     * @returns none
    */
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            selectedCourse: {'value': "EECS101", 'label': "EECS101"},
            validationError: "",
            show: false
        }
        props.setCourse("EECS101");
        /**
         * onChange functions - handles when user types in the dropdown
         * @name onChange
         * @memberof module:FilterComponent/Dropdown
         * @function onChange
         * @returns none
        */
        this.onChange = (opt) => {
            this.props.setCourse(opt.value);
            this.setState({selectedCourse: opt});
        }

       

       
    }

    /**
     * Fetching courses from backend
     * @name componentWillMount
     * @memberof module:FilterComponent/Dropdown
     * @function componentWillMount
     * @returns list of courses from backend
    */
    componentWillMount() {
        window.fetch('/api/course')
        .then(response=> response.json())
        .then(json=> this.setState({courses: json}));
    }

   


    

    /**
     *Render - provides UI for dropdown
     * @name render
     * @memberof module:FilterComponent/Dropdown
     * @function render
     * @returns UI
    */
    render() {
        return(
            <div className="dropdown">
                <div className="container">
                    <Select className="selectDrop" value={this.state.selectedCourse} options={this.state.courses.map(x => {return {'value': x.title, 'label': x.title}})} onChange={this.onChange}/>
                    <CreateClass/>
                </div>
            </div>
        )
    }
}

export default Dropdown;