import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import type Course from './types/Course';
import CourseFields from './components/CourseFields';
import { useSearch, useNavigate } from '@tanstack/react-router';

const CourseForm = () => {
  // Get defaults from URL search params
  const { number = '', term = '', title = '', meets = '' } = useSearch({
    from: '/courseForm'
  }) as Partial<Course>;

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Course>({
    defaultValues: { number, term, title, meets },
    mode: 'onChange',
  });
  
  const onSubmit: SubmitHandler<Course> = async(data) => {
    data
    // alert(`Submitting ${JSON.stringify(data)}`)
    // // Simulate a 2-second API call
    // await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const onError: SubmitErrorHandler<Course> = () => {
    alert('Submissions prevented due to form errors')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input type="number" {...register('number')} className="hidden" />
      <CourseFields register={register} errors={errors} />
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