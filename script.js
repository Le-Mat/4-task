let cells = document.querySelectorAll('.cell'),
	activeCell = [],
	activeSteps = [],
	recСoorX = [],
	recСoorY = [],
	//последння активированная ячейка
	lastCell;

for (let i = 8, counter = 0 ; i >= 1; i--) {
	for (let j = 1 ; j <= 8; j++) {
		cells[ counter ].onclick = () => { showSteps( j, i, counter + (j - 8)); };
		counter++;
	}
}

function showSteps(coordX , coordY, index ) {
	let cell = cells[index - 1];
	cellColor =  window.getComputedStyle(cell).backgroundColor;
	activeCell = [ index - 1, cellColor ];
	if ( activeSteps ) clearPastSteps( );
	cell.style.backgroundColor = 'Green';

	//Поиск координат
	for (let i = 0; i < 4; i++) {
		findCoord( (i * 2), true, 1, 2, coordY, coordX);
	}

	//Проверка, выходит ли позиция за поле
	for (let i = 0; i < 7; i++) {
		if( recСoorX[i] <= 0 || recСoorX[i] >= 9 || recСoorY[i] <= 0 || recСoorY[i] >= 9 ){
			recСoorX.splice( i, 1 );
			recСoorY.splice( i, 1 );
			i -= 1;
		}
	}
	lastCell = index - 1;
	for(let i = 0; i < recСoorX.length; i++ ) {
		let X = recСoorX[i],
		 	Y = recСoorY[i],
			num = 64 - (( Y - 1 ) * 8 ) + ( X - 9 ),
			StepColor =  window.getComputedStyle(cells[num]).backgroundColor;
		activeSteps[i] = {
			"index" : num,
			"color" : StepColor
		};
		cells[num].style.backgroundColor = 'Blue';
	}
}

function findCoord ( numIt, firstStep, firstNum, secondNum, coordY, coordX ) {
	if(numIt < 4){
		recСoorX[numIt] = parseInt( coordX ) - firstNum;
		if(numIt < 2){
			recСoorY[numIt] = parseInt( coordY ) - secondNum;
			if(firstStep) findCoord( numIt + 1, false, 2, 1, coordY, coordX );
			return 0;
		}
		recСoorY[numIt] = parseInt( coordY ) + secondNum;
		if(firstStep) findCoord( numIt + 1, false, 2, 1, coordY, coordX );
	}
	else{
		recСoorX[numIt] = parseInt( coordX ) + firstNum ;
		if(numIt < 6){
			recСoorY[numIt] = parseInt( coordY ) - secondNum;
			if(firstStep) findCoord( numIt + 1, false, 2, 1, coordY, coordX );
			return 0;
		}
		recСoorY[numIt] = parseInt( coordY ) + secondNum;
		if(firstStep) findCoord( numIt + 1, false, 2, 1, coordY, coordX );
	}
}

//Очищешние ячеек прошлого хода
function clearPastSteps( index ) {
	let clearCell = true;
	for( let i = 0; i < activeSteps.length; i++) {
		if ( activeSteps[i].color === "rgb(0, 0, 0)" ) {
			cells[ activeSteps[i].index ].style.backgroundColor = "Black";
			if(clearCell) {
				cells[ lastCell ].style.backgroundColor = "White";
				clearCell = !clearCell;
			}
		}
		else {
			cells[ activeSteps[i].index ].style.backgroundColor = "White";
			if(clearCell) {
				cells[ lastCell ].style.backgroundColor = "Black";
				clearCell = !clearCell;
			}
		}
	}
}
