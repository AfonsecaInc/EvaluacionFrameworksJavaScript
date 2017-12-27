// cambia el color del titutlo
function cambiaColorTitulo(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				cambiaColorTitulo('h1.main-titulo');
			},
			queue: true
		});
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function crearMatrizDulces(arrayType, index) {

	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();

	var columnasDulces = $([candyCol1, candyCol2, candyCol3, candyCol4,
		candyCol5, candyCol6, candyCol7]);

	if (typeof index === 'number') {
		var filaDulces = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return columnasDulces;
	} else if (arrayType === 'rows' && index !== '') {
		return filaDulces;
	}
}

function filasDulces(index) {
	var filaDulces = crearMatrizDulces('rows', index);
	return filaDulces;
}

function columnasDulces(index) {
	var columnaDulce = crearMatrizDulces('columns');
	return columnaDulce[index];
}

// Validacion dulces
function validarColumna() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var posicionDulce = [];
		var extraposicionDulce = [];
		var columnaDulce = columnasDulces(j);
		var comparisonValue = columnaDulce.eq(0);
		var gap = false;
		for (var i = 1; i < columnaDulce.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = columnaDulce.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (posicionDulce.length >= 3) {
					gap = true;
				} else {
					posicionDulce = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						posicionDulce.push(i - 1);
					} else {
						extraposicionDulce.push(i - 1);
					}
				}
				if (!gap) {
					posicionDulce.push(i);
				} else {
					extraposicionDulce.push(i);
				}
				counter += 1;
			}
			comparisonValue = columnaDulce.eq(i);
		}
		if (extraposicionDulce.length > 2) {
			posicionDulce = $.merge(posicionDulce, extraposicionDulce);
		}
		if (posicionDulce.length <= 2) {
			posicionDulce = [];
		}
		contadorDulces = posicionDulce.length;
		if (contadorDulces >= 3) {
			eliminarColumnaDulces(posicionDulce, columnaDulce);
			establecerPuntaje(contadorDulces);
		}
	}
}

function eliminarColumnaDulces(posicionDulce, columnaDulce) {
	for (var i = 0; i < posicionDulce.length; i++) {
		columnaDulce.eq(posicionDulce[i]).addClass('delete');
	}
}

function validarFila() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var posicionDulce = [];
		var extraposicionDulce = [];
		var filaDulces = filasDulces(j);
		var comparisonValue = filaDulces[0];
		var gap = false;
		for (var i = 1; i < filaDulces.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = filaDulces[i].attr('src');

			if (srcComparison != srcCandy) {
				if (posicionDulce.length >= 3) {
					gap = true;
				} else {
					posicionDulce = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						posicionDulce.push(i - 1);
					} else {
						extraposicionDulce.push(i - 1);
					}
				}
				if (!gap) {
					posicionDulce.push(i);
				} else {
					extraposicionDulce.push(i);
				}
				counter += 1;
			}
			comparisonValue = filaDulces[i];
		}
		if (extraposicionDulce.length > 2) {
			posicionDulce = $.merge(posicionDulce, extraposicionDulce);
		}
		if (posicionDulce.length <= 2) {
			posicionDulce = [];
		}
		contadorDulces = posicionDulce.length;
		if (contadorDulces >= 3) {
			deleteHorizontal(posicionDulce, filaDulces);
			establecerPuntaje(contadorDulces);
		}
	}
}

function deleteHorizontal(posicionDulce, filaDulces) {
	for (var i = 0; i < posicionDulce.length; i++) {
		filaDulces[posicionDulce[i]].addClass('delete');
	}
}

function establecerPuntaje(contadorDulces) {
	var puntaje = Number($('#score-text').text());
	switch (contadorDulces) {
		case 3:
			puntaje += 25;
			break;
		case 4:
			puntaje += 50;
			break;
		case 5:
			puntaje += 75;
			break;
		case 6:
			puntaje += 100;
			break;
		case 7:
			puntaje += 200;
	}
	$('#score-text').text(puntaje);
}

function checkTablero() {
	llenarTablero();
}

function llenarTablero() {
	var top = 7;
	var column = $('[class^="col-"]');

	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = getRandomInt(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	añadirEventosDulces();
	establecerValidaciones();
}

function establecerValidaciones() {
	validarColumna();
	validarFila();
	if ($('img.delete').length !== 0) {
		eliminarAnimacionDulces();
	}
}

function añadirEventosDulces() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: intercambiarDulces
	});
	habilitarEventosDulces();
}

function deshabilitarEventosDulces() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function habilitarEventosDulces() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function constrainCandyMovement(event, arrastrarDulce) {
	arrastrarDulce.position.top = Math.min(100, arrastrarDulce.position.top);
	arrastrarDulce.position.bottom = Math.min(100, arrastrarDulce.position.bottom);
	arrastrarDulce.position.left = Math.min(100, arrastrarDulce.position.left);
	arrastrarDulce.position.right = Math.min(100, arrastrarDulce.position.right);
}

function intercambiarDulces(event, arrastrarDulce) {
	var arrastrarDulce = $(arrastrarDulce.draggable);
	var dragSrc = arrastrarDulce.attr('src');
	var soltarDulce = $(this);
	var dropSrc = soltarDulce.attr('src');
	arrastrarDulce.attr('src', dropSrc);
	soltarDulce.attr('src', dragSrc);

	setTimeout(function () {
		checkTablero();
		if ($('img.delete').length === 0) {
			arrastrarDulce.attr('src', dragSrc);
			soltarDulce.attr('src', dropSrc);
		} else {
			actualizarMovimientos();
		}
	}, 500);

}

function checkTableroPromise(result) {
	if (result) {
		checkTablero();
	}
}

function actualizarMovimientos() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

function eliminarAnimacionDulces() {
	deshabilitarEventosDulces();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				eliminarDulces()
					.then(checkTableroPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

function showPromiseError(error) {
	console.log(error);
}

function eliminarDulces() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	});
}

function finJuego() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-puntaje').width('100%');
}

function inicioJuego() {

	cambiaColorTitulo('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkTablero();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: finJuego
		});
	});
}

$(function () {
	inicioJuego();
});
