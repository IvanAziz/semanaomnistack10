const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')

/* Métodos\funções normalmente definidos no controller
 * index: Mostrar lista
 * show: Mostrar registro único
 * store: Criar registro
 * update: Alterar registro
 * destroy: Deletar registro
 */

module.exports = {
  
  // Método de pesquisa e retorno dos devs.
  async index (request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store (request, response) {
    // Como está sendo nomeada e exportada deixa de ser uma arroy function
    //era: routes.post('/devs', async (request, response) => {

      //Abaixo exemplo do send, mas vamos usar sempre JSON
      //return response.send('Hello World!!');
      //console.log(request.body);

      const { github_username, techs, latitude, longitude } = request.body;
      // console.log(request.body);
      // console.log(github_username, techs, latitude, longitude);

      let dev = await Dev.findOne({github_username});
      if (!dev) {
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        //console.log(apiResponse.data);
        
        /* Definindo como variável normal ao invés de constante.
          'name = login' -  Define login como valor padrão se name não existe.
          É o mesmo que:
          if (!name) { name = apiResponse.data.login} ou C#
          name = name ?? login.
        */
        //let {name = login, avatar_url, bio} = apiResponse.data;

        const {name = login, avatar_url, bio} = apiResponse.data;
        const techsArray = parseStringAsArray(techs);
        //console.log(name, avatar_url, bio, techArray);

        // Conforme documentação do MongoDB a coordenada é gravada como
        // [longitude, latitude] diferente da ordem obtida no Maps que é
        // latitude e longitude..
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        }
        //console.log(`Localização: ${location.coordinates[0]}, ${location.coordinates[1]}`);
          
        dev = await Dev.create({
          name,
          github_username,
          bio,
          avatar_url,
          techs: techsArray,
          location,
        });      

        // Filtrar as conexões que estão há no máximo 10km de distância
        // e que o novo dev tenha pelo menos uma das tecnologias filtradas.
        const sendSocketMessageTo = findConnections(
          {latitude, longitude},
          techsArray,
        )
        // console.log(sendSocketMessageTo);
        sendMessage(sendSocketMessageTo, 'new-dev', dev);
      }
      return response.json(dev); 
  } ,

  // Atividade extra OmniStack (Desafio)
  // Criar os métodos update(PK: Username) e destroy
  async update(request, response) {
    // Recupera nome do usuário
    const {github_username} = request.query;
    console.log(request.query);
    console.log(github_username);

    // Verifica se registro existe no banco de dados
    let dev = await Dev.findOne({github_username});
    console.log(dev);

    // Se não existe informa que não foi encontrado
    if(!dev){
      return response.status(400).json({message: "Usuário não encontrado!"});
    }
    
  
    // Se existe aplica alteração
    // Carrega informação antiga e aplica alterações recebidas
    const {
        name = dev.name,
        bio = dev.bio,
        longitude = dev.location.coordinates[0],
        latitude = dev.location.coordinates[1], 
        avatar_url = dev.avatar_url } = request.body;

    // Se existe informação de tecnologias então aplica.
    const techs = request.body.techs ? parseStringAsArray(requestq.body.techs) : dev.techs;
    
    // Cria localização para latitude e longitude conforme (PointSchema)
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    }

    // Atualiza Dev e retorna a "atualização" dev
    let updatedDev = await Dev.findOneAndUpdate(github_username, {name, techs, bio, avatar_url, location}, {
      new: true
    });  
  
    return response.json(updatedDev);
  },

  // Método para exclusão de registro
  async destroy(request, response){
    // Recupera nome do usuário
    const {github_username} = request.query;

    // Verifica se o registro existe no banco de dados.
    let dev = await Dev.findOne({github_username});

    // Se o registro não existe apenas informa que o usuário não foi encontrado.
    if(!dev) {
     return response.status(400).json({message: "Usuário não encontrado!"});
    }
    
    // Remove registro do usuário.
    await Dev.deleteOne({github_username});
    
    // Responde com confirmação de exclusão.
    return response.json({ deleted : true});
  },

};
