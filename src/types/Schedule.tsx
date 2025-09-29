import type Course from './Course';

export default interface Schedule {
    title: string;
    courses: Record<string, Course>;
}