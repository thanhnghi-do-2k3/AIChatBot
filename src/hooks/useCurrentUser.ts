import authService from 'features/auth/api';
import {useEffect, useState} from 'react';
import useAppSelector from './useAppSelector';

const useCurrentUser = () => {
  const currentUser = useAppSelector(state => state.authReducer.user);
  const [usage, setUsage] = useState<any>({});

  const fetchUsageData = async () => {
    const response = await authService.getUsage();

    setUsage(response);
  };

  useEffect(() => {
    fetchUsageData();
  }, []);

  return {currentUser, fetchUsageData, usage};
};

export default useCurrentUser;
