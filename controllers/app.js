// set variables
pitchers = []
nameId = []
pitchTypes = ['CH', 'CU', 'FA', 'FT', 'FF', 'FC', 'SL', 'FS', 'SI', 'FO', 'KN', 'KC', 'GY', 'EP', 'PO', 'IN', 'AB', 'AS', 'UN']
base1Filter = false;
base2Filter = false;
base3Filter = false;
var bases = 'any';

function pitchName(pitch) {
	switch (pitch) {
	case "CH":
		pitch = "Changeup";
		break;
	case "CU":
		pitch = "Curveball";
		break;
	case "FA":
		pitch = "Fastball";
		break;
	case "FT":
		pitch = "Two Seamer";
		break;
	case "FF":
		pitch = "Four Seamer";
		break;
	case "FC":
		pitch = "Cutter";
		break;
	case "SL":
		pitch = "Slider";
		break;
	case "FS":
		pitch = "Splitter";
		break;
	case "SI":
		pitch = "Sinker";
		break;
	case "FO":
		pitch = "Forkball";
		break;
	case "KN":
		pitch = "Knuckleball";
		break;
	case "KC":
		pitch = "Knuckle Curve";
		break;
	case "SC":
		pitch = "Screwball";
		break;
	case "GY":
		pitch = "Gyroball";
		break;
	case "EP":
		pitch = "Eephus";
		break;
	case "PO":
		pitch = "Pitchout";
		break;
	case "IN":
		pitch = "Intentional Ball";
		break;
	case "AB":
		pitch = "Automatic Ball ";
		break;
	case "AS":
		pitch = "Automatic Strike";
		break;
	case "UN":
		pitch = "Unknown";
		break;
	}
	return pitch
}
// !get the data
 
	rawArray = data;

	for (i = 0; i < rawArray.length; i++) {
		pId = rawArray[i][1];
		pName = rawArray[i][2];
		 
		pObj = {
			"id": pId,
			"name": pName
		}
		tester = nameId.indexOf(pObj);
		pIdIn = false
		for (b = 0; b < nameId.length; b++) {
			if (nameId[b].id == pId) {
				pIdIn = true
			}
		}
		if (pIdIn == false) {
			nameId.push(pObj)
		}
	}
	// sort by name
	nameId.sort(function(a, b) {
		return a.name.localeCompare(b.name);
	})
	
		
	// !get all the pitchers and set html for pitcher selection
	searchResult = '<div class="option-container"><label>PITCHER</label><select id="selectPitcher">'
	for (b = 0; b < nameId.length; b++) {
		searchResult += "<option value='" + nameId[b].id + "'>" + nameId[b].name + "</option> "
	}
	
	
	$('#searchResult').html(searchResult);
	searchResult += '</select></div>'
	// !get user input
	$(document).on('click', '#submitSearch',function() {
		totalPitches = 0;
		// set variables
		var filterOuts = $('.filter-outs').find('.selected').data('outs');
		var filterBalls = $('.filter-balls').find('.selected').data('balls');
		var filterStrikes = $('.filter-strikes').find('.selected').data('strikes');
		var filterHand = $('.filter-hand').find('.selected').data('hand');
		var filterScore = $('.filter-score').find('.selected').data('score');
		var filterInning = $('.filter-inning').find('.selected').data('inning');
		var pId = $('#selectPitcher').val();
		var pitchersLength = Object.keys(pitchers).length
		// set/reset each type of pitch object
		pitchTotals = []
		pitchAvg = []
		//set pitch totals objects to be updated
		for (i = 0; i < pitchTypes.length; i++) {
			pitchTotals.push({
				"type": pitchTypes[i],
				"count": 0,
				"v": 0,
				"sr": 0,
				"sd": 0,
				"xp": 0,
				"zp": 0,
				"szt": 0,
				"szb": 0,
				"x0": 0,
				"y0": 0,
				"z0": 0,
				"xa": 0,
				"ya": 0,
				"za": 0,
				"lh": 0,
				"rh": 0,
				"ll": 0,
				"rl": 0,
				"prob": 0
			})
		 
		}
		
		 
		
		// go through all pitches
		
		for (i = 0; i < rawArray.length; i++) {
		

			if (pId==rawArray[i][1]){
				totalPitches = 0;
				totalStrikes = 0;
				totalBalls = 0;
				 	outs = rawArray[i][6]
					base1 = rawArray[i][7];
					base2 = rawArray[i][8];
					base3 = rawArray[i][9];
					
					strikes = rawArray[i][6]
					balls = rawArray[i][5]
					hand = rawArray[i][0]
					inning = rawArray[i][8]
					if (rawArray[i][11] > rawArray[i][10]) {
						score = 'W'
					} else if (rawArray[i][11] < rawArray[i][10]) {
						score = 'L'
					} else {
						score = 'T'
					}
					// check the filters
					if (base1Filter == false && base2Filter == false && base3Filter == false) {
						bases = 'any';
					} else {
						bases = 'chosen'
					}
					
					if ((outs == filterOuts || filterOuts == 'any') && (balls == filterBalls || filterBalls == 'any') && (strikes == filterStrikes || filterStrikes == 'any') && (hand == filterHand || filterHand == 'any') && (score == filterScore || filterScore == 'any') && (inning == filterInning || filterInning == 'any') && (base1 == base1Filter || bases == 'any') && (base2 == base2Filter || bases == 'any') && (base3 == base3Filter || bases == 'any')) {
						
						pType = rawArray[i][13]
						v = rawArray[i][14];
						sr = rawArray[i][15];
						sd = rawArray[i][16];
						xp = rawArray[i][17];
						zp = rawArray[i][18];
						szt = rawArray[i][19];
						szb = rawArray[i][20];
						
				for (b = 0; b < pitchTotals.length; b++) {
					 	
							if (pitchTotals[b].type === pType) {
								pitchTotals[b].count += 1;
								pitchTotals[b].v += v;
								pitchTotals[b].sr += sr;
								pitchTotals[b].sd += sd;
								pitchTotals[b].xp += xp;
								pitchTotals[b].zp += zp;
								pitchTotals[b].szt += szt;
								pitchTotals[b].szb += szb;
// 								pitchTotals[b].prob += prob;
								sz = (szt + szb) / 2;
								if (sz < zp) {
									y = 'h'
								} else {
									y = 'l'
								}
								if (xp > 0) {
									x = 'r'
								} else {
									x = 'l'
								}
								loc = x + y;
								switch (loc) {
								case 'lh':
									pitchTotals[b].lh++;
									break;
								case 'rh':
									pitchTotals[b].rh++;
									break;
								case 'll':
									pitchTotals[b].ll++;
									break;
								case 'rl':
									pitchTotals[b].rl++;
									break;
								}
							}
						}
					}
				}
			}
	 
		
		 
		
		
		
		

		// average the pitches array and insert into avg object
		y = '';
		x = '';
		for (c = 0; c < pitchTypes.length; c++) {
			pitchCount2 = pitchTotals[c].count;
			pitchType = pitchTotals[c].type;
			v = (pitchTotals[c].v / pitchCount2) || 0;
			sr = (pitchTotals[c].sr / pitchCount2) || 0;
			sd = (pitchTotals[c].sd / pitchCount2) || 0;
			xp = (pitchTotals[c].xp / pitchCount2) || 0;
			zp = (pitchTotals[c].zp / pitchCount2) || 0;
			szt = (pitchTotals[c].szt / pitchCount2) || 0;
			szb = (pitchTotals[c].szb / pitchCount2) || 0;
// 			prob = (pitchTotals[c].prob / pitchCount2) || 0;
			pitchAvg.push({
				"type": pitchType,
				"count": pitchCount2,
				"v": v,
				"sr": sr,
				"sd": sd,
				"xp": xp,
				"zp": zp,
				"szt": szt,
				"szb": szb,
// 				"prob": prob,
				"lh": pitchTotals[c].lh,
				"rh": pitchTotals[c].rh,
				"ll": pitchTotals[c].ll,
				"rl": pitchTotals[c].rl
			})
			totalPitches += pitchAvg[c].count;
		}
		//sort by #of pitches
		pitchAvg.sort(function(a, b) {
			return parseFloat(b.count) - parseFloat(a.count);
		});
		// = = = = = = = = = = = = = = = = = OUTPUT = = = = = = = = = = = = = = = = =
		output = "";
		for (c = 0; c < pitchAvg.length; c++) {
			if (pitchAvg[c].count !== 0) {
				numPitchAvg = (pitchAvg[c].count / totalPitches);
				hz1 = (pitchAvg[c].lh / pitchAvg[c].count);
				hz2 = (pitchAvg[c].rh / pitchAvg[c].count);
				hz3 = (pitchAvg[c].ll / pitchAvg[c].count);
				hz4 = (pitchAvg[c].rl / pitchAvg[c].count);
				output += "<div class='pitchTypeContainer'>" + "<h2 class='pitchType'> " + pitchName(pitchAvg[c].type) + "</h2>" + "<div class='pitchType avg'><h3>" + (numPitchAvg * 100).toFixed(1) + "%</h3></div>" + "<h2>Averages</h2>"+"<div class='pitchType'>" + pitchName(pitchAvg[c].type) + "s Thrown: <b>" + pitchAvg[c].count + "</b></div><div class='pitchType'>Release Velocity: " + (pitchAvg[c].v).toFixed(1) + " mph</div>" + "<div class='pitchType'>Spin Rate (RPM): " + (pitchAvg[c].sr).toFixed(1) + "</div>" + "<div class='pitchType'>Spin Degree: " + (pitchAvg[c].sd).toFixed(1) + "</div>" + "<div class='pitchType'>Strike Probability: "/*  + Math.round(pitchAvg[c].prob*100) */ + "%</div><div class='pitchType'>Strike Zone Top: " + (pitchAvg[c].szt).toFixed(1) + "'</div>" + "<div class='pitchType'>Strike Zone Bottom: " + (pitchAvg[c].szb).toFixed(1) + "'</div>"  + "<div class='sz-container'><h2>Pitch Location</h2>" + "<div style='background-color:rgba(27,94,32," + (hz1 + .10) + "' class='zone' data-id='1' >" + (hz1 * 100).toFixed(1) + "%</div>" + "<div style='background-color:rgba(27,94,32," + (hz2 + .10) + "' class='zone' data-id='2' >" + (hz2 * 100).toFixed(1) + "%</div>" + "<div style='background-color:rgba(27,94,32," + (hz3 + .10) + "' class='zone' data-id='3' >" + (hz3 * 100).toFixed(1) + "%</div>" + "<div style='background-color:rgba(27,94,32," + (hz4 + .10) + "' class='zone' data-id='4' >" + (hz4 * 100).toFixed(1) + "%</div>" + "</div>" +
 
				"</div>";
			} else {}
		}
		
	if (output ==''){
		output="There are no results that match your search. Please try different filters."
	}	
		
		$('#result').html(output)
	})
 
$(document).on('click', '.filter-option',function() {
	$(this).parent().find('.selected').removeClass('selected')
	$(this).addClass('selected')
})
$(document).on('click','.base', function() {
	if ($(this).hasClass('selected')) {
		$(this).removeClass('selected')
		n = $(this).data('base')
		switch (n) {
		case 1:
			base1Filter = false;
			break;
		case 2:
			base2Filter = false;
			break;
		case 3:
			base3Filter = false;
			break;
		}
	} else {
		$(this).addClass('selected')
		n = $(this).data('base')
		switch (n) {
		case 1:
			base1Filter = true;
			break;
		case 2:
			base2Filter = true;
			break;
		case 3:
			base3Filter = true;
			break;
		}
	}

})