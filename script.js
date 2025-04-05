function calculateCGPA() {
    let totalCredits = 0;
    let totalGradePoints = 0;

    // Loop through all semesters and get the grade points and credits
    for (let i = 1; i <= 8; i++) {
        const subjects = document.getElementsByClassName(`semester${i}-subjects`);
        const semesterCredits = document.getElementsByClassName(`semester${i}-credits`);

        // Loop through each subject of the semester
        for (let j = 0; j < subjects.length; j++) {
            const credits = parseFloat(semesterCredits[j].value);
            const grade = subjects[j].value;

            if (credits && grade) {
                totalCredits += credits;
                totalGradePoints += credits * gradeToPoint(grade);
            }
        }
    }

    const cgpa = totalGradePoints / totalCredits;
    document.getElementById('cgpaResult').innerText = cgpa.toFixed(2);
}

// Convert grade to grade points
function gradeToPoint(grade) {
    switch (grade.toUpperCase()) {
        case "O": return 10;
        case "A+": return 9;
        case "A": return 8;
        case "B+": return 7;
        case "B": return 6;
        case "C": return 5;
        case "U": return 0; // Fail
        case "W": return 0; // Withdrawn
        default: return 0;
    }
}

document.getElementById("semester").addEventListener("change", function() {
    const semester = this.value;
    generateSemesterInputs(semester);
});

function generateSemesterInputs(semester) {
    const container = document.getElementById("semesterInputContainer");
    container.innerHTML = ''; // Clear previous inputs

    const numSubjectsLabel = document.createElement("label");
    numSubjectsLabel.innerText = `Enter number of subjects for Semester ${semester}:`;
    const numSubjectsInput = document.createElement("input");
    numSubjectsInput.type = "number";
    numSubjectsInput.id = `num-subjects-sem${semester}`;
    numSubjectsInput.placeholder = "Enter number of subjects";
    numSubjectsInput.required = true;
    numSubjectsInput.addEventListener("input", function() {
        generateSubjectInputs(semester, numSubjectsInput.value);
    });

    container.appendChild(numSubjectsLabel);
    container.appendChild(numSubjectsInput);
}

function generateSubjectInputs(semester, numSubjects) {
    const container = document.getElementById("semesterInputContainer");
    
    let subjectInputs = document.createElement("div");
    subjectInputs.classList.add(`semester${semester}-subjects-container`);

    // Clear previous subject inputs
    const existingInputs = container.querySelector(`.semester${semester}-subjects-container`);
    if (existingInputs) {
        existingInputs.remove();
    }

    for (let i = 1; i <= numSubjects; i++) {
        const subjectDiv = document.createElement("div");
        subjectDiv.classList.add("subject-input");
        
        const subjectLabel = document.createElement("label");
        subjectLabel.innerText = `Subject ${i} - Grade (O/A+/A/B+/B/C/U/W):`;
        const subjectInput = document.createElement("input");
        subjectInput.type = "text";
        subjectInput.classList.add(`semester${semester}-subjects`);
        subjectInput.placeholder = "Enter Grade";
        subjectInput.required = true;

        const creditsLabel = document.createElement("label");
        creditsLabel.innerText = `Subject ${i} - Credits:`;
        const creditsInput = document.createElement("input");
        creditsInput.type = "number";
        creditsInput.classList.add(`semester${semester}-credits`);
        creditsInput.placeholder = "Enter Credits";
        creditsInput.required = true;

        subjectDiv.appendChild(subjectLabel);
        subjectDiv.appendChild(subjectInput);
        subjectDiv.appendChild(creditsLabel);
        subjectDiv.appendChild(creditsInput);

        subjectInputs.appendChild(subjectDiv);
    }

    container.appendChild(subjectInputs);
    
    // Ensure the generated inputs are visible
    subjectInputs.style.display = 'block'; // Ensure the container is not hidden
    subjectInputs.scrollIntoView({ behavior: "smooth" }); // Scroll into view after inputs are generated
}
