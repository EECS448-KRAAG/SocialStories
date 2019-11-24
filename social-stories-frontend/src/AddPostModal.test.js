import React, { Component } from 'react';
import {Modal, Nav, Form, Button} from "react-bootstrap"
import AddPostModal from "./AddPostModal";
import {shallow,mount} from "enzyme";
import {findDOMNode} from "react-dom";
import expect from "expect";

describe("<AddPostModal>", () => {
    
    it ("renders <Modal>", () => {
        const wrapper = shallow (<AddPostModal />);
        expect(wrapper.find(Modal).length).toEqual(1);
    });

    it("should close the modal when the submit button is clicked", () => {
        const wrapper = shallow (<AddPostModal />);
        wrapper.find("Button").simulate("click");
        expect(wrapper.find(Modal).prop("show")).toEqual(false);
    });
    //Testing function calls
    it("call the handleSubmit on submit button click", () => {
        const handleSubmit = jest.fn();
        const wrapper = mount ( 
            <Button type="submit" variant="primary" onClick={handleSubmit}>
                Submit Post
            </Button>
        )
        wrapper.find("Button").simulate("click");
        expect(handleSubmit).toHaveBeenCalled();
        wrapper.unmount();
    });

    
    


});
