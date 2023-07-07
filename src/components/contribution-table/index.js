import { useEffect, useState } from 'react';
import { format, addMonths } from 'date-fns';
import { ru } from 'date-fns/locale';

import ContributionDay from '../contribution-day';
import './styles.css';

export default function ContributionTable({ list }) {
  const [selectedDay, setSelectedDay] = useState();
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const list = [];

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const currentDate = addMonths(new Date(), -monthIndex);
      list.push(format(currentDate, 'LLL', { locale: ru }));
    }

    setMonths(list.reverse());
  }, []);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  }

  return (
    <div className='contribution-table'>
      <div className='contribution-table-side'>
        <div className='contribution-table-text'>
          Пн
        </div>
        <div className='contribution-table-text'>
          Ср
        </div>
        <div className='contribution-table-text'>
          Пт
        </div>
      </div>

      <div className='contribution-table-container'>
        {months.length > 0 && (
          <div className='contribution-table-header'>
            {months.map(month => (
              <div key={month} className='contribution-table-text'>
                {month}
              </div>
            ))}
          </div>
        )}

        <div className='contribution-table-wrapper'>
          {list.map(({date, contributionCount}) => (
              <ContributionDay
                key={date}
                date={date}
                contributionCount={contributionCount}
                isSelected={selectedDay === date}
                onSelect={handleSelectDay}
              />
          ))}
        </div>

        <div className='contribution-table-legeng'>
          <span className='contribution-table-text contribution-table-small-text'>Меньше</span>
          <div className='contribution-table-legeng-items'>
            <ContributionDay contributionCount={0} isLegend tooltipText={'No contribution'} />
            <ContributionDay contributionCount={9} isLegend tooltipText={'1-9 contributions'} />
            <ContributionDay contributionCount={19} isLegend tooltipText={'10-19 contributions'} />
            <ContributionDay contributionCount={29} isLegend tooltipText={'20-29 contributions'} />
            <ContributionDay contributionCount={39} isLegend tooltipText={'30+ contributions'} />
          </div>
          <span className='contribution-table-text contribution-table-small-text'>Больше</span>
        </div>
      </div>
    </div>
  );
}