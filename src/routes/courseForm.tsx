import { createFileRoute } from '@tanstack/react-router'
import CourseForm from '../courseForm';

export const Route = createFileRoute('/courseForm')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CourseForm />;
}
