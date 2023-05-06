export const getLocation = (data: string) => {
  const [latitude, longitude] = data.trim().split(',');

  return { latitude: Number(latitude), longitude: Number(longitude) };
};
