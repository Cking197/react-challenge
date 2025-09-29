//components
import Banner from './components/Banner';
import CourseCardGrid from './components/CourseCardGrid';
import TermSelector from './components/TermSelector';

//types
import type Schedule from './types/Schedule';

//utils
import { useJsonQuery } from './utilities/makeFetch';

//react
import { useState } from 'react';

const App = () => {
  //states
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [selectedTerm, setSelectedTerm] = useState<string>('Fall'); //default term will be fall

  //Handling during fetch
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;


  //parse schdedule, fetch courses, and terms
  const schedule = json as Schedule;
  const courses = schedule.courses;

  //filter courses by selected term
  const termCourses = selectedTerm === ''
    ? courses
    : Object.fromEntries(
        Object.entries(courses).filter(([_, course]) => course.term && course.term.includes(selectedTerm))
      );

  return (
    <>
      <Banner title={schedule.title} />
      <TermSelector
        name="TermSelector"
        options={"Fall,Winter,Spring".split(",")}
        selected={selectedTerm}
        setSelected={setSelectedTerm}
      />

      <CourseCardGrid courses={termCourses} />
    </>
  )
}
export default App;