import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import { bindActionCreators } from 'redux';

class CoursesPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title: '' }
    };

    this.onTitleChange = this.onTitleChange.bind(this); // this needs to be bound to the instance of our component
    this.onClickSave = this.onClickSave.bind(this); // bindind this to the coursespage component
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onClickSave() {
    this.props.actions.createCourse(this.state.course); // since we used bindActionCreator
    // this.props.createCourse(this.state.course);
    // this.props.dispatch(courseActions.createCourse(this.state.course));
    // fire off the action
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange} // we could .bind(this) here, but binding in render causes performance issues
          value={this.state.course.title}
        />
        <input type="submit" value="Save" onClick={this.onClickSave} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  // dispatch: PropTypes.func.isRequired, No longer necessary as we used mapDispatchToProps
  courses: PropTypes.object.isRequired,
  actions: PropTypes.func.isRequired
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
