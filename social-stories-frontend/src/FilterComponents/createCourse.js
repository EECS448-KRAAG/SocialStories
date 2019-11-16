import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import './filter.css'

export default class CreateClass extends React.Component
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
    }


    handleSubmit = (e) =>
    {
        console.log("course adding attempt");
        
        console.log(this.state.course);
        this.closeModal();
        this.postData();
    }

    async postData(){
        const data = { title: this.state.course.toUpperCase() };
        const response = await fetch('/api/course', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.error(await response.json());
    }

    closeModal= () =>
    {
        this.setState({show:false});
        console.log("close attempt");
    }

    handleCourseChange= (e) =>
    {
        this.setState({course:e.target.value});
        console.log(e.target.value);
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
                            <Form.Label>Enter class to add:</Form.Label>
                            <Form.Control onChange={this.handleCourseChange}  />
                        </Form>
                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        <Button type="submit" variant="primary" onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        );
        
    }
    
}
