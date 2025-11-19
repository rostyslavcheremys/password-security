import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TextField, LinearProgress, Button } from "@mui/material";

import { ResetTimer } from "../../components/ResetTimer/ResetTimer.jsx";
import { DialogMessage } from "../../components/DialogMessage/DialogMessage.jsx";

import { calculateStrength, getStrengthLabel } from "../../utils/password";

import "./PasswordForm.css";

export const PasswordForm = () => {
    const [strength, setStrength] = useState(0);
    const [attempts, setAttempts] = useState(0);

    const [lockState, setLockState] = useState({
        showLock: false,
        progress: 0,
        secondsLeft: 60,
    });

    const [dialog, setDialog] = useState({
        show: false,
        text: "",
    });

    const maxAttempts = 3;
    const navigate = useNavigate();
    const { register, watch, setValue, formState: { errors } } = useForm({ mode: "onChange" });

    const password = watch("password", "");
    const labelInfo = getStrengthLabel(strength);
    const correctPassword = import.meta.env.VITE_APP_PASSWORD;

    useEffect(() => {
        const lockUntil = Number(localStorage.getItem("lockUntil"));

        if (lockUntil && lockUntil > Date.now()) {
            const secondsLeft = Math.ceil((lockUntil - Date.now()) / 1000);

            setLockState({
                showLock: true,
                progress: (1 - secondsLeft / 60) * 100,
                secondsLeft,
            });
        }
    }, []);

    const handleEnter = () => {
        if (password === correctPassword) return navigate("caesar-cipher");

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= maxAttempts) {
            localStorage.setItem("lockUntil", Date.now() + 60000);
            setLockState({ showLock: true, progress: 0, secondsLeft: 60 });
        } else {
            setDialog({
                show: true,
                text: `Incorrect password! Attempt ${newAttempts} of ${maxAttempts}`,
            });
        }
    };

    useEffect(() => {
        const clean = password.trim();
        if (clean !== password) setValue("password", clean, { shouldValidate: true });
        setStrength(calculateStrength(clean));
    }, [password, setValue]);

    useEffect(() => {
        if (!lockState.showLock) return;

        const timer = setInterval(() => {
            setLockState(prev => {
                if (prev.secondsLeft <= 1) {
                    clearInterval(timer);
                    setAttempts(0);
                    localStorage.removeItem("lockUntil");

                    return { showLock: false, progress: 0, secondsLeft: 60 };
                }

                const nextSeconds = prev.secondsLeft - 1;
                return {
                    ...prev,
                    secondsLeft: nextSeconds,
                    progress: (1 - nextSeconds / 60) * 100,
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [lockState.showLock]);

    return (
        <div className="password-form">
            {lockState.showLock ? (
                <div className="lock-screen">
                    <ResetTimer progress={lockState.progress} seconds={lockState.secondsLeft} />
                </div>
            ) : (
                <div className="password-form__container">
                    <label className="password-form__label">Enter password:</label>

                    <TextField
                        type="text"
                        variant="outlined"
                        slotProps={{
                            input: { className: "password-form__input-text" },
                            formHelperText: { className: "password-form__helper-text" },
                        }}
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Minimum 8 characters" },
                            validate: {
                                hasUpper: v => /[A-Z]/.test(v) || "Must contain an uppercase letter",
                                hasLower: v => /[a-z]/.test(v) || "Must contain a lowercase letter",
                                hasNumber: v => /[0-9]/.test(v) || "Must contain a number",
                                hasSymbol: v => /[^A-Za-z0-9]/.test(v) || "Must contain a special character",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    {password && (
                        <div className="password-form__strength">
                            <LinearProgress
                                className="password-form__progress"
                                variant="determinate"
                                value={(strength / 5) * 100}
                                color={labelInfo.color}
                            />
                            <label
                                className={`password-form__progress-label password-form__progress-label--${labelInfo.color}`}
                            >
                                {labelInfo.text}
                            </label>
                        </div>
                    )}

                    <div className="password-form__button-container">
                        <Button
                            className="password-form__button"
                            variant="outlined"
                            onClick={handleEnter}
                        >
                            Enter
                        </Button>
                    </div>

                    <DialogMessage
                        open={dialog.show}
                        title="Error"
                        text={dialog.text}
                        onClose={() => setDialog(prev => ({ ...prev, show: false }))}
                    />
                </div>
            )}
        </div>
    );
};