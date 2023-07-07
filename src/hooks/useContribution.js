import { useState, useEffect } from 'react';
import { addDays, endOfWeek, format } from 'date-fns';

import {getContributionList} from '../utils/api';

const DAY_COUNT = 357;

export default function useContribution() {
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
      
        const contributionList = await getContributionList();
    
        const today = new Date();
        const endDate = endOfWeek(today, { weekStartsOn: 1 });
        const startDate = addDays(endDate, -DAY_COUNT + 1);
        const currentDate = new Date(startDate);
    
        const allDays = [];
    
        while(currentDate <= endDate) {
          const formattedDate = format(new Date(currentDate), 'yyyy-MM-dd');
          const contributionCount = contributionList[formattedDate] ?? 0;
          allDays.push({date: formattedDate, contributionCount});
    
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        setDays(allDays);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { list: days, loading };
}