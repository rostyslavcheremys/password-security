import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Layout } from "./pages/Layout/Layout.jsx";
import { PasswordForm } from "./pages/PasswordForm/PasswordForm.jsx";
import { CaesarCipher } from "./pages/CaesarCipher/CaesarCipher.jsx";

import { getTheme } from "./theme/theme.js";

import "./App.css";

export const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const theme = getTheme(darkMode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}>
                        <Route path="/" element={<PasswordForm />} />
                        <Route path="caesar-cipher" element={<CaesarCipher />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}