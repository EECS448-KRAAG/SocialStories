import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import './filter.css'

class CreateClass extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            course: "",
            show:false
        }
    }

    onClick = () =>
    {
        console.log("clicked!");
        this.setState({show:true})
        // return< AddCourse />
    }

    addCourse = (e) =>
    {
        console.log("course adding attempt");
        if(e.target.value="")
        {
            alert("course name required")
        }
        this.setState({course: e.target.value})
        console.log(e.target.value)
    }

    handleSubmit = (e) =>
    {

    }

    closeModal= () =>
    {
        this.setState({show:false});
        console.log("close attempt");
    }

    handleCourseChange= (e) =>
    {
        this.setState({course:e.target.value})
    }


    render ()
    { 
        return(
            
            <div className="addCourseModal" onHide={this.closeModal}>
                <Button variant="primary" className="button" value ="add course" onClick={this.onClick}>Add Course</Button>
                <Modal show={this.state.show} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Course</Modal.Title>
                    </Modal.Header> 
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <p>Enter class to add:</p>
                            <Form.Control onChange={this.handleCourseChange}  />
                        </Form>
                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        <Button variant="primary" onClick={this.addCourse}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        );
        
    }
    
}

export default CreateClass;