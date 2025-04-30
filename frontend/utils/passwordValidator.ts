export const validatePassword = (password: string): boolean => {
    // Ensure the password has at least one letter, one digit, and is at least 4 characters long
    const hasLetter: boolean = /[a-zA-Z]/.test(password);
    const hasDigit: boolean = /\d/.test(password);
    const minLength: boolean = password.length >= 4;
    return hasLetter && hasDigit && minLength;
};
