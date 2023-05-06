export const getUser = (data) => {
    const [name, email, avatarPath, password, isPro] = data.trim().split(',');
    return {
        name,
        email,
        avatarPath,
        password,
        isPro: isPro === 'tue',
    };
};
//# sourceMappingURL=getUser.js.map