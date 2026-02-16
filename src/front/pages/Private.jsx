import React, { useEffect, useState } from "react";

export const Private = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
        return;
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(resp => {
            if (!resp.ok) throw new Error("Unauthorized");
            return resp.json();
        })
        .then(data => setUser(data.user))
        .catch(() => window.location.href = "/login");
}, []);

    return (
        <div className="container mt-5">
            <h1>Área privada</h1>
            {user && <p>Bienvenido, {user.email}</p>}
        </div>
    );
};