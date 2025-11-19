import { GitHub } from "@mui/icons-material";

import "./Footer.css";

export const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer__wrapper">
                <a className="footer__github"
                   href="https://github.com/rostyslavcheremys/caesar-cipher"
                >
                    <GitHub className="footer__github-icon"/> GitHub
                </a>

                <p className="footer__developer">&copy; 2025 Rostyslav Cheremys</p>
            </div>
        </footer>
    );
}