export const getLocation = (data) => {
    const [latitude, longitude] = data.trim().split(',');
    return { latitude: Number(latitude), longitude: Number(longitude) };
};
//# sourceMappingURL=getLocation.js.map