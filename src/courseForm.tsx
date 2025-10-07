import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import type { Course } from './types/Course';
import CourseField from './components/CourseField';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { courseResolver } from './types/Course';

const CourseForm = () => {
  // Get defaults from URL search params
  const search = useSearch({ from: '/courseForm' }) as Record<string, string | undefined>;
  const { number = '', term: rawTerm, title = '', meets = '' } = search;
  const term = rawTerm === '' ? undefined : (rawTerm as Course['term'] | undefined);
  
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Course>({
    defaultValues: { number, term, title, meets },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: courseResolver,
  });
  
  const onSubmit: SubmitHandler<Course> = async(data) => {
    data
    alert(`Submitting ${JSON.stringify(data)}`)
    // Simulate a 2-second API call
    await new Promise(resolve => setTimeout(resolve, 2000));
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