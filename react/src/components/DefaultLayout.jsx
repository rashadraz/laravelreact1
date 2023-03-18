import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

function DefaultLayout() {
    const { user, token, setUser , setToken } = useStateContext();
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
                console.log(data);
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
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main></main>
            </div>
        </div>
    );
}
export default DefaultLayout;
