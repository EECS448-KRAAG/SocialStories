import React from 'react';

class CourseList extends React.Component
{
    render()
    {
        return(
            <ul>
                <li> {this.props.contacts.name} {this.props.contact}</li>
            </ul>
        )
    }
}