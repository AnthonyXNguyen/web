'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export function LeaderboardHeader() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserCount() {
      const supabase = createClient();

      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching user count:', error);
        setUserCount(null);
      } else {
        setUserCount(count);
      }
      setLoading(false);
    }
    fetchUserCount();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon className="text-xl text-primary" icon={faChartLine} />
            <h1 className="text-xl font-semibold">Leaderboard</h1>
          </div>
          <div className="ml-2 text-lg text-gray-400">
            {loading ? (
              'Loading...'
            ) : userCount !== null ? (
              <b>Across {userCount.toLocaleString()} profiles</b>
            ) : (
              'Error'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
