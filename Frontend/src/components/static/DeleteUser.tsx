import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { deleteUserThunk } from "@/state/thunks/userThunks";
import { selectUser } from "@/state/slices/userSlice";
import { useEffect } from "react";

const DeleteUser = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  useEffect(() => {
    async function deleteCustomer() {
      await dispatch(deleteUserThunk({}));
    }
    deleteCustomer();
  }, [user, dispatch]);
  return (
    <div className="flex justify-center items-center h-[100vh] text-primary">
      {user?.message}
    </div>
  );
};

export default DeleteUser;
