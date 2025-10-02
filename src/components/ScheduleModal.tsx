//components
import Modal from './Modal';
import ScheduleBlock from './ScheduleBlock';
import { findConflictingCourseIDs } from '../utilities/catchTimeConflicts';
import { orderClasses } from '../utilities/orderclasses';

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
                                    const orderedCourses = orderClasses(courses);
                                    const conflictIDs = findConflictingCourseIDs(orderedCourses);
                                    return <>
                                        {conflictIDs.length > 0 && (
                                            <div className="text-center text-red-600 font-bold mb-2">
                                                Warning: Your schedule has a time conflict!
                                            </div>
                                        )}
                                                            <div className="flex flex-col gap-2 my-2">
                                                                {(() => {
                                                                    const blocks = [];
                                                                    let lastTerm: string | undefined;
                                                                    for (const [id, course] of Object.entries(orderedCourses)) {
                                                                        if (lastTerm && course.term !== lastTerm) {
                                                                            blocks.push(<hr key={`hr-${id}`} className="my-2 border-t-2 border-gray-300" />);
                                                                        }
                                                                        blocks.push(
                                                                            <ScheduleBlock
                                                                                key={id}
                                                                                course={course}
                                                                                borderColor={conflictIDs.includes(id) ? "red" : "black"}
                                                                            />
                                                                        );
                                                                        lastTerm = course.term;
                                                                    }
                                                                    return blocks;
                                                                })()}
                                                            </div>
                                    </>;
                                })()
            )}
        </div>
    </Modal>
);

export default ScheduleModal;