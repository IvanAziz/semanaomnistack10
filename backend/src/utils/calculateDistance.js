function deg2rad(deg) {
  return deg * (Math.PI/180);
}

module.exports = function getDistanceFromLatInKm(centerCoordinates, pointCoordinates) {
  const radius = 6371;

  const { latitude: lat1, longitude: lat2} = centerCoordinates;
  const { latitude: lon1, longitude: lon2} = pointCoordinates;

  const dLan = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1);

  const a = 
    Math.sin(dLan/2) * Math.sin(dLan/2) *
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = radius * center;

    return distance;
}