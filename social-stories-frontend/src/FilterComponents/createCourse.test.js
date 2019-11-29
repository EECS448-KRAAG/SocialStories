import React from 'react';
import ReactDOM from 'react-dom'
import CreateCourse from './createCourse'
import {shallow} from 'enzyme'
import Dropdown from './Dropdown'
import render from 'riteway/render-component';
import { isMainThread } from 'worker_threads';
import { isRegExp } from 'util';

describe('CreatePost component', () =>{
    it('renders without crashing', () =>
    {
        const div = document.createElement("div");
        ReactDOM.render(<CreateCourse/>, div)
    })

    it('hides when closed', () =>
    {
         
    })
})