import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

export const courseSchema = z.object({
  term: z.enum(['Fall', 'Winter', 'Spring', 'Summer'],
  "Term must be one of: Fall, Winter, Spring, or Summer"
  ),
  number: z.string().trim().regex(
    /^\d+(?:-\d+)?$/,
    "Course number must be digits with an optional section, e.g. '213' or '213-2'"
  ),
  meets: z.string().trim().regex(
    // allow empty OR sequences of day tokens (M, Tu, W, Th, F) followed by a 24-hour time range hh:mm-hh:mm
    /^$|^(?:(?:M|Tu|W|Th|F)+) (?:[01]?\d|2[0-3]):[0-5]\d-(?:[01]?\d|2[0-3]):[0-5]\d$/,
    "Must be empty or a meeting time like 'MWF 10:00-11:50' or 'TuTh 14:00-15:20' (days: M Tu W Th F)"
  ),
  title: z.string().trim().min(2),
});

export type Course = z.infer<typeof courseSchema>;

export const courseResolver = zodResolver(courseSchema);

export default courseSchema;