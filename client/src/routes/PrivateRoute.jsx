import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    if ("_haiderLogin" in localStorage) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
