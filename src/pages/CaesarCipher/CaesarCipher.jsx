import { useState } from "react";

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

import { Buttons } from "../../components/Buttons/Buttons.jsx";
import { AlphabetVisualizer } from "../../components/AlphabetVisualizer/AlphabetVisualizer.jsx";

import { ALPHABETS } from "/src/constants/alphabets.js";

import "./CaesarCipher.css";

export const CaesarCipher = () => {
    const [alphabetType, setAlphabetType] = useState("UKRAINIAN");
    const [alphabet, setAlphabet] = useState(ALPHABETS.UKRAINIAN);
    const [text, setText] = useState("");
    const [shift, setShift] = useState(3);
    const [result, setResult] = useState("");
    const [mode, setMode] = useState("encrypt");
    const [stepMode, setStepMode] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeAlphabetIndex, setActiveAlphabetIndex] = useState(null);
    const [resultAlphabetIndex, setResultAlphabetIndex] = useState(null);

    const handleCipher = () => {
        if (isAnimating) return;

        const isEncrypt = mode === "encrypt";
        const chars = text.toLowerCase().split("");
        let resultArr = [];

        setResult("");

        if (stepMode) {
            setIsAnimating(true);

            chars.forEach((ch, i) => {
                setTimeout(() => {
                    const idx = alphabet.indexOf(ch);
                    setActiveAlphabetIndex(idx);

                    if (idx === -1) {
                        resultArr[i] = ch;
                        setActiveAlphabetIndex(null);
                        setResultAlphabetIndex(null);
                    } else {
                        const shiftAmount = isEncrypt ? shift : -shift;
                        const newIndex = (idx + shiftAmount + alphabet.length) % alphabet.length;
                        setActiveAlphabetIndex(idx);
                        setResultAlphabetIndex(newIndex);
                        resultArr[i] = alphabet[newIndex];
                    }

                    setResult(resultArr.join(""));

                    if (i === chars.length - 1) {
                        setTimeout(() => {
                            setActiveAlphabetIndex(null);
                            setResultAlphabetIndex(null);
                            setIsAnimating(false);
                        }, 1000);
                    }
                }, i * 1000);
            });
        } else {
            const resultText = chars
                .map((ch) => {
                    const idx = alphabet.indexOf(ch);
                    if (idx === -1) return ch;
                    const shiftAmount = isEncrypt ? shift : -shift;
                    const newIndex = (idx + shiftAmount + alphabet.length) % alphabet.length;
                    return alphabet[newIndex];
                })
                .join("");
            setResult(resultText);
            setActiveAlphabetIndex(null);
            setResultAlphabetIndex(null);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => setText(event.target.result);
        reader.readAsText(file);
    };

    const toggleMode = () => {
        setMode((prev) => (prev === "encrypt" ? "decrypt" : "encrypt"));
        setResult("");
        setText("");
    };

    const handleAlphabetChange = (e) => {
        const type = e.target.value;
        setAlphabetType(type);
        setAlphabet(ALPHABETS[type]);
        setShift(3);
    };

    const handleShiftChange = (e) => {
        const value = Number(e.target.value);
        const maxShift = alphabet.length - 1;

        if (value > maxShift) setShift(maxShift);
        else if (value < -maxShift) setShift(-maxShift);
        else setShift(value);
    };

    return (
        <div className="caesar-cipher">
            <div className="caesar-cipher__container">
                <div className="caesar-cipher__fields">
                    <FormControl className="caesar-cipher__field">
                        <InputLabel>Alphabet Selection</InputLabel>
                        <Select
                            value={alphabetType}
                            label="Alphabet Selection"
                            onChange={handleAlphabetChange}
                        >
                            <MenuItem value="LATIN">Latin (A–Z)</MenuItem>
                            <MenuItem value="UKRAINIAN">Ukrainian (А–Я)</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        className="caesar-cipher__field"
                        label="Shift"
                        type="number"
                        value={shift}
                        onChange={handleShiftChange}
                        slotProps={{
                            input: {
                                min: -alphabet.length,
                                max: alphabet.length,
                            },
                        }}
                    />
                </div>

                <div className="caesar-cipher__alphabet">
                    <TextField
                        className="caesar-cipher__field"
                        label="Alphabet"
                        value={alphabet}
                        onChange={(e) => setAlphabet(e.target.value)}
                    />

                    <Button
                        className="caesar-cipher__button-alphabet-visualizer"
                        variant="outlined"
                        color={stepMode ? "error" : "inherit"}
                        startIcon={stepMode ? <PlayArrow /> : <Pause />}
                        onClick={() => setStepMode(!stepMode)}
                    >
                        {stepMode ? "Step" : "Step"}
                    </Button>
                </div>

                <AlphabetVisualizer
                    alphabet={alphabet}
                    activeAlphabetIndex={activeAlphabetIndex}
                    resultAlphabetIndex={resultAlphabetIndex}
                />

                <TextField
                    className="caesar-cipher__field"
                    label={mode === "encrypt" ? "Enter text to encrypt" : "Enter text to decrypt"}
                    multiline
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <Buttons
                    mode={mode}
                    toggleMode={toggleMode}
                    handleCipher={handleCipher}
                    handleFileUpload={handleFileUpload}
                />

                <TextField
                    className="caesar-cipher__field"
                    label={mode === "encrypt" ? "Encrypted Result" : "Decrypted Result"}
                    multiline
                    rows={4}
                    value={result}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
            </div>
        </div>
    );
}