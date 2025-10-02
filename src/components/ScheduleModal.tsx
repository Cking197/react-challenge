//components
import Modal from './Modal';
import ScheduleBlock from './ScheduleBlock';
import { findConflictingCourseIDs } from '../utilities/catchTimeConflicts';

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
                (() => {
                    const conflictIDs = findConflictingCourseIDs(courses);
                    return <>
                        {conflictIDs.length > 0 && (
                            <div className="text-center text-red-600 font-bold mb-2">
                                Warning: Your schedule has a time conflict!
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2 my-2">
                            {Object.entries(courses).map(([id, course]) => (
                                <ScheduleBlock
                                    key={id}
                                    course={course}
                                    borderColor={conflictIDs.includes(id) ? "red" : "black"}
                                />
                            ))}
                        </div>
                    </>;
                })()
            )}
        </div>
    </Modal>
);

export default ScheduleModal;