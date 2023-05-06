export const getCity = (data) => {
    const [name, latitude, longitude] = data.trim().split(',');
    return {
        name: name,
        coordinates: { latitude: Number(latitude), longitude: Number(longitude) },
    };
};
//# sourceMappingURL=getCity.js.map