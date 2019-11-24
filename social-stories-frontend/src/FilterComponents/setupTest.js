import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import fetch from './__mocks__/fetch';
 
global.fetch = fetch;
 
configure({adapter: new Adapter()});