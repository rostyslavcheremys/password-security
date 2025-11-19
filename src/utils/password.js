export const calculateStrength = (pwd) => {
    let score = 0;

    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    return score;
};

export const getStrengthLabel = (strength) => {
    if (strength <= 2) return { text: "Low", color: "error" };
    if (strength <= 4) return { text: "Medium", color: "warning" };

    return { text: "High", color: "success" };
};