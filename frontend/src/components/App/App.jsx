import "./App.css";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Search from "../Search/Search";
import StockData from "../StockData/StockData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";
import { useState, useEffect, createContext } from "react";
import Error from "../Error/Error";
import Ranking from "../Ranking/Ranking";
import Profile from "../Profile/Profile";
import Loading from "../Loading/Loading";

export const UserContext = createContext();

export default function App() {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const requireAuth = (element) => {
        return user != null ? element : <LoginForm />;
    };

    return (
        <div className="app">
            <UserContext.Provider value={{ user, setUser, setErrorMessage, loading, setLoading }}>
                <BrowserRouter>
                    <Error errorMessage={errorMessage} />
                    {user != null ? <Navigation /> : null}
                    <Loading />
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignUpForm />} />

                        <Route path="/" element={requireAuth(<Home />)} />
                        <Route path="/home" element={requireAuth(<Home />)} />
                        <Route path="/search" element={requireAuth(<Search />)} />
                        <Route path="/ranking" element={requireAuth(<Ranking />)} />
                        <Route path="/search/stocks/:ticker" element={requireAuth(<StockData />)} />
                        <Route path="/profile" element={requireAuth(<Profile />)} />
                        <Route path="/profile/:username" element={requireAuth(<Profile />)} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    );
}
