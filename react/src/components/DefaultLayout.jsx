import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

function DefaultLayout() {
    const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            Default Layout
            <Outlet />
        </div>
    );
}
export default DefaultLayout;
