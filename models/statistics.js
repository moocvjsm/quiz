module.exports = function(sequelize, DataTypes) {
	//var vTotalPreguntas = 0;
	/*sequelize.query('SELECT COUNT(*) AS TotalPreguntas FROM Quizzes',
			{ type: sequelize.QueryTypes.SELECT }
		).then(function(nroQuizes) {
				console.log(nroQuizes + 'TP:' + nroQuizes[0]['TotalPreguntas']);
				vTotalPreguntas = nroQuizes[0]['TotalPreguntas'];
				console.log('TPD:' + typeof(vTotalPreguntas));
		}); */

		//console.log('TPF:' + vTotalPreguntas);
	return {
		totalComentarios: function() { return 0; },
		totalPreguntas: function() { 
			var vTotalPreguntas = 0;
			sequelize.query('SELECT COUNT(*) AS TotalPreguntas FROM Quizzes',
				{ type: sequelize.QueryTypes.SELECT }
			).then(function(nroQuizes) {
				console.log(nroQuizes + 'TP:' + nroQuizes[0]['TotalPreguntas']);
				vTotalPreguntas = nroQuizes[0]['TotalPreguntas'];
				console.log('TPD:' + typeof(vTotalPreguntas));
				return vTotalPreguntas;
			});
			return vTotalPreguntas;
		}
	};
/*	Aqui devolver un objeto con los cuatro valores estadisticos
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
*/
}