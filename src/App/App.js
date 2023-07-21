import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GeneralProvider } from "../context";
import { SinglePage } from "../pages/SinglePage";

function App() {
    return (
        <BrowserRouter>
            <GeneralProvider>
                <Routes>
                    <Route path="/" element={<SinglePage />} />
                </Routes>
            </GeneralProvider>
        </BrowserRouter>
    );
}
export { App };