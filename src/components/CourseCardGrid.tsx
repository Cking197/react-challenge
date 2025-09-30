import type Course from '../types/Course';
import CourseCard from './CourseCard';


interface CourseCardGridProps {
    courses: Record<string, Course>;
    selectedCourses: string[];
    selectCourse: (id: string) => void;
}   

const CourseCardGrid = ({ courses,selectedCourses,selectCourse }: CourseCardGridProps) => (
  <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-1 px-4">
    {   Object.entries(courses).map(([id, course]) => (
          <CourseCard 
          key={id} 
          course={course}
          selected={selectedCourses.includes(id)}
          selectCourse={() => selectCourse(id)}
          />
        ))
    }
  </div>        
);

export default CourseCardGrid;