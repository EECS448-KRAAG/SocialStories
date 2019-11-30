import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import './filter.css'

/**
 * Create class component
 * @module FilterComponent/CreateClass
 * @requires none
 */
export default class CreateClass extends React.Component
{
    /**
     * Constructor
     * @name constructor
     * @memberof module:FilterComponent/CreateClass
     * @function constructor
     * @returns none
    */
    constructor()
    {
        super();
        this.state = 
        {
            course: "",
            show:false
        }
    }
    /**
     * onClick function - handles when user clicks the addCourse button
     * @name onClick
     * @memberof module:FilterComponent/CreateClass
     * @function onClick
     * @returns none
    */
    onClick = () =>
    {
        console.log("clicked!");
        this.setState({show:true})
    }

    /**
     * handleSubmit function - handles submission of createClass form
     * @name handleSubmit
     * @memberof module:FilterComponent/CreateClass
     * @function handleSubmit
     * @returns none
    */

    handleSubmit = (e) =>
    {
        console.log("course adding attempt");
        
        console.log(this.state.course);
        this.closeModal();
        this.postData();
    }

    /**
     * postData function - posts data given by user to the backend
     * @name postData
     * @memberof module:FilterComponent/CreateClass
     * @function postData
     * @returns none
    */

    async postData(){
        const data = { title: this.state.course.toUpperCase() };
        try{
            const response = await fetch('/api/course', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                  'Content-Type': 'application/json'
                }
            });
        }
        catch(ex)
        {
            alert(ex.toString());
        }
       
        console.error(await response.json());
    }

    /**
     * closeModal function - handles exit for modal
     * @name closeModal
     * @memberof module:FilterComponent/createClass
     * @function closeModal
     * @returns none
    */

    closeModal= () =>
    {
        this.setState({show:false});
        console.log("close attempt");
    }

     /**
     * handleCourseChange function - handles changes in text field
     * @name handleCourseChange
     * @memberof module:FilterComponent/createClass
     * @function handleCourseChange
     * @returns none
    */

    handleCourseChange= (e) =>
    {
        this.setState({course:e.target.value});
        console.log(e.target.value);
    }

    /**
     *Render - provides UI for adding a course
     * @name render
     * @memberof module:FilterComponent/createClass
     * @function render
     * @returns UI
    */
    render ()
    { 
        return(
            
            <div className="addCourseModal"  onHide={this.closeModal}>
                <Button variant="primary" id="modalTrig" className="button" value ="add course" onClick={this.onClick}>Add Course</Button>
                <Modal id="modal" show={this.state.show} onHide={this.closeModal}>
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
                        <Button  variant="secondary" onClick={this.closeModal}>Close</Button>
                        <Button id="open" type="submit" variant="primary" onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        );
        
    }
    
}
