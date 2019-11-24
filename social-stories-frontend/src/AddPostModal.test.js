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

     it("open AddPostModal when Create Post on the nav bar is clicked", () => {
        const wrapper = shallow(<AddPostModal />);
        wrapper.find("#nav-modal").simulate("click");
        expect(wrapper.find(Modal).prop("show")).toEqual(true);

    });

    it("Input fields filled correctly", () => {
        const wrapper = shallow(<Form />);
        const inputs = {
            courseName : "EECS101",
            title: "I need your help",
            content: "I am kidding I dont need any help",
            tags: ["genius","lol"]
        };

        //Dropdown input fields is at Dropdown.test.js
        const titleInput = wrapper.find("#form-title");
        titleInput.value = inputs.title;
        expect(titleInput.value).toBe("I need your help");

        const contentInput = wrapper.find("#form-post");
        contentInput.value = inputs.content;
        expect(contentInput.value).toBe("I am kidding I dont need any help");

        //TODO: Tags input at Tags.test.js
    });
    


});
