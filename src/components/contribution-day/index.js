import cn from 'classnames';
import { Tooltip } from 'react-tooltip';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import './styles.css';

const LVL1_COUNT = { min: 1, max: 9 };
const LVL2_COUNT = { min: 10, max: 19 };
const LVL3_COUNT = { min: 20, max: 29 };
const LVL4_COUNT = { min: 30 };

export default function ContributionDay({
  contributionCount,
  date,
  isLegend,
  tooltipText,
  isSelected,
  onSelect,
}) {
  const className = cn('contribution-day', {
    'contribution-day-selected': isSelected,
    'contribution-day-lvl1': contributionCount >= LVL1_COUNT.min && contributionCount <= LVL1_COUNT.max,
    'contribution-day-lvl2': contributionCount >= LVL2_COUNT.min && contributionCount <= LVL2_COUNT.max,
    'contribution-day-lvl3': contributionCount >= LVL3_COUNT.min && contributionCount <= LVL3_COUNT.max,
    'contribution-day-lvl4': contributionCount >= LVL4_COUNT.min,
  });

  const handleSelect = () => {
    if (isLegend) {
      return;
    }

    onSelect(date);
  }

  return (
    <>
      <div
        data-tooltip-id={date}
        className={className}
        onClick={handleSelect}
      />

      <Tooltip
        id={date}
        isOpen={isSelected}
        opacity={1}
      >
        <div>
          <h3 className='tooltip-title'>{tooltipText ?? contributionCount + ' contributions'}</h3>
          {!isLegend && (<p className='tooltip-description'>{format(new Date(date), 'PPPP', { locale: ru })}</p>)}
        </div>
      </Tooltip>
    </>

  );
}