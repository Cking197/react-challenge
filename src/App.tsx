const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => {
  const today = new Date();
  const day = today.toLocaleString([], {weekday: 'long'});
  const date = today.toLocaleDateString([], {dateStyle: 'long'})

  return (
    <>
      <h1>{schedule.title}</h1>
      
      <p>This page was last loaded on {day}, {date}.</p>
    </>
  );
};

export default App;