const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response){
    //console.log(request.query);

    // Filtrar todos os devs em um raio de 10km
    // Filtrar devs por tecnologia
    const { latitude, longitude, techs } = request.query;
    const techArray = parseStringAsArray(techs);
    //console.log(techArray);
    const devs = await Dev.find({
       techs: {
         $in: techArray,
       },
       location: {
         $near: {
           $geometry: {
             type: "Point",
             coordinates: [longitude, latitude],
           },
           $maxDistance: 100000000000,
         }
       }
    });

    return response.json({devs});
  }
};