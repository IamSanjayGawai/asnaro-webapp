import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface SkeletonProps {
  auth: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ auth }) => {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="md:fixed md:top-0 md:w-full md:z-20 md:bg-white">
          <Header auth={auth} />
        </div>

        <div className="md:mt-[160px] flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Skeleton;
