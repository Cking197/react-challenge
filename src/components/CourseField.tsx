import type { Course } from '../types/Course';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface CourseFieldProps {
  name: keyof Course;
  label: string;
  errors: FieldErrors<Course>;
  register: UseFormRegister<Course>;
}

const CourseField = ({ name, label, errors, register }: CourseFieldProps) => {
  const message = (errors as any)?.[name]?.message as string | undefined;

  const reg = register(name as any);

  return (
    <label>
      <p className="text-lg">
        {label}
        {message && (
          <span className="text-sm inline-block pl-2 text-red-400 italic">
            {message}
          </span>
        )}
      </p>
      <input
        {...reg}
        className={`w-full rounded border ${message ? 'border-red-500' : 'border-gray-300'} bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-80`}
      />
    </label>
  );
};

export default CourseField;