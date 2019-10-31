import React from 'react';

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

class VisibleCourses extends React.Component
{
    constructor() {
        super()
        this.state = {
            courses: [],
            filteredCourses:[]
        }
    }

    componentWillMount()
    {
        this.setState({
        courses,
        filteredCourses: courses
        })
        
    }

    filterCourses = (courseFilter) =>
    {
        let filteredCourses = this.state.courses
        filteredCourses = filteredCourses((course) => 
        {
            let courseName = course.name
            return courseName.indexOf(courseFilter) !== -1
        })

        this.setState({ filteredCourses})
    }

    render()
    {
        return(
            <Courses courses={this.state.filteredCourses} match={this.props.match} onChange={this.filterCourses} />
        )
    }
}


export default VisibleCourses;