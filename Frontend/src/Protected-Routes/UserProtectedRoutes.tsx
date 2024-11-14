import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/state/hooks";
import { selectUser } from "@/state/slices/userSlice";
import { jwtDecode } from "jwt-decode";

interface UserProtectedRoutesProps {
  children: React.ReactNode;
}

// const userInfo = localStorage.getItem("userInfo");
// const token = userInfo ? JSON.parse(userInfo).token : "";

const UserProtectedRoutes: React.FC<UserProtectedRoutesProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  console.log(pathName, "pathName");
  const { user } = useAppSelector(selectUser);
  // React.useEffect(() => {
  //   localStorage.setItem("pathName", pathName);
  // }, []);
  React.useEffect(() => {
    if (!user) {
      localStorage.setItem("pathName", pathName);
      navigate("/login");
    } else {
      try {
        // console.log("user", user);
        // console.log("token", user?.token);
        const decodedToken = jwtDecode(user?.token);
        console.log(decodedToken, "decodedToken");
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token", error);
        navigate("/login");
      }
    }
  }, [user]);
  return <div>{children}</div>;
};

export default UserProtectedRoutes;
