import React from 'react';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import TextSearch from './textSearch';
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom'

describe('<TextSearch>', () => {
    it('renders <TextSearch>', () => {
        const div = document.createElement("div");
        ReactDOM.render(<TextSearch setSearch={() => { }} />, div);
    });

    it('handles text input', () => {
        const setSearchMock = jest.fn();
        const event = {
            target: { value: 'test-value' }
        };
        const component = shallow(<TextSearch setSearch={setSearchMock} />);
        component.find('FormControl').simulate('change', event);
        expect(setSearchMock).toBeCalledWith('test-value');
    });  //format for test taken from https://stackoverflow.com/questions/48180499/testing-onchange-function-in-jest
});
