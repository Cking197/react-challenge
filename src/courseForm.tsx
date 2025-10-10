import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import type { Course } from './types/Course';
import CourseField from './components/CourseField';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { courseResolver } from './types/Course';
import { updateCourse } from './utilities/firebase';

const CourseForm = () => {
  // Get defaults from URL search params
  const search = useSearch({ from: '/courseForm' }) as Record<string, string | undefined>;
  const { number = '', term: rawTerm, title = '', meets = '' } = search;
  const term = rawTerm === '' ? undefined : (rawTerm as Course['term'] | undefined);
  
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Course>({
    defaultValues: { number, term, title, meets },
    mode: 'onChange',
    resolver: courseResolver,
  });
  // store the original course ID from the incoming search params so updates
  // can target the original record even if the user changes the term/number
  const oldCourseID = rawTerm && number ? rawTerm.charAt(0) + number : undefined;
  
  const onSubmit: SubmitHandler<Course> = async(data) => {
    try {
      //Course ID is first letter of term + number
      const newCourseID = data.term?.charAt(0) + data.number;
      await updateCourse(oldCourseID,newCourseID, data);
      navigate({ to: '/' });
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to save course: ${error.message}`);
      } else {
        alert('Failed to save course due to an unknown error');
      }
    }
  };

  const onError: SubmitErrorHandler<Course> = () => {
    alert('Submissions prevented due to form errors')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <CourseField name={'number'} label={'Number'} register={register} errors={errors}  />
      <CourseField name={'term'} label={'Term'} register={register} errors={errors}  />
      <CourseField name={'title'} label={'Title'} register={register} errors={errors}  />
      <CourseField name={'meets'} label={'Meets'} register={register} errors={errors}  />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '16px' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="m-4 p-2 border rounded bg-blue-500 text-white"
        >
          Submit
        </button>
        <button
          type="button"
          className="m-4 p-2 border rounded bg-gray-400 text-white"
          onClick={() => navigate({ to: '/' })}
        >
          Cancel
        </button>
      </div>
    </form>
  )
};

export default CourseForm;