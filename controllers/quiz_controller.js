var models = require('../models/models.js');

// GET /quizes/question
/*exports.question = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    res.render('quizes/question', { pregunta: quiz[0].pregunta});
  })
};*/
// Autoload - factoriza el codigo si la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz)
    {
      if(quiz) {
        req.quiz = quiz;
        next();
      }
      else
      {
        next(new Error("No existe quizId=" + quizId));
      }
    }).catch(function(error) { next(error)})
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', { quiz: req.quiz, errors : []});
  })
};

// GET /quizes
exports.index = function(req, res) {

  var searchValue = (req.query.search || "Texto de busqueda");
  console.log(req.query.search);
  var searchText = '%';
  if(req.query.search)
  {
    searchText += req.query.search + '%';
  }



  models.Quiz.findAll(
  {
    where : ['lower(pregunta) like lower(?)', searchText],
    order: 'pregunta asc'
  }).then(
    function(quizes) {
      res.render('quizes/index', { quizes: quizes, searchPattern: searchValue, errors: []});
    }).catch(function(error) {next(error)});
};


// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) 
  {
    resultado = 'Correcto';
  } 
  res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(     // crea el objeto quiz
     { pregunta : "Pregunta", respuesta : "Respuesta", tema : "humanidades"}
    );

  res.render('quizes/new', {quiz : quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
//console.log(quiz.validate.success + ' ' + quiz.validate.then);
  quiz.validate().then(function(err){
    //console.log(err);
    if(err)
    {
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    }
    else
    {
    // guarda en DB los campos pregunta y respuesta de quiz
      quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
        res.redirect('/quizes');  
      });   // res.redirect: Redirección HTTP a lista de preguntas
    }
  }).catch(function(error){next(error)});
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz; // req.quiz: autoload de instancia de quiz
  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz     // save: guarda campos pregunta y respuesta en DB
        .save( {fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  ).catch(function(error){next(error)});
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};
