import React from 'react'

class Dropdown extends React.Component()
{
    state = {
        classes: [],
        selectedCourses: "",
        validationError: ""
    }
    componentDidMount()
    {
        Window.fetch('/api/course')
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