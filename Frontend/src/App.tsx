import React, { lazy, Suspense, FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { socket } from "./state/store";

// Lazy-loaded components(auth)
const TopPage = lazy(() => import("./pages/process/TopPage"));
const News = lazy(() => import("./pages/components/News"));
const NewsDetail = lazy(() => import("./pages/components/NewsDetail"));
const UserGuide = lazy(() => import("./pages/components/UserGuide"));
const Contact = lazy(() => import("./pages/components/Contact"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const PassReset = lazy(() => import("./pages/auth/PassReset"));
const PassResetConfirm = lazy(() => import("./pages/auth/PassResetConfirm"));
const EmailSent = lazy(() => import("./pages/auth/EmailSent"));
const PassEmailSent = lazy(() => import("./pages/auth/PassEmail"));
const NewRegFormSucess = lazy(() => import("./pages/auth/NewRegFormSucess"));
const Terms = lazy(() => import("./pages/auth/Terms"));
const NewRegMember = lazy(() => import("./pages/auth/NewRegMember"));
const PassResetSuccess = lazy(() => import("./pages/auth/PassResetSuccess"));
const SearchResults = lazy(() => import("./pages/process/SearchResult"));

// Lazy-loaded dashboard components
const Dashboard = lazy(() => import("./pages/process/DashboardTopPage"));

// Lazy-loaded components(process)
const ProcessSidebar = lazy(() => import("./pages/process/ProcessSidebar"));
const ProcessDetail = lazy(() => import("./pages/process/ProcessDetails"));
const ProcessReg = lazy(() => import("./pages/process/ProcessReg"));
const BuyingOrderList = lazy(
  () => import("./pages/components/Orders/BuyingOrderList")
);
const SellingOrderList = lazy(
  () => import("./pages/components/Orders/SellingOrderList")
);
const ProcessList = lazy(() => import("./pages/process/ProcessList"));
const ProcessEdit = lazy(() => import("./pages/process/ProcessEdit"));
const MemberEdit = lazy(() => import("./pages/process/MemberEdit"));
const CompanyProfile = lazy(() => import("./pages/process/CompanyProfile"));
const AdvanceSearch = lazy(() => import("./pages/process/AdvanceSearch"));

//Static components
import Spinner from "./components/static/Spinner";
import UserProtectedRoutes from "./Protected-Routes/UserProtectedRoutes";
const Skeleton = lazy(() => import("./components/static/Skeleton"));
const Service = lazy(() => import("./components/static/Service"));
const Privacy = lazy(() => import("./components/static/Privacy"));
const About = lazy(() => import("./components/static/About"));
const Operating = lazy(() => import("./components/static/Operating"));

// Transactions
const Transactions = lazy(() => import("./pages/transactions/TransactionPage"));
const TransactionView = lazy(
  () => import("./pages/transactions/TransactionView")
);
const PaymentGateWay = lazy(
  () => import("./pages/transactions/components/PaymentGateWay")
);
const PaymentCompletedModal = lazy(
  () => import("./pages/transactions/components/PaymentCompletedModal")
);

//Admin Components
import AdminProtectedRoutes from "./Protected-Routes/AdminProtectedRoute";
import { useAppSelector } from "./state/hooks";
import { selectUser } from "./state/slices/userSlice";
const AdminSkeleton = lazy(() => import("./Admin/components/AdminSkeleton"));
const AdminSignIn = lazy(() => import("./Admin/pages/adminAuth/AdminSignIn"));
const AdminSidebar = lazy(() => import("./Admin/components/AdminSidebar"));
const CurrentPartnerStatus = lazy(
  () => import("./Admin/pages/adminDashboard/CurrentPartnerStatus")
);
const PartnerManagement = lazy(
  () => import("./Admin/pages/adminDashboard/PartnerManagement")
);
const CompanyInfoList = lazy(
  () => import("./Admin/pages/adminDashboard/CompanyInfoList")
);
const OrderManagement = lazy(
  () => import("./Admin/pages/adminDashboard/OrderManagement")
);
const ProcessManagement = lazy(
  () => import("./Admin/pages/adminDashboard/ProcessList")
);
const NotificationManagement = lazy(
  () => import("./Admin/pages/adminDashboard/NotificationManagement")
);
const MasterManagement = lazy(
  () => import("./Admin/pages/adminDashboard/MasterManagement")
);

const InquiryManagement = lazy(
  () => import("./Admin/pages/adminDashboard/InquiryManagement")
);

// Admin Detail pages
const OrderManagementDetail = lazy(
  () => import("./Admin/pages/detailpages/OrderManagementDetail")
);
const NotificationManagementDetail = lazy(
  () => import("./Admin/pages/detailpages/NotifiacationManagementDetail")
);
const ProcessRegistrationDetailDetail = lazy(
  () => import("./Admin/pages/detailpages/ProcessRegistrationDetail")
);
const MemberRegistrationDetail = lazy(
  () => import("./Admin/pages/detailpages/MemberRegistrationDetail")
);
const NewsCreate = lazy(() => import("./Admin/pages/detailpages/NewsCreate"));
const AdminProcessReg = lazy(
  () => import("./Admin/pages/detailpages/AdminProcessReg")
);
const AdminMemberReg = lazy(
  () => import("./Admin/pages/detailpages/AdminMemberReg")
);

//typing the HOC
type HigherOrderComponent = (
  Component: FunctionComponent,
  props?: any
) => JSX.Element;

//Refactoring the code to use a HOC
const withSuspense: HigherOrderComponent = (Component, props) => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);

function App() {
  const [auth, setAuth] = React.useState(false);
  const { user } = useAppSelector(selectUser);

  React.useEffect(() => {
    if (user && user.token) {
      socket.connect();
    }

    return () => {
      socket.disconnect;
    };
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route element={withSuspense(Skeleton, { auth })}>
          <Route path="/" element={withSuspense(TopPage)} />
          <Route path="/notation" element={withSuspense(Operating)} />
          <Route path="/service" element={withSuspense(Service)} />
          <Route path="/privacy-policy" element={withSuspense(Privacy)} />
          <Route path="/news" element={withSuspense(News)} />
          <Route path="/news-detail/:id" element={withSuspense(NewsDetail)} />
          <Route path="/user-guide" element={withSuspense(UserGuide)} />
          <Route path="/contact" element={withSuspense(Contact)} />
          <Route path="/about" element={withSuspense(About)} />
          <Route path="/login" element={withSuspense(SignIn, { setAuth })} />
          <Route path="/password-reset" element={withSuspense(PassReset)} />
          <Route
            path="/reset-confirmation"
            element={withSuspense(PassResetConfirm)}
          />
          <Route
            path="/reset-success"
            element={withSuspense(PassResetSuccess)}
          />
          <Route path="/confirmation-email" element={withSuspense(EmailSent)} />
          <Route path="/reset-email" element={withSuspense(PassEmailSent)} />
          <Route
            path="/verify-email"
            element={withSuspense(NewRegFormSucess)}
          />
          <Route path="/terms" element={withSuspense(Terms)} />
          <Route
            path="/member-register"
            element={withSuspense(NewRegMember, { setAuth })}
          />

          {/* transaction  */}
          <Route
            path="/transaction/:id"
            element={
              <UserProtectedRoutes>
                {withSuspense(Transactions)}
              </UserProtectedRoutes>
            }
          />
          <Route
            path="/transaction/:id/payment"
            element={
              <UserProtectedRoutes>
                {withSuspense(PaymentGateWay)}
              </UserProtectedRoutes>
            }
          />

          <Route
            path="/transaction/:id/payment-completed"
            element={
              <UserProtectedRoutes>
                {withSuspense(PaymentCompletedModal)}
              </UserProtectedRoutes>
            }
          />

          {/* transaction end */}
          <Route
            path="dashboard/*"
            element={
              <UserProtectedRoutes>
                {withSuspense(ProcessSidebar)}
              </UserProtectedRoutes>
            }
          >
            <Route path="my-page" element={withSuspense(Dashboard)} />
            <Route
              path="purchase-list"
              element={withSuspense(BuyingOrderList)}
            />
            <Route path="order-list" element={withSuspense(SellingOrderList)} />
            <Route path="process-list/*">
              <Route index element={withSuspense(ProcessList)} />
              <Route
                path="edit/:processId"
                element={withSuspense(ProcessEdit)}
              />
              <Route path="registration" element={withSuspense(ProcessReg)} />
            </Route>
            <Route path="edit-member" element={withSuspense(MemberEdit)} />
          </Route>
          <Route path="/process/*">
            <Route
              path="search-results"
              element={withSuspense(SearchResults)}
            />
            <Route
              path="advance-search"
              element={withSuspense(AdvanceSearch)}
            />
            <Route
              path="company-profile/:uid"
              element={withSuspense(CompanyProfile)}
            />
            <Route
              path="details/:processId"
              element={withSuspense(ProcessDetail)}
            />
          </Route>
        </Route>

        {/* admin routes */}
        <Route element={withSuspense(AdminSkeleton)}>
          <Route path="/admin/login" element={withSuspense(AdminSignIn)} />
          <Route
            path="admin/dashboard/*"
            element={
              <AdminProtectedRoutes>
                {" "}
                <AdminSidebar />
              </AdminProtectedRoutes>
            }
          >
            <Route
              path="transaction-view/:id"
              element={
                <AdminProtectedRoutes>
                  {withSuspense(TransactionView)}
                </AdminProtectedRoutes>
              }
            />
            <Route index element={withSuspense(CurrentPartnerStatus)} />
            <Route
              path="partner-management"
              element={withSuspense(PartnerManagement)}
            />
            <Route
              path="company-information"
              element={withSuspense(CompanyInfoList)}
            />
            <Route
              path="order-management"
              element={withSuspense(OrderManagement)}
            />
            <Route
              path="process-management"
              element={withSuspense(ProcessManagement)}
            />
            <Route
              path="notification-management"
              element={withSuspense(NotificationManagement)}
            />
            <Route
              path="master-management"
              element={withSuspense(MasterManagement)}
            />

            <Route
              path="inquiry-management"
              element={withSuspense(InquiryManagement)}
            />
            <Route
              path="order-management-detail/:id"
              element={withSuspense(OrderManagementDetail)}
            />
            <Route
              path="notification-management-detail/:id"
              element={withSuspense(NotificationManagementDetail)}
            />
            <Route
              path="notification-management-create"
              element={withSuspense(NewsCreate)}
            />
            <Route
              path="process-management-detail/:processId"
              element={withSuspense(ProcessRegistrationDetailDetail)}
            />
            <Route
              path="company-information-detail/:uid"
              element={withSuspense(MemberRegistrationDetail, { setAuth })}
            />
            <Route
              path="process-registration"
              element={withSuspense(AdminProcessReg, { setAuth })}
            />
            <Route
              path="member-registration"
              element={withSuspense(AdminMemberReg, { setAuth })}
            />
          </Route>
        </Route>
        {/* admin routes ends */}
      </Routes>
    </Router>
  );
}

export default App;
