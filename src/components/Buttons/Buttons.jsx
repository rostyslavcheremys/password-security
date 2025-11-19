import { Button } from "@mui/material";
import { Lock, LockOpen, SwapHoriz, UploadFile } from "@mui/icons-material";

import "./Buttons.css";

export const Buttons = ({ mode, toggleMode, handleCipher, handleFileUpload }) => {
    const isEncrypt = mode === "encrypt";

    return (
        <div className={"buttons"}>
            <Button
                className={"buttons__item"}
                variant="outlined"
                startIcon={<UploadFile/>}
                component="label"
            >
                Upload
                <input hidden accept=".txt" type="file" onChange={handleFileUpload}/>
            </Button>

            <Button
                className={"buttons__item"}
                variant="contained"
                color={isEncrypt ? "primary" : "error"}
                startIcon={isEncrypt ? <Lock/> : <LockOpen/>}
                onClick={handleCipher}
            >
                {isEncrypt ? "Encrypt" : "Decrypt"}
            </Button>

            <Button
                className={"buttons__item"}
                variant="outlined"
                color="inherit"
                startIcon={<SwapHoriz/>}
                onClick={toggleMode}
            >
                Mode
            </Button>
        </div>
    );
}