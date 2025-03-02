export const login = async (username, password) => {
    // Simulate login
    if (username === 'user' && password === 'password') {
        return { username };
    }
    throw new Error('Invalid credentials');
};

export const register = async (username, password) => {
    // Simulate registration
    return { username };
};
