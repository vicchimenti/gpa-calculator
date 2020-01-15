/**
*	@file gpa.js
*	@author Victor Chimenti, MSCS 2020
*	@see https://www.seattleu.edu/premajor/gpa-calculator/
*/

<script>
	/* declare script variables */
	var numRows = 5;
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

	/* Define grades and their GPA equivalent */
	var gradeChart = {};
	var gpaChart = {};

	/* establish known size of list */
	var gradeChartTotal = 27;
	var gpaChartTotal = 27;

	/* Uppercase */
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

	/* Lowercase */
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

	/* Calculate the GPA entered by the client */
	function calculateGPA() {
		// Calculate total grade points and credits
		totalGrade = 0;
		totalCredits = 0;
		var validGrade = false;

		/* iterate over each row of courses to check for gpa entries by the client */
		for (i = 1; i <= numRows; i++) {
			gradeString = document.getElementById("grade" + i).value;
			creditString = document.getElementById("credits" + i).value;
			if (creditString.length < 2) {
				classCredits = parseInt(creditString);
				if (gradeString.length < 3) {
					for (j = 0; j < gradeChartTotal; j++) {
						if (gradeString == gradeChart[j]) {
							totalCredits += classCredits;
							totalGrade += (gpaChart[j] * classCredits);
							validGrade = true;
						}
					}
				}
			}


			/* style the table elements based on avlid client input*/
			if (validGrade == true && isNaN(gradeString)) {
				document.getElementById("grade" + i).style.borderColor = "rgb(108, 179, 63)";
			} else {
				document.getElementById("grade" + i).style.borderColor = "red";
			}

			/* style the table based on value of client input */
			if (classCredits > 0 && classCredits < 10) {
				document.getElementById("credits" + i).style.borderColor = "rgb(108, 179, 63)";
			} else {
				document.getElementById("credits" + i).style.borderColor = "red";
			}
		}

		/* Calculate the Quarter GPA */
		GPA.unweighted = totalGrade / totalCredits;
		GPA.unweighted = Math.round( 100 * GPA.unweighted );
		GPA.unweighted = GPA.unweighted / 100;
		var display1 = document.getElementById("unweightedGPA");

		/* validate result */
		if (GPA.unweighted) {
			display1.innerHTML = GPA.unweighted.toFixed(2);
		}

		/* Calculate cumulative GPA based on client input */
		cumulativeGradeString = document.getElementById("cumulativeGrade").value;
		cumulativeCreditString = document.getElementById("cumulativeCredits").value;
		totalCumulativeGrade = parseFloat(cumulativeGradeString);
		totalCumulativeCredits = parseInt(cumulativeCreditString);

		/* style cumulative table based on results */
		if (totalCumulativeGrade < 0) {
			document.getElementById("cumulativeGrade").style.borderColor = "red";
		}
		else {
			document.getElementById("cumulativeGrade").style.borderColor = "rgb(153, 134, 117)";
		}

		/* combine current quarter gpa with cumulative */
		GPA.cumulative = ( (totalCumulativeGrade * totalCumulativeCredits) + totalGrade) / (totalCumulativeCredits + totalCredits);
		GPA.cumulative = Math.round( 100 * GPA.cumulative );
		GPA.cumulative = GPA.cumulative / 100;
		var display2 = document.getElementById("cumulativeGPA");

		/* validate combined results */
		if (GPA.cumulative && totalCumulativeGrade >= 0) {
			display2.innerHTML = GPA.cumulative.toFixed(2);
		}
	}
</script>
