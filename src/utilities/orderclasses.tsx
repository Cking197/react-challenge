import type Course from '../types/Course';
import {parseMeetingTime } from './catchTimeConflicts';

export const termOrder: Record<string, number> = {
    'Fall': 0,
    'Winter': 1,
    'Spring': 2
};

// Orders classes by term, then by first occurring session in a week
export function orderClasses(classes: Record<string, Course>): Record<string, Course> {
	const entries = Object.entries(classes);
	entries.sort(([, a], [, b]) => {
		// Compare term
		const termA = termOrder[a.term] ?? 99;
		const termB = termOrder[b.term] ?? 99;
		if (termA !== termB) return termA - termB;
		// Compare first day and time
		const aTime = parseMeetingTime(a.meets);
		const bTime = parseMeetingTime(b.meets);
		if (aTime.day !== bTime.day) return aTime.day - bTime.day;
		return aTime.start - bTime.start;
	});
	return Object.fromEntries(entries);
}
