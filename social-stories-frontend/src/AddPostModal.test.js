import React from 'react';
import {Modal, Nav, Form, Button} from "react-bootstrap"
import AddPostModal from "./AddPostModal";
import {shallow,mount} from "enzyme";
import expect from "expect";

describe("<AddPostModal>", () => {
    it ("renders <Modal>", () => {
        const wrapper = shallow (<AddPostModal />);
        expect(wrapper.find(Modal).length).toEqual(1);
    });

    it("should close the modal when the X button is clicked", () => {
        const wrapper = shallow (<AddPostModal />);
        wrapper.find("Button").simulate("click");
        expect(wrapper.find(Modal).prop("show")).toEqual(false);
    });
    
});
