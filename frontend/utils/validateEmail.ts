export const validateEmail = (email:string) => {
    // Ensure the username does not contain spaces
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};