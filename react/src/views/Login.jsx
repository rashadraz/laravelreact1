import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors , setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
          
            email: emailRef.current.value,
            password: passwordRef.current.value,
           
        };
        setErrors(null);

        axiosClient.post("/login", payload).then(({ data }) => {
            setToken(data.token);
            setUser(data.user);
        })
        .catch(err => {
            console.log(err);
            const response = err.response;
            if(response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors)
                }
                else{
                    setErrors({
                        email: [response.data.message],
                    })
                }

            }
        })
        console.log(payload);
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                <h1 className="title">Login Into Your Account</h1>
                {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>}
                    <input ref={emailRef} type={"email"} placeholder="Email" />
                    <input ref={passwordRef} type={"password"} placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/signup">Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default Login;
