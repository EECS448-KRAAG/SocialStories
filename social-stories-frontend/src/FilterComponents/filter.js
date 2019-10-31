import React from 'react';
import Courses from './Courses'
// import ReactDOM from 'react-dom';
// import './index.css';
// ReactDOM.render(<filterForm />, document.getElementById('root'));


class Filter extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state = 
        {
            courseFilter: ""
        };
    }


    handleChange = (e) =>
    {
        this.setState ({
             courseFilter: e.target.value 
            });
        // this.props.onChange(e.target.value);

        console.log(e.target.value);
    }

    render()
    {
        let filteredCourses= this.props.courses.filter(
            (course) => {
                return course.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return(
            <div>
                <label htmlFor="filter">Filter by Course: </label>
                <div>
                    <ul>
                        {filteredCourses.map((course)=> {
                            return <Courses course={course} key={course.name}/>
                        })}
                    </ul>
                </div>
                <input type ="text" id="filter" value={this.state.courseFilter} 
                onChange={this.handleChange}/>
            </div>
        )
    }
}

export default Filter;



