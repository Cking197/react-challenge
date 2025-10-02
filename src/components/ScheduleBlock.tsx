import React from 'react';
import type Course from '../types/Course';

interface ScheduleBlockProps {
  course: Course;
  borderColor?: string;
}

const ScheduleBlock: React.FC<ScheduleBlockProps> = ({ course, borderColor = 'black' }) => (
  <div
    style={{
      border: `2px solid ${borderColor}`,
      borderRadius: '8px',
      padding: '8px 12px',
      margin: '4px',
      background: '#fff',
      minWidth: '180px'
    }}
  >
    <div><strong>{course.title}</strong></div>
    <div>{course.term} ({course.number})</div>
    <div>{course.meets}</div>
  </div>
);

export default ScheduleBlock;