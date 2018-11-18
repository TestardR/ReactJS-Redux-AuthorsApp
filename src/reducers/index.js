import { combineReducers } from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
  courses // shorthand property name in ES6, equivalent to courses: courses
});

export default rootReducer;
