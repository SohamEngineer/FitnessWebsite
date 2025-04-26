import "./App.css";
import { useEffect } from "react";
import Aos from "aos";
import Footer from "./UI/Footer";
import Header from "./component/Header";
import AllRoutes from "./component/AllRoutes";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRouter from "./ADMIN/AdminRouter";

function AppWrapper() {
  const { authUser } = useAuth();
  const user = authUser || JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  return (
    <>
      {isAdmin ? (
        <AdminRouter/>
      ) : (
        <>
          <Header />
          <AllRoutes />
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    // <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    // </Router>
  );
}

export default App;
