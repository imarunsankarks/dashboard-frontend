import { useState } from "react";
import { useLogin } from "../hooks/useLogin";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };
    return (
        <div className="login-box">
            <form className="login" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <label>
                    Username
                </label>
                <input
                    type="email"
                    placeholder="Username"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }} value={email}
                />
                <label>
                    Password
                </label>
                <input type="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value);
                }} value={password} />
                <button disabled={loading}>Login</button>
                {error && <div className="error">{error}</div>}
            </form>

        </div>
    );
};

export default Login;