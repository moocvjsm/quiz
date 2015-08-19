// definicion de la tabla de comentarios
module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
  		'Comment',
    	{ 
    		texto: {
        		type: DataTypes.STRING,
        		validate: { notEmpty: {msg: "-> Falta Comentario"}}
      		},
      		publicado: {
      			type: DataTypes.BOOLEAN,
      			defaultValue: false
       		}
    	},
      {
        classMethods : {
/*          mediaComentariosPreguntas : function() {
            var nComs, nPregs = 3;
            nComs = this.aggregate('QuizId', 'count', { distinct: false });
            console.log('nComs:' + nComs);
            nPregs = Quiz.aggregate('QuizId', 'count', { distinct: false });
            console.log('nPregs:' + nPregs);
            return nComs / nPregs;
          },*/
          preguntasConComentario : function() {
            return this.aggregate('QuizId', 'count', { distinct: true });
          }
        }
      }
  	);
} 
