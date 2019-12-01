// Link.react.test.js
import React from 'react';
import {Button, Badge, Card} from 'react-bootstrap';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'
import HomeDisplay from './HomeDisplay'
import render from 'riteway/render-component';

describe('<HomeDisplay>', () =>
{
  const data = [{
    title: '',
    content: "",
    tags: ['']
  }]
  it('renders <HomeDisplay>', () =>
  {
      const div = document.createElement("div");
      ReactDOM.render(<HomeDisplay data={data}/>, div);
  })
  it("call flagPost", () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
      const wrapper = shallow (<HomeDisplay data={data}/>);
      wrapper.find("Button").simulate("click");
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith("/api/course/undefined/post/undefined/flag", {"body": "{\"flagged\":true}", "headers": {"Content-Type": "application/json"}, "method": "PUT"});
  });

  it("call deletePost", () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
      const wrapper = shallow (<HomeDisplay data={data}/>);
      wrapper.find("Button").simulate("click");
      expect(global.fetch).toHaveBeenCalledTimes(2);
  });

});
