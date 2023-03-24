import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";

function DefaultLayout() {
    const { user, token, setUser , setToken , notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    const onLogout = (event) => {
        event.preventDefault();
        axiosClient.post('/logout')
            .then(()=> {
                setUser({})
                setToken(null)
            })
    };

    useEffect(()=>{
        axiosClient.get('/user')
            .then(({data})=> {
                // console.log(data);
                setUser(data);
            })
    },[])
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
            {notification &&
            <div className="notification">{notification}</div>}
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
export default DefaultLayout;
