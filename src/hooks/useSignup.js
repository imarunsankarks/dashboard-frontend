// import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    // const { dispatch } = useAuthContext();

    const signup = async (name, email, password, role) => {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:4000/api/employee/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        });

        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // localStorage.setItem("user", JSON.stringify(json));

            // dispatch({ type: "LOGIN", payload: json });

            setLoading(false);
        }
    };
    return { signup, loading, error };
};