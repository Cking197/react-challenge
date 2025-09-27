//components
import Banner from './components/Banner';
import CourseCardGrid from './components/CourseCardGrid';
// import CourseList from './components/CourseList';

//utils
import { useJsonQuery } from './utilities/makeFetch';
import type Schedule from './components/Schedule';

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;


  const schedule = json as Schedule;

  return (
    <>
      <Banner title={schedule.title} />

      <CourseCardGrid courses={schedule.courses} />
    </>
  )
}
export default App;