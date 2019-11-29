// Link.react.test.js
import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'
import Dropdown from './Dropdown'
import render from 'riteway/render-component';

let courses = [{
    title: 'EECS 368'
}]

describe('Dropdown component', () =>
{
    it('renders without crashing', () =>
    {
        const div = document.createElement("div");
        ReactDOM.render(<Dropdown setCourse={() => {}}/>, div);
    })

    it('renders correctly', done => { // 1
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
        
        const wrapper = shallow(<Dropdown setCourse={() => {}} />); // 5
                                
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('/api/course');
    
        process.nextTick(() => { // 6
          expect(wrapper.state().courses).toEqual({

          }
            // ... assert the set state
            // courses
          );
    
          global.fetch.mockClear(); // 7
          done(); // 8
        });

    });
});