import React from 'react';
import { Navbar, Nav, Modal, Form, Button } from "react-bootstrap";
import Select from 'react-select';
import TextSearch from './textSearch';
import Header from './Header';
import AddPostModal from './AddPostModal';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { shallow, mount } from 'enzyme'
import ReactDOM from 'react-dom'

describe('<Header>', () => {
    const data = [{
        level: 0
    }]


    it('renders <Header>', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Header setSearch={() => { }} />, div);
    });

    //test Add Instructor
    //test close when submit button is clicked
    it('close Add Instructor modal when the "Confirm Change" button is clicked', () => {
        const wrapper = shallow(<Header />);
        wrapper.find("Button").at(0).simulate("click");
        expect(wrapper.find(Modal).at(0).prop("show")).toEqual(false);
    });

    //test call handleInstrucAddSubmit when "Confirm Change" is clicked
    it("call the handleInstrucAddSubmit on Confirm Change button click", () => {
        const handleInstrucAddSubmitMock = jest.fn();
        const wrapper = mount(
            <Button type="submit" variant="primary" onClick={handleInstrucAddSubmitMock}>
                Confirm Change
           </Button>
        )
        wrapper.find("Button").simulate("click");
        expect(handleInstrucAddSubmitMock).toHaveBeenCalled();
        wrapper.unmount();
    });

    //test call AddInstrucData
    it("calling AddInstrucData works", () => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        const wrapper = shallow(<Header data={data} />);
        wrapper.find("Button").at(0).simulate("click");
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith("/api/user");
    });


    //test Remove Instructor
    //test close when submit button is clicked
    it('close Remove Instructor modal when the "Confirm Change" button is clicked', () => {
        const wrapper = shallow(<Header />);
        wrapper.find("Button").at(1).simulate("click");
        expect(wrapper.find(Modal).at(1).prop("show")).toEqual(false);
    });

    //test call handle button when submit is clicked
    it("call the handleInstrucRemoveSubmit on Confirm Change button click", () => {
        const handleInstrucRemoveSubmitMock = jest.fn();
        const wrapper = mount(
            <Button type="submit" variant="primary" onClick={handleInstrucRemoveSubmitMock}>
                Confirm Change
           </Button>
        )
        wrapper.find("Button").simulate("click");
        expect(handleInstrucRemoveSubmitMock).toHaveBeenCalled();
        wrapper.unmount();
    });

    //test call RemoveInstrucData
    it("calling RemoveInstrucData works", () => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        const wrapper = shallow(<Header data={data} />);
        wrapper.find("Button").at(1).simulate("click");
        expect(global.fetch).toHaveBeenCalledTimes(3);
        expect(global.fetch).toHaveBeenCalledWith("/api/user");
    });

    //test Add Admin
    //test close when submit button is clicked
    it('close Add Admin modal when the "Confirm Change" button is clicked', () => {
        const wrapper = shallow(<Header />);
        wrapper.find("Button").at(2).simulate("click");
        expect(wrapper.find(Modal).at(2).prop("show")).toEqual(false);
    });

    //test call handle button when submit is clicked
    it("call the handleAdminAddSubmit on Confirm Change button click", () => {
        const handleAdminAddSubmitMock = jest.fn();
        const wrapper = mount(
            <Button type="submit" variant="primary" onClick={handleAdminAddSubmitMock}>
                Confirm Change
           </Button>
        )
        wrapper.find("Button").simulate("click");
        expect(handleAdminAddSubmitMock).toHaveBeenCalled();
        wrapper.unmount();
    });

    //test call AddAdminData
    it("calling AddAdminData works", () => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        const wrapper = shallow(<Header data={data} />);
        wrapper.find("Button").at(2).simulate("click");
        expect(global.fetch).toHaveBeenCalledTimes(5);
        expect(global.fetch).toHaveBeenCalledWith("/api/user");
    });

    //test Remove Admin
    //test close when submit button is clicked
    it('close Remove Admin modal when the "Confirm Change" button is clicked', () => {
        const wrapper = shallow(<Header />);
        wrapper.find("Button").at(3).simulate("click");
        expect(wrapper.find(Modal).at(3).prop("show")).toEqual(false);
    });

    //test call handle button when submit is clicked
    it("call the handleAdminRemoveSubmit on Confirm Change button click", () => {
        const handleAdminRemoveSubmitMock = jest.fn();
        const wrapper = mount(
            <Button type="submit" variant="primary" onClick={handleAdminRemoveSubmitMock}>
                Confirm Change
           </Button>
        )
        wrapper.find("Button").simulate("click");
        expect(handleAdminRemoveSubmitMock).toHaveBeenCalled();
        wrapper.unmount();
    });

    //test call RemoveAdminData
    it("calling RemoveAdminData works", () => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        const wrapper = shallow(<Header data={data} />);
        wrapper.find("Button").at(3).simulate("click");
        expect(global.fetch).toHaveBeenCalledTimes(7);
        expect(global.fetch).toHaveBeenCalledWith("/api/user");
    });
});
