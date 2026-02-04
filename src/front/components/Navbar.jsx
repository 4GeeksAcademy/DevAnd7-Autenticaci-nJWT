import { Link } from "react-router-dom";

export const Navbar = () => {
    const token = sessionStorage.getItem("token");

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>

                <div className="ml-auto">

                    {!token && (
                        <>
                            <Link to="/login">
                                <button className="btn btn-success me-2">Login</button>
                            </Link>

                            <Link to="/signup">
                                <button className="btn btn-primary">Signup</button>
                            </Link>
                        </>
                    )}

                    {token && (
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                sessionStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};