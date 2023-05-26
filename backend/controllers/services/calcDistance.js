const pool = require('../../utilities/database');

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371 * 1000; // Radius of the Earth in meters
  
    // Convert latitude and longitude to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
  
    // Calculate the differences between the coordinates
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;
  
    // Apply the Haversine formula
    const a = Math.sin(latDiff / 2) ** 2 +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(lonDiff / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c;
  
    return distance;
  }

  // Convert degrees to radians
    function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

module.exports = {

    // Add like
    CalcDist: (lat1, lon1, lat2, lon2) => {
    
        const distancesBetweenInMeters = calculateDistance(lat1, lon1, lat2, lon2);

        return distancesBetweenInMeters;
    },

}