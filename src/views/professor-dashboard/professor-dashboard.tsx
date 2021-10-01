import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Scaffold, ActivitiesTable } from '../../components';
import { useStoreState } from '../../hooks';
import { ActivityService } from '../../services';
import { Activity } from '../../services/activity-service';

const ProfessorDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const loggedUser = useStoreState((state) => state.loggedUser);

  const getActivities = async () => {
    setIsLoading(true);
    try {
      let activities = [];
      activities = await ActivityService.getActivities(loggedUser?.token as string);

      setActivityList(activities);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getActivities();
  }, [loggedUser]);

  return (
    <Scaffold
      loading={isLoading}
      onSearch={(query: string) => query}
    >
      <ActivitiesTable activities={activityList} type="professor" />
    </Scaffold>
  );
};

export default ProfessorDashboard;
