import type Course from '../types/Course';

//helpers
export const dayOrder: Record<string, number> = {
    'M': 0,
    'T': 1,
    'W': 2,
    'R': 3,
    'F': 4,
    'S': 5,
    'U': 6
};

export function parseMeetingTime(meets: string) {
    const [days, time] = meets.split(' ');
    const firstDay = days[0];
    const [start, end] = time.split('-');
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    return {
        days,
        firstDay,
        day: dayOrder[firstDay] ?? 99,
        start: startHour * 60 + startMinute,
        end: endHour * 60 + endMinute
    };
}


// Returns array of course IDs that have time conflicts with any other selected course
export function findConflictingCourseIDs(selectedCourses: Record<string, Course>): string[] {
    const ids = Object.keys(selectedCourses);
    const conflicts = new Set<string>();

    for (let i = 0; i < ids.length; i++) {
        const idA = ids[i];
        const courseA = selectedCourses[idA];
        const timeA = parseMeetingTime(courseA.meets);
        for (let j = i + 1; j < ids.length; j++) {
            const idB = ids[j];
            const courseB = selectedCourses[idB];
            // Only check conflicts if courses are in the same term
            if (courseA.term !== courseB.term) continue;
            const timeB = parseMeetingTime(courseB.meets);
            // Check if days overlap
            if ([...timeA.days].some(day => timeB.days.includes(day))) {
                // Check if times overlap
                if (!(timeA.end <= timeB.start || timeA.start >= timeB.end)) {
                    conflicts.add(idA);
                    conflicts.add(idB);
                }
            }
        }
    }
    return Array.from(conflicts);
}