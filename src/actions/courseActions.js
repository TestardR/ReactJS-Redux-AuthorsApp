import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSucess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses }; // course: course
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getAllCourses()
      .then(courses => {
        dispatch(loadCoursesSucess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}
