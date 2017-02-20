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
$.getJSON("json/2016-WS.json", function(res) {
	rawArray = res['rows']
	for (i = 0; i < rawArray.length; i++) {
		pId = rawArray[i][13];
		pName = rawArray[i][14];
		pitcherIn = false;
		pitchersLength = Object.keys(pitchers).length
		for (a = 0; a < pitchersLength; a++) {
			key = Object.keys(pitchers)[a]
			if (key == pId) {
				pitcherIn = true;
			}
		}
		if (pitcherIn == false) {
			pitchers[pId] = [rawArray[i]]
		} else {
			pitchers[pId].push(rawArray[i])
		}
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
		// go through all pitches sorted by ID
		for (i = 0; i < pitchersLength; i++) {
			key = Object.keys(pitchers)[i]
			if (pId == key) {
				totalPitches = 0;
				totalStrikes = 0;
				totalBalls = 0;
				pitches = pitchers[key];
				pitchCount = pitches.length
				for (a = 0; a < pitchCount; a++) {
					// !filter matching
					base1 = pitches[a][25];
					base2 = pitches[a][26];
					base3 = pitches[a][27];
					outs = pitches[a][24]
					strikes = pitches[a][23]
					balls = pitches[a][22]
					hand = pitches[a][12]
					inning = pitches[a][8]
					if (pitches[a][32] > pitches[a][31]) {
						score = 'W'
					} else if (pitches[a][32] < pitches[a][31]) {
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
						// set all variables to be updated
						pResult = pitches[a][33]
						pType = pitches[a][34]
						v = pitches[a][35];
						sr = pitches[a][36];
						sd = pitches[a][37];
						xp = pitches[a][38];
						zp = pitches[a][39];
						szt = pitches[a][40];
						szb = pitches[a][41];
						x0 = pitches[a][42];
						y0 = pitches[a][43];
						z0 = pitches[a][44];
						xa = pitches[a][45];
						ya = pitches[a][46];
						za = pitches[a][47];
						prob = pitches[a][51];
						// update pitch type objects, go through all pitch totals to update 
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
								pitchTotals[b].x0 += x0;
								pitchTotals[b].y0 += y0;
								pitchTotals[b].z0 += z0;
								pitchTotals[b].xa += xa;
								pitchTotals[b].ya += ya;
								pitchTotals[b].za += za;
								pitchTotals[b].prob += prob;
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
			x0 = (pitchTotals[c].x0 / pitchCount2) || 0;
			y0 = (pitchTotals[c].y0 / pitchCount2) || 0;
			z0 = (pitchTotals[c].z0 / pitchCount2) || 0;
			xa = (pitchTotals[c].xa / pitchCount2) || 0;
			ya = (pitchTotals[c].ya / pitchCount2) || 0;
			za = (pitchTotals[c].za / pitchCount2) || 0;
			prob = (pitchTotals[c].prob / pitchCount2) || 0;
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
				"x0": x0,
				"y0": y0,
				"z0": z0,
				"xa": xa,
				"ya": ya,
				"za": za,
				"prob": prob,
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
				output += "<div class='pitchTypeContainer'>" + "<h2 class='pitchType'> " + pitchName(pitchAvg[c].type) + "</h2>" + "<div class='pitchType avg'><h3>" + (numPitchAvg * 100).toFixed(1) + "%</h3></div>" + "<h2>Averages</h2>"+"<div class='pitchType'>" + pitchName(pitchAvg[c].type) + "s Thrown: <b>" + pitchAvg[c].count + "</b></div><div class='pitchType'>Release Velocity: " + (pitchAvg[c].v).toFixed(1) + " mph</div>" + "<div class='pitchType'>Spin Rate (RPM): " + (pitchAvg[c].sr).toFixed(1) + "</div>" + "<div class='pitchType'>Spin Degree: " + (pitchAvg[c].sd).toFixed(1) + "</div>" + "<div class='pitchType'>Strike Probability: " + Math.round(pitchAvg[c].prob*100) + "%</div><div class='pitchType'>Strike Zone Top: " + (pitchAvg[c].szt).toFixed(1) + "'</div>" + "<div class='pitchType'>Strike Zone Bottom: " + (pitchAvg[c].szb).toFixed(1) + "'</div>"  + "<div class='sz-container'><h2>Pitch Location</h2>" + "<div style='background-color:rgba(27,94,32," + (hz1 + .10) + "' class='zone' data-id='1' >" + (hz1 * 100).toFixed(1) + "%</div>" + "<div style='background-color:rgba(27,94,32," + (hz2 + .10) + "' class='zone' data-id='2' >" + (hz2 * 100).toFixed(1) + "%</div>" + "<div style='background-color:rgba(27,94,32," + (hz3 + .10) + "' class='zone' data-id='3' >" + (hz3 * 100).toFixed(1) + "%</div>" + "<div style='background-color:rgba(27,94,32," + (hz4 + .10) + "' class='zone' data-id='4' >" + (hz4 * 100).toFixed(1) + "%</div>" + "</div>" +
 
				"</div>";
			} else {}
		}
		
	if (output ==''){
		output="There are no results that match your search. Please try different filters."
	}	
		
		$('#result').html(output)
	})
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