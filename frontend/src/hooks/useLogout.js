import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  function logout() {
    //remove from localstorage
    localStorage.removeItem("user");

    //Set user to null in useAuthContext
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  }

  return { logout };
}

export { useLogout };
