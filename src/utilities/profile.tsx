import { useAuthState, useDataQuery } from "./firebase";

const useProfile = () => {
  const {user} = useAuthState();
  const [isAdmin, isLoading, error] =  useDataQuery(`/Admins/${user?.uid || 'guest'}`);
  return [{ user, isAdmin }, isLoading, error];
};

export default useProfile;