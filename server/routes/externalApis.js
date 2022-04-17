const request = require('request-promise');

//Gives latt and longt from the postal code which is entered by user in Post Ad page
const getLocFromPlCode = async (postalCode) => {
  try {
    const response = await request(`https://geocoder.ca/?locate=${postalCode}&geoit=XML&json=1`);
    
    const data = JSON.parse(response);
      return {
      lat: data.latt,
      lng: data.longt,
    };
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports= {getLocFromPlCode}