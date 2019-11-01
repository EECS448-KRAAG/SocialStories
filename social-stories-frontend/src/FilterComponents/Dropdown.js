import React from 'react'
import Select from 'react-select'


let courses= [ 
    {title: "EECS 448"},
    {title: "EECS 210"},
    {title: "EECS 368"},
    {title: "EECS 268"}
];

class Dropdown extends React.Component
{
    state = {
        courses: [],
        selectedCourses: "",
        validationError: "",
        
    }

    componentWillMount()
    {
        window.fetch('/api/course')
        .then(response=> response.json())
        .then(json=> this.setState({courses: json}));
    }


    render()
    {
        return(
            <div className="dropdown">
                <div className="container">
                    <Select value={'EECS140'} options={this.state.courses.map(x => {return {'value': x.title, 'label': x.title}})} onChange={opt => console.log(opt.title)} />
                </div>
            </div>
        )
        
    }
}

export default Dropdown;