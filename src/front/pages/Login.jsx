import React, { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (resp.ok) {
            const data = await resp.json();
            sessionStorage.setItem("token", data.token);
            window.location.href = "/private";
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-success">Entrar</button>
            </form>
        </div>
    );
};