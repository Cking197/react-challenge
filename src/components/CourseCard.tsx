import type {Course} from '../types/Course';
import { Link } from '@tanstack/react-router';
import { useAuthState } from '../utilities/firebase';

interface CourseCardProps {
  course: Course;
  selected: boolean;
  selectCourse: (course: Course) => void;
  disabled?: boolean;
}

const CourseCard = ({ course, selected, selectCourse, disabled = false }: CourseCardProps) => (
  <div
    className={`flex flex-col justify-between h-full w-full p-4 border-2 rounded-lg ${
      selected ? 'border-blue-500 bg-blue-50' : 'border-gray-400'
    }`}
    onClick={() => { if (!disabled) selectCourse(course); }}
    style={{
      minHeight: '220px',
      boxSizing: 'border-box',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      zIndex: 0,               // <--- ensure cards are behind fixed modals
      position: 'relative'     // keep stacking context predictable
    }}
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
      {(() => {
        const { user } = useAuthState();
        if (!user) return null;
        return (
          <Link
            to="/courseForm"
            search={{ number: course.number, term: course.term, title: course.title, meets: course.meets }}
            className="m-2 p-2 border rounded bg-blue-500 text-white"
            style={{ width: '100%', textAlign: 'center' }}
            onClick={(e) => { /* allow edit even when disabled; stop propagation so outer onClick not triggered */ e.stopPropagation(); }}
          >
            Edit Course
          </Link>
        );
      })()}
    </div>
  </div>
);

export default CourseCard;