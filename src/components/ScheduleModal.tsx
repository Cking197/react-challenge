//components
import Modal from './Modal';
import CourseList from './CourseList';

//types
import type Course from '../types/Course';

interface ScheduleModalProps {
    courses: Record<string, Course>; // or string[] if it's an array of IDs
    isOpen: boolean;
    onClose: () => void
}

const ScheduleModal = ({ courses, isOpen, onClose }: ScheduleModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col">
            <h2 className="text-lg font-bold">Schedule:</h2>
            {Object.keys(courses).length === 0 ? (
                <div className="text-center text-gray-500 my-4">
                    Click a course to add it to your schedule.
                </div>
            ) : (
                <CourseList courses={courses} />
            )}
        </div>
    </Modal>
);

export default ScheduleModal;