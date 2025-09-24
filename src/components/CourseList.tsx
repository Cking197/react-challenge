
interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface CourseListProps {
    courses: Record<string, Course>;
}

const CourseList = ({ courses }: CourseListProps) => (
    <ul>
        {
            Object.entries(courses).map(([id, course]) => (
                <li key={id}>
                    {course.title} {course.term} ({course.number}): {course.meets}
                </li>   
            ))
        }
    </ul>
);

export default CourseList;