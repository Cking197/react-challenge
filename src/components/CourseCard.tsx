
import type Course from './Course';

interface CourseCardProps {
    course: Course;
}   

const CourseCard = ({ course }: CourseCardProps) => (
  <div className="flex flex-col items-left h-50 w-50 p-2 border-2 border-gray-400 rounded-lg">
    <div className="font-bold text-xl">
      {`${course.term} CS${course.number}`}
    </div>
    <div className="text-lg text-left">
      {course.title}
    </div>
    <hr className="w-full border-t-2 border-gray-300 my-2" />
    <div className="flex-grow text-bottom">
      { course.meets}
    </div>
  </div>
);

export default CourseCard;