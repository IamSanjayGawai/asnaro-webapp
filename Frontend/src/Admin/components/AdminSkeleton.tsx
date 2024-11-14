import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

interface SkeletonProps {
  auth: boolean;
}

const Skeleton: React.FC<SkeletonProps> = () => {
  return (
    <>
      <Navbar />
      <div className="mt-10">
        <Outlet />
      </div>
    </>
  );
};

export default Skeleton;
