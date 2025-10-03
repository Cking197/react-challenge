import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type Course from '../types/Course';

interface CourseFieldsProps {
  register: UseFormRegister<Course>;
  errors: FieldErrors<Course>;
}

const inputStyle = {
  padding: '8px',
  marginTop: '4px',
  marginBottom: '12px',
  border: '2px solid #3b82f6',
  borderRadius: '6px',
  width: '100%',
  fontSize: '1rem',
  background: '#f0f9ff',
};

const labelStyle = {
  fontWeight: 'bold',
  fontSize: '1.1rem',
  color: '#1e293b',
};

const CourseFields = ({ register, errors }: CourseFieldsProps) => (
  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
    <div>
      <label style={labelStyle}>Course Number</label>
      <input
        type="text"
        style={inputStyle}
        {...register('number', { required: 'Course number required' })}
      />
      {errors.number && <span className="text-red-500">{errors.number.message}</span>}
    </div>
    <div>
      <label style={labelStyle}>Title</label>
      <input
        type="text"
        style={inputStyle}
        {...register('title', { required: 'Title required' })}
      />
      {errors.title && <span className="text-red-500">{errors.title.message}</span>}
    </div>
    <div>
      <label style={labelStyle}>Term</label>
      <input
        type="text"
        style={inputStyle}
        {...register('term', { required: 'Term required' })}
      />
      {errors.term && <span className="text-red-500">{errors.term.message}</span>}
    </div>
    <div>
      <label style={labelStyle}>Meets</label>
      <input
        type="text"
        style={inputStyle}
        {...register('meets', { required: 'Meeting time required' })}
      />
      {errors.meets && <span className="text-red-500">{errors.meets.message}</span>}
    </div>
  </div>
);

export default CourseFields;