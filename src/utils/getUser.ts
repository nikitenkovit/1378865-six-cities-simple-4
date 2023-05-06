export const getUser = (data: string) => {
  const [name, email, avatarPath, password, isPro] = data.trim().split(',');

  return {
    name,
    email,
    avatarPath,
    password,
    isPro: isPro === 'tue',
  };
};
