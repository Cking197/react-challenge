import type {Course} from '../types/Course';
import CourseCard from './CourseCard';


interface CourseCardGridProps {
    courses: Record<string, Course>;
    selectedCourses: string[];
    selectCourse: (id: string) => void;
    disabledCourses?: string[];
}   

const CourseCardGrid = ({ courses, selectedCourses, selectCourse, disabledCourses = [] }: CourseCardGridProps) => (
  <div className="grid grid-cols-7 gap-1 px-4">
    {Object.entries(courses).map(([id, course]) => (
      <CourseCard
        key={id}
        course={course}
        selected={selectedCourses.includes(id)}
        selectCourse={() => selectCourse(id)}
        disabled={disabledCourses.includes(id)}
      />
    ))}
  </div>        
);

export default CourseCardGrid;