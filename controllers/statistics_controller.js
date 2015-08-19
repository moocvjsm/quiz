var models = require('../models/models.js');

// bloque de estadisticas con los valores
var statisticsBlock =
{
  totalPreguntas : 0,
  totalComentarios : 0,
  comentariosPregunta : 0,
  preguntasSinComentario : 0,
  preguntasConComentario : 0
};

// Muestra las estadisticas
exports.calculate = function(req, res, next) {
  models.Quiz.count()
  .then(function(ctQuestions) {
      statisticsBlock.totalPreguntas = ctQuestions;
//      console.log('ctQuestions:'+ctQuestions);
      return models.Comment.count();
  })
  .then(function(ctComentarios) {
      statisticsBlock.totalComentarios = ctComentarios;
//      console.log('ctComentarios:'+ctComentarios);
      return models.Comment.preguntasConComentario();
  })
/*  .then(function(ctQuestions) {
      statisticsBlock.comentariosPregunta = ctQuestions;
      console.log('ctQuestionsPP:'+ctQuestions);
      return models.Comment.preguntasSinComentario();
  })*/
/*  .then(function(ctNCQuestions) {
      statisticsBlock.preguntasSinComentario = ctNCQuestions;
      console.log('ctNCQuestions:'+ctNCQuestions);
      return models.Comment.preguntasConComentario();
  })*/
  .then(function(ctCQuestions) {
      statisticsBlock.preguntasConComentario = ctCQuestions;
//      console.log('ctCQuestions:'+ctCQuestions);
      // comentarios por preguntas
      statisticsBlock.comentariosPregunta =
        statisticsBlock.totalComentarios / statisticsBlock.totalPreguntas; 
      //preguntas_sin_comentario = total_preguntras - preguntas_con_comentario
      statisticsBlock.preguntasSinComentario = statisticsBlock.totalPreguntas - ctCQuestions;
  })
  .catch(function(error) {next(error);})
  .finally(function(){ next() });


};

exports.show = function(req, res) {
  //console.log('mStatistics:' + statisticsBlock);
  // bloque de valor de estadisticas
  res.render('statistics/show', { statistics: statisticsBlock, errors : []});
};


