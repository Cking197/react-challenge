//components
import Banner from './components/Banner';
import CourseCardGrid from './components/CourseCardGrid';
import TermSelector from './components/TermSelector';
import ScheduleModal from './components/ScheduleModal';

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
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  //course selection 
  const selectCourse = (id: string) => {
    setSelectedCourses(selectedCourses =>
      selectedCourses.includes(id)
        ? selectedCourses.filter(cid => cid !== id)
        : [...selectedCourses, id]
    );
  };

  return (
    <>
      <Banner title={schedule.title} />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '20px 0'
      }}>
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <TermSelector
            name="TermSelector"
            options={"Fall,Winter,Spring".split(",")}
            selected={selectedTerm}
            setSelected={setSelectedTerm}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="m-4 p-2 border rounded bg-blue-500 text-white"
            onClick={() => setShowModal(true)}>
            View Selected Courses
          </button>
        </div>
      </div>

      <ScheduleModal
        courses={Object.fromEntries(selectedCourses.map(id => [id, courses[id]]))}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <CourseCardGrid
        courses={termCourses}
        selectedCourses={selectedCourses}
        selectCourse={selectCourse}
      />
    </>
  )
}
export default App;