import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Transfer from "./pages/Transfer";
import Beneficiaries from "./pages/Beneficiaries";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

function ApplicationLayout() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return <Login />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc"
      }}
    >
      <Navbar />

      <Header />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 144px)"
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "28px",
            minWidth: 0
          }}
        >
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/accounts"
                element={<Accounts />}
              />

              <Route
                path="/transactions"
                element={<Transactions />}
              />

              <Route
                path="/transfer"
                element={<Transfer />}
              />

              <Route
                path="/beneficiaries"
                element={<Beneficiaries />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              <Route
                path="/security"
                element={<Security />}
              />

              <Route
                path="/notifications"
                element={<Notifications />}
              />

              <Route
                path="/"
                element={
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                }
              />
            </Route>

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ApplicationLayout />
    </BrowserRouter>
  );
}

export default App;