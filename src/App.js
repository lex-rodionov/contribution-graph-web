import useContribution from './hooks/useContribution';



export default function App() {
  const { list, loading }= useContribution();

  return (
    <div className='app-container'>
      {loading && <p>Loading...</p>}

      Hello World!

      {list.map(({date, contributionCount}) => (
        <div key={date}>
          <span>{date} - </span>
          <span>{contributionCount}</span>
        </div>
      ))}
    </div>
  );
};
