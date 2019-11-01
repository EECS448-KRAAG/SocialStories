import React from 'react'


let courses= [ 
    {
        name: "EECS 448",
        content: "This is a cool class. Learn Github",
        creator: "Antonette Gichohu"
    },
    {
        name: "EECS 210",
        content: "One of the harder courses, definitely memorize what they tell you to",
        creator: "Karen Setiawan"
    },
    {
        name: "EECS 368",
        content: "Great stuff",
        creator: "Antonette Gichohu"
    },
    {
        name: "EECS 268",
        content: "Lol, good luck",
        creator: "Antonette Gichohu"
    }
];

class Dropdown extends React.Component()
{
    state = {
        classes: [],
        selectedCourses: "",
        validationError: ""
    }
    componentDidMount()
    {
        window.fetch('/api/course')
        .then((response) => {
            return response.json();
          })
        .then(data => {
            let coursesFromApi = data.map(team => { return {id: courseID, title: courseTitle} })
            this.setState({ classes: [{id: '', display: '(Select courses)'}].concat(coursesFromApi) });
            }).catch(error => {
            console.log(error);
        });
    }

    render()
    {
        return( 
            <div>
                <select value={this.state.selectedCourses}
                    onChange={(e)=> this.setState({selectedCourse: e.target.value, 
                        validationError: e.target.value === "" ? "You must select a course" : ""})}></select>
                <div style={{color: 'red', marginTop: '5px'}}>
                {this.state.validationError} 
            </div>
            </div>
            
        )
    }
}

export default Dropdown;