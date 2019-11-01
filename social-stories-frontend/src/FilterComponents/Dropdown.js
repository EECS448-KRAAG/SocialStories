import React from 'react'
import Select from 'react-select'

class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            selectedCourse: {},
            validationError: "",
        }
        this.onChange = (opt) => {
            this.props.setCourse(opt.value);
            this.setState({selectedCourse: opt});
        }
    }

    componentWillMount() {
        window.fetch('/api/course')
        .then(response=> response.json())
        .then(json=> this.setState({courses: json}));
    }


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