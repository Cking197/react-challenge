import type Course from './Course';
import CourseCard from './CourseCard';


interface CourseCardGridProps {
    courses: Record<string, Course>;
}   

const CourseCardGrid = ({ courses }: CourseCardGridProps) => (
  <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-1 px-4">
    {   Object.entries(courses).map(([id, course]) => (
          <CourseCard key={id} course={course} />
        ))
    }
  </div>        
);

export default CourseCardGrid;