import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { signup, loading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(userid, password);
        await signup(name, email, password, role);
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
    };
    return (
        <div className="add">
            <form className="signup" onSubmit={handleSubmit}>
                <h3 className="sub-head">Add new member</h3>
                <div className="each-field">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="each-field">
                    <label>
                        E-mail
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                </div>
                <div className="each-field">
                    <label>
                        Password
                    </label>
                    <input type="text" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>
                <div className="each-field">
                    <label>Role</label>
                    <input type="text" placeholder="Role" onChange={(e) => {
                        setRole(e.target.value);
                    }} />
                </div>
                <div className="add-btn">
                    <button disabled={loading}>Add member</button>

                </div>
                {error && <div className="error">{error}</div>}
            </form>

        </div>
    );
};

export default Signup;