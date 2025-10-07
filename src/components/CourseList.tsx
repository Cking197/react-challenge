import type {Course} from '../types/Course';

interface CourseListProps {
    courses: Record<string, Course>;
}

const CourseList = ({ courses }: CourseListProps) => (
    <ul>
        {
            Object.entries(courses).map(([id, course]) => (
                <li key={id}>
                    CS{course.number} {course.title} {course.term}:<br />
                    {course.meets}<br /> <br />

                </li>
            ))
        }
    </ul>
);

export default CourseList;