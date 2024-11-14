import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { adminLogOutThunk } from "@/state/thunks/adminThunks";
import { selectAdmin } from "@/state/slices/adminSlice";
import { jwtDecode } from "jwt-decode";

interface AdminProtectedRoutesProps {
  children: React.ReactNode;
}

const AdminProtectedRoutes: React.FC<AdminProtectedRoutesProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login } = useAppSelector(selectAdmin);

  const adminInfo = localStorage.getItem("adminInfo");
  const token = adminInfo ? JSON.parse(adminInfo).token : "";

  React.useEffect(() => {
    if (!login) {
      navigate("/admin/login");
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          dispatch(adminLogOutThunk({}));
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Invalid token", error);
        dispatch(adminLogOutThunk({}));
        navigate("/admin/login");
      }
    }
  }, [login, token, navigate, dispatch]);

  return <div>{children}</div>;
};

export default AdminProtectedRoutes;
