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
    /^$|^(?:[MTWRF]+) \d{1,2}:\d{2}-\d{1,2}:\d{2}$/,
    "Must be empty or a meeting time like 'MWF 10:00-11:50' (days: M T W R F)"
  ),
  title: z.string().trim().min(2),
});

export type Course = z.infer<typeof courseSchema>;

export const courseResolver = zodResolver(courseSchema);

export default courseSchema;