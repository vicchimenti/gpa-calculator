<script>

	var numRows = 3;
	var totalGrade;
	var totalCredits;
	var totalCumulativeGrade;
	var totalCumulativeCredits;
	var classCredits;
	var gradeString;
	var creditString;
	var cumulativeGradeString;
	var cumulativeCreditString;
	var GPA = {
		unweighted: 0,
		cumulative: 0
	};

	// Define grades and their GPA equivalent
	var gradeChart = {};
	var gpaChart = {};

	var gradeChartTotal = 27;
	var gpaChartTotal = 27;

	// Uppercase
	gradeChart[1] = "A";
	gpaChart[1] = 4;

	gradeChart[2] = "A-";
	gpaChart[2] = 3.7;

	gradeChart[3] = "B+";
	gpaChart[3] = 3.3;

	gradeChart[4] = "B"
	gpaChart[4] = 3;

	gradeChart[5] = "B-";
	gpaChart[5] = 2.7;

	gradeChart[6] = "C+";
	gpaChart[6] = 2.3;

	gradeChart[7] = "C";
	gpaChart[7] = 2;

	gradeChart[8] = "C-";
	gpaChart[8] = 1.7;

	gradeChart[9] = "D+";
	gpaChart[9] = 1.3;

	gradeChart[10] = "D";
	gpaChart[10] = 1;

	gradeChart[11] = "D-";
	gpaChart[11] = 0.7;

	gradeChart[12] = "E";
	gpaChart[12] = 0;

	gradeChart[25] = "F";
	gpaChart[25] = 0;

	// Lowercase
	gradeChart[13]  = "a";
	gpaChart[13] = 4;

	gradeChart[14] = "a-";
	gpaChart[14] = 3.7;

	gradeChart[15] = "b+";
	gpaChart[15] = 3.3;

	gradeChart[16] = "b";
	gpaChart[16] = 3;

	gradeChart[17] = "b-";
	gpaChart[17] = 2.7;

	gradeChart[18] = "c+";
	gpaChart[18] = 2.3;

	gradeChart[19] = "c";
	gpaChart[19] = 2;

	gradeChart[20] = "c-";
	gpaChart[20] = 1.7;

	gradeChart[21] = "d+";
	gpaChart[21] = 1.3;

	gradeChart[22] = "d";
	gpaChart[22] = 1;

	gradeChart[23] = "d-";
	gpaChart[23] = 0.7;

	gradeChart[24] = "e";
	gpaChart[24] = 0;

	gradeChart[26] = "f";
	gpaChart[26] = 0;

	function calculateGPA() {
		console.log("calculateGPA");

		// Calculate total grade points and credits
		totalGrade = 0;
		totalCredits = 0;
		var validGrade = false;

		for (i = 1; i <= numRows; i++) {
			console.log("calculateGPA for loop");

			gradeString = document.getElementById("grade" + i).value;
			creditString = document.getElementById("credits" + i).value;
			classCredits = parseInt(creditString);
			console.log("gradeString " + gradeString);
			if (gradeString) {
				console.log("grade string");

				for (j = 0; j < gradeChartTotal; j++) {
					console.log("calculateGPA j for loop");

					if (gradeString == gradeChart[j]) {
						console.log("calculateGPA j for loop if");

						totalCredits += classCredits;
						totalGrade += (gpaChart[j] * classCredits);
						validGrade = true;
					}
				}
			}

			if (validGrade == true) {
				console.log("validgrade true");
				document.getElementById("grade" + i).style.borderColor = "rgb(108, 179, 63)";
			}
			else {
				console.log("validgrade false");
				document.getElementById("grade" + i).style.borderColor = "red";
			}

			if (classCredits && classCredits < 0 || classCredits > 10) {
				console.log("if classCredits && classCredits");
				document.getElementById("credits" + i).style.borderColor = "red";
			}
			else if (!classCredits && creditString) {
				console.log("else if classCredits && classCredits");

				document.getElementById("credits" + i).style.borderColor = "red";
			}
			else {
				console.log("else classCredits && classCredits");

				document.getElementById("credits" + i).style.borderColor = "rgb(108, 179, 63)";
			}

			console.log("classCredits = " + classCredits);
		}
		console.log("grade points = " + totalGrade);
		console.log("credits = " + totalCredits);

		// Calculate GPA
		GPA.unweighted = totalGrade / totalCredits;
		GPA.unweighted = Math.round( 100 * GPA.unweighted );
		GPA.unweighted = GPA.unweighted / 100;
		console.log("GPA = " + GPA.unweighted);
		var display1 = document.getElementById("unweightedGPA");

		if (GPA.unweighted) {
			console.log("if GPA.unweighted");

			display1.innerHTML = "Unweighted GPA: " + GPA.unweighted.toFixed(2);
		}
		else {
			console.log("else GPA.unweighted");

			display1.innerHTML = "Unweighted GPA:";
		}

		//Calculate cumulative GPA
		cumulativeGradeString = document.getElementById("cumulativeGrade").value;
		cumulativeCreditString = document.getElementById("cumulativeCredits").value;
		totalCumulativeGrade = parseFloat(cumulativeGradeString);
		console.log("totalCumulativeGrade: " + totalCumulativeGrade);

		totalCumulativeCredits = parseInt(cumulativeCreditString);
		console.log("totalCumulativeCredits: " + totalCumulativeCredits);

		if (totalCumulativeGrade < 0) {
			console.log("if totalCumulativeGrade");

			document.getElementById("cumulativeGrade").style.borderColor = "red";
		}
		else {
			console.log("else totalCumulativeGrade");

			document.getElementById("cumulativeGrade").style.borderColor = "rgb(153, 134, 117)";
		}

		GPA.cumulative = ( (totalCumulativeGrade * totalCumulativeCredits) + totalGrade) / (totalCumulativeCredits + totalCredits);
		GPA.cumulative = Math.round( 100 * GPA.cumulative );
		GPA.cumulative = GPA.cumulative / 100;
		var display2 = document.getElementById("cumulativeGPA");

		if (GPA.cumulative && totalCumulativeGrade >= 0) {
			console.log("if cumulative and totalCumulativeGrade");
			display2.innerHTML = "Cumulative GPA: " + GPA.cumulative.toFixed(2);
		}
		else {
			console.log("if cumulative and totalCumulativeGrade else");

			display2.innerHTML = "Cumulative GPA:";
		}
	}

	function addRow() {
		console.log("add row");
		var table = document.getElementById("unweightedTable");
		{
			var row = table.insertRow(r);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			cell1.outerHTML = "<th>Course " + r.toString() + "</th>";
			cell2.innerHTML = "<input id=\"grade" + (r).toString() + "\" type=\"text\" oninput=\"calculateGPA()\" id=\"Course" + r.toString() + "letterGrade\" /><label for=\"Course" +  r.toString() + "letterGrade\" class=\"sr-only\">Course " + r.toString() + " Letter Grade</label>";
			cell3.innerHTML = "<input id=\"credits" + (r).toString() + "\" type=\"text\" oninput=\"calculateGPA()\" id=\"Course" + r.toString() + "credits\"/><label for=\"Course" +  r.toString() + "letterGrade\" class=\"sr-only\">Course " + r.toString() + " Credits</label>";
		}
		r++;
		if (r > 1) {
			$("#removeButton").removeClass("disabled");
		}
		console.log("add row r: " + r);
	}

	function removeRow() {
		console.log("remove row");
		numRows--;
		if(r > 1){
			document.getElementById("unweightedTable").deleteRow(r);
		}else{
			numRows++;
		}
		if (numRows == 2) {
			$("#removeButton").addClass("disabled");
		}
		console.log("remove row numRows: " + numRows);
	}
</script>
