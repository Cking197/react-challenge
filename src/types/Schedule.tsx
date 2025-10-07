import type {Course} from '../types/Course';


export default interface Schedule {
    title: string;
    courses: Record<string, Course>;
}