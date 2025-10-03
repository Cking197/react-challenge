import type Course from '../types/Course';
import { Link } from '@tanstack/react-router';

interface CourseCardProps {
  course: Course;
  selected: boolean;
  selectCourse: (course: Course) => void;
}

const CourseCard = ({ course, selected, selectCourse }: CourseCardProps) => (
  <div
    className={`flex flex-col justify-between h-full w-full p-4 border-2 rounded-lg cursor-pointer ${
      selected ? 'border-blue-500 bg-blue-50' : 'border-gray-400'
    }`}
    onClick={() => selectCourse(course)}
    style={{ minHeight: '220px', boxSizing: 'border-box' }}
  >
    <div>
      <div className="font-bold text-xl mb-1">
        {`${course.term} CS${course.number}`}
      </div>
      <div className="text-lg text-left mb-2" style={{ fontSize: '1rem' }}>
        {course.title}
      </div>
      <hr className="w-full border-t-2 border-gray-300 my-2" />
      <div className="flex-grow text-bottom">
        {course.meets}
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
      <Link
        to="/courseForm"
        search={{ number: course.number, term: course.term, title: course.title, meets: course.meets }}
        className="m-2 p-2 border rounded bg-blue-500 text-white"
        style={{ width: '100%', textAlign: 'center' }}
      >
        Edit Course
      </Link>
    </div>
  </div>
);

export default CourseCard;