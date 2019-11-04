import React from 'react'
import Select from 'react-select'

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
    constructor() {
        super();
        this.state = {
            courses: [],
            selectedCourse: {},
            validationError: "",
        }
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
                    <Select value={this.state.selectedCourse} options={this.state.courses.map(x => {return {'value': x.title, 'label': x.title}})} onChange={this.onChange}/>
                </div>
            </div>
        )
    }
}

export default Dropdown;