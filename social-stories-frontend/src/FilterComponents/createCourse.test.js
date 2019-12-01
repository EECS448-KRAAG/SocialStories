import React from 'react';
import ReactDOM from 'react-dom'
import {Button} from 'react-bootstrap'
import CreateCourse from './createCourse'
import {shallow} from 'enzyme'
import Dropdown from './Dropdown'
import render from 'riteway/render-component';
import { isMainThread } from 'worker_threads';
import { isRegExp } from 'util';

/* *
NEED TO TEST:
    - renders without crashing 
    - clicking button triggers modal
    - add course in modal actually does something
    - close button hides the modal

* */

describe('CreatePost component', () => {
    it('renders without crashing', () =>
    {
        const div = document.createElement("div");
        ReactDOM.render(<CreateCourse/>, div)
    })

    it('does not load modal immediately', () =>
    {
        const wrapper = shallow (<CreateCourse />);
        expect(wrapper.find("open").length).toEqual(0);

    })

    it('loads modal when clicked', ()=>
    {
        const wrapper = shallow (<CreateCourse />)
        expect(wrapper.find("Button").length).toEqual(3);
        wrapper.find("Button").first().simulate("click")
        expect(wrapper.find("#modal").prop("show")).toEqual(true);

    })

    it('closes when close is clicked', () =>
    {
        const wrapper = shallow (<CreateCourse />)
        expect(wrapper.find("Button").length).toEqual(3);
        wrapper.find("Button").at(1).simulate("click")
        expect(wrapper.find("#modal").prop("show")).toEqual(false);
    })
   


})