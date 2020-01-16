/**
*	@file gpa.js
*	@author Victor Chimenti, MSCS 2020
*	@see https://www.seattleu.edu/premajor/gpa-calculator/
*
*	refactored from legacy gpa calculator
*	this feature is mirrored to multiple pages
*/

<script>
	/* declare script variables */
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


	/**
	* Define grades and their GPA equivalent
	* the gradeChart object maps the gradeKey and gradeValue arrays together
	* the gradeChart is used to assign a numeric value to the
	* letter grade entered by the user
	*/
	let gradeKeys = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E', 'F'];
	let gradeValues = [4, 3.7, 3.3, 3, 2.7, 2.3, 2, 1.7, 1.3, 1, 0.7, 0, 0];
	let gradeChart = {};
	gradeKeys.forEach((key, index) => gradeChart[key] = gradeValues[index]);


	/**
	* table begins with rows for 5 classes and grades
	* if the user adds a row, then this number will be incremented
	*/
	let numRows = 5;


	/* Calculate the GPA entered by the client */
	function calculateGPA() {
		// Calculate total grade points and credits
		let validGrade = false;
		totalGrade = 0;
		totalCredits = 0;

		/**
		*	iterate over each row of courses to check for gpa entries by the client
		*	i is set to one to coordinate with current html div ids
		*/
		console.log("numRows calculateGPA: " + numRows);
		for (let i = 1; i <= numRows; i++) {
			gradeString = document.getElementById("grade" + i).value.toUpperCase();
			// gradeString = gradeRaw.toUpperCase();
			creditString = document.getElementById("credits" + i).value;
			if (creditString.length < 2) {
				classCredits = parseInt(creditString);
				if (gradeString.length < 3) {
					for (let grade in gradeChart) {
						if (gradeString == grade) {
							var score = gradeChart[grade];
							totalCredits += classCredits;
							totalGrade += (score * classCredits);
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


	/**
	* addCourse function adds combined row to the quarter gpa table
	* the table is accessed by its html div id unweightedTable
	* the user can continue to add courses as needed
	* the global numRows variable is incremented each time
	*/
	function addCourse() {
		console.log("numRows before: " + numRows);
		++numRows;
		console.log("numRows after: " + numRows);
		$('#unweightedTable tbody').append(`'<tr>
			<th>Course " + numRows + "</th>
			<td><input type="text" id="grade'+numRows+'" class="grade" oninput="calculateGPA()" />
			<label for="grade'+numRows+'" class="sr-only">'"Course "+numRows+" Letter Grade'</label></td>
			<td><input type="text" id="credits'+numRows+'" class="credits" oninput="calculateGPA()" />
			<label for="credits'+numRows+'" class="sr-only">'"Course "+numRows+" Courses'</label></td>
			</tr>'`);
		console.log("add course ");
	}


</script>
