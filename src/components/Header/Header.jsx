import { Switch } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import "./Header.css"

export const Header = ({ darkMode, setDarkMode }) => {
    const handleToggle = () => setDarkMode(!darkMode);

    return (
        <header className={"header"}>
            <h1 className={"header__label"}> Caesar Cipher</h1>

            <div className={"header__switch"}>
                {darkMode ? <DarkMode/> : <LightMode/>}

                <Switch
                    checked={darkMode}
                    onChange={handleToggle}
                />
            </div>
        </header>
    );
}