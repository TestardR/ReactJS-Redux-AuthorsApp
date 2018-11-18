import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired, No longer necessary as we used mapDispatchToProps
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

// what data we want from the store for each component
// ownProps : this parameter let us access props attached to our component
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses // formulation from the rootreducer ("courses")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course)),
    actions: bindActionCreators(courseActions, dispatch) // using import, will filter all the actions
  };
}

// (optional) mapDispatchToProps : what actions you want to expose on your component
// without, our component automatically gets a dispatch property attached to it : this.props.dispatch (fire your actions, see onClickSave())
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
