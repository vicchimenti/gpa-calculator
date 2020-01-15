/**
*	@file gpa.js
*	@author Victor Chimenti, MSCS 2020
*	@see https://www.seattleu.edu/premajor/gpa-calculator/
*
*	refactored from legacy gpa calculator
*/

<script>
	/* declare script letiables */
	let numRows = 5;
	let i = 0;
	let totalGrade;
	let totalCredits;
	let totalCumulativeGrade;
	let totalCumulativeCredits;
	let classCredits;
	let gradeString;
	let creditString;
	let cumulativeGradeString;
	let cumulativeCreditString;
	let GPA = {
		unweighted: 0,
		cumulative: 0
	};


	/* Define grades and their GPA equivalent */
	let gradeKeys = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E', 'F'];
	let gradeValues = [4, 3.7, 3.3, 3, 2.7, 2.3, 2, 1.7, 1.3, 1, 0.7, 0, 0];
	let gradeChart = {};
	gradeKeys.forEach((key, index) => gradeChart[key] = gradeValues[index]);



	/* establish known size of list */
	let gradeChartTotal = 27;
	// let gpaChartTotal = 27;


	/* Calculate the GPA entered by the client */
	function calculateGPA() {
		// Calculate total grade points and credits
		totalGrade = 0;
		totalCredits = 0;
		let validGrade = false;

		/* iterate over each row of courses to check for gpa entries by the client */
		for (i = 1; i <= numRows; i++) {
			gradeString = document.getElementById("grade" + i).value;
			creditString = document.getElementById("credits" + i).value;
			if (creditString.length < 2) {
				classCredits = parseInt(creditString);
				if (gradeString.length < 3) {
					for (let j = 0; j < gradeChartTotal; j++) {
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
		let display1 = document.getElementById("unweightedGPA");

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
		let display2 = document.getElementById("cumulativeGPA");

		/* validate combined results */
		if (GPA.cumulative && totalCumulativeGrade >= 0) {
			display2.innerHTML = GPA.cumulative.toFixed(2);
		}
	}
</script>
