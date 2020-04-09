var inner = document.getElementsByClassName('inner')[0],
	arr = [],
	btnCreate = $('#create').on('click', function () {
		var row = $('#row').val(),
			column = $('#column').val();
		
		createTable(row, column)
	}),
	btnCalc = $('#calc').on('click', mathFunc);

function createTable(row, column) {
	var table = $('<table>').addClass('table table-light text-center').attr('id', 't');;

	$('#inner').empty();
	for (var i = 0; i < row; i++) {
		var r = $('<tr>');
		for (var c = 0; c < column; c++) {
			var col = $('<td>').text(randomInteger(0, 21));
			r.append(col);
		};
		table.append(r);
	};
	$('#inner').append(table);
};

function mathFunc() {
	var table = $('#t tr'),
		acc = 0,
		count = 0,
		ser = 0,
		min = 90,
		minPosCol = 0,
		minPosRow = 0,
		max = 0,
		maxPosCol = 0,
		maxPosRow = 0,
		diagSumm = 0,
		diagSummRevers = 0;
		

	$('#t td').each(function (index) {
		var cellText = +$(this).html(),
			row = index;
		if (min > cellText) {
			min = cellText;
			minPosCol = $(this)[0].cellIndex + 1;
			minPosRow = $(this).parent()[0].rowIndex + 1;
		};
		if (max < cellText) {
			max = cellText;
			maxPosCol = $(this)[0].cellIndex + 1;
			maxPosRow = $(this).parent()[0].rowIndex + 1;
		};
		acc += cellText;
		count += 1;
	
	});
	table.each(function (index) {
		var cell = $(this)[0].childNodes,
			lenght = cell.length,
			num = +cell[index].innerHTML;
			numRevers = +cell[lenght - index - 1].innerHTML;
		cell[index].style.backgroundColor = 'grey';
		cell[lenght - index - 1].style.backgroundColor = 'grey';
		diagSumm += num;
		diagSummRevers += numRevers;
		console.log(lenght);
	})
	$('#res').text('Сумма: ' + acc + " Среднее значение: " + (Math.round(ser = acc / count)) + 
				   '\n Столбец: ' + minPosCol + ' Ряд: ' + minPosRow + " min: " + min +
				   '\n Столбец: ' + maxPosCol + ' Ряд: ' + maxPosRow + " max: " + max +
				   ' Сумма по диагонали: ' + diagSumm + 
				   ' Сумма по обратной диагонали: ' + diagSummRevers);
	table[minPosRow-1].childNodes[minPosCol-1].style.backgroundColor = '#45a049';
	table[maxPosRow-1].childNodes[maxPosCol-1].style.backgroundColor = '#0062cc';
};

function randomInteger(min, max) {
	var rand = min + Math.random() * (max - min)
	rand = Math.round(rand);
	return rand;
}