import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const RootRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat/:id" element={<Home />} />
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </>
    );
};

export default RootRoutes;
