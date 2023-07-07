import ContributionTable from './components/contribution-table';
import useContribution from './hooks/useContribution';

export default function App() {
  const { list, loading }= useContribution();

  return (
    <div className='app-container'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ContributionTable list={list} />
      )}
    </div>
  );
};
