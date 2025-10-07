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

//returns false if either course is missing meeting info or if terms differ

export function coursesConflict(a?: Course, b?: Course): boolean {
    if (!a || !b) return false;
    if (!a.meets || !b.meets) return false;
    if (a.term !== b.term) return false;

    try {
        const ta = parseMeetingTime(a.meets);
        const tb = parseMeetingTime(b.meets);

        // days overlap?
        const daysOverlap = [...ta.days].some(d => tb.days.includes(d));
        if (!daysOverlap) return false;

        // time overlap?
        return !(ta.end <= tb.start || ta.start >= tb.end);
    } catch {
        // parsing error => treat as non-conflicting
        return false;
    }
}


// Optional: keep a convenience function that uses the pairwise check
// to find all conflicting IDs among a set of selected courses.
export function findConflictingCourseIDs(selectedCourses: Record<string, Course>): string[] {
    const ids = Object.keys(selectedCourses);
    const conflicts = new Set<string>();

    for (let i = 0; i < ids.length; i++) {
        const idA = ids[i];
        for (let j = i + 1; j < ids.length; j++) {
            const idB = ids[j];
            if (coursesConflict(selectedCourses[idA], selectedCourses[idB])) {
                conflicts.add(idA);
                conflicts.add(idB);
            }
        }
    }
    return Array.from(conflicts);
}