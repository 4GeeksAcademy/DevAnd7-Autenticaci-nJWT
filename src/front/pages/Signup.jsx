import React, { useState } from "react";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (resp.ok) {
            alert("Usuario creado. Ahora inicia sesión.");
            window.location.href = "/login";
        } else {
            alert("Error al crear usuario");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Registro</h1>
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

                <button className="btn btn-primary">Crear cuenta</button>
            </form>
        </div>
    );
};