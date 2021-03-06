//definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
							{ 	pregunta: {
									type: DataTypes.STRING,
									validate : { notEmpty: {msg : "-> Falta Pregunta" }}
								},
							 	respuesta: {
									type: DataTypes.STRING,
									validate : { notEmpty: {msg : "-> Falta Pregunta" }}
								},
							 	tema: {
									type: DataTypes.STRING,
									validate : { notEmpty: {msg : "-> Falta Tema de Pregunta" }}
								}
							});

}