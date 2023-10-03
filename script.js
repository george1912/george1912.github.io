let schoolCount = 1;

function addSchoolField() {
    const schoolDiv = document.getElementById('schoolDiv');
    const schoolFields = document.createElement('div');
    schoolFields.className = "schoolFields";

    const labelSchoolName = document.createElement('label');
    labelSchoolName.setAttribute('for', `schoolName${schoolCount}`);
    labelSchoolName.textContent = "College/School Name:";
    const inputSchoolName = document.createElement('input');
    inputSchoolName.type = 'text';
    inputSchoolName.id = `schoolName${schoolCount}`;
    inputSchoolName.className = 'schoolName';
    inputSchoolName.required = true;

    const labelDepartment = document.createElement('label');
    labelDepartment.setAttribute('for', `department${schoolCount}`);
    labelDepartment.textContent = "Department Name:";
    const inputDepartment = document.createElement('input');
    inputDepartment.type = 'text';
    inputDepartment.id = `department${schoolCount}`;
    inputDepartment.className = 'department';
    inputDepartment.required = true;

    const labelPrefix = document.createElement('label');
    labelPrefix.setAttribute('for', `prefix${schoolCount}`);
    labelPrefix.textContent = "Choose a prefix:";
    const selectPrefix = document.createElement('select');
    selectPrefix.id = `prefix${schoolCount}`;
    selectPrefix.className = 'prefix';
    selectPrefix.innerHTML = `
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Other">Other</option>
    `;

    const labelToEmail = document.createElement('label');
    labelToEmail.setAttribute('for', `toEmail${schoolCount}`);
    labelToEmail.textContent = "To Email:";
    const inputToEmail = document.createElement('input');
    inputToEmail.type = 'text';
    inputToEmail.id = `toEmail${schoolCount}`;
    inputToEmail.className = 'toEmail';
    inputToEmail.required = true;

    // Recipient's First Name
    const labelFirstName = document.createElement('label');
    labelFirstName.setAttribute('for', `recipientFirstName${schoolCount}`);
    labelFirstName.textContent = "Recipient's First Name:";
    const inputFirstName = document.createElement('input');
    inputFirstName.type = 'text';
    inputFirstName.id = `recipientFirstName${schoolCount}`;
    inputFirstName.className = 'recipientFirstName';
    inputFirstName.required = true;

    // Recipient's Last Name
    const labelLastName = document.createElement('label');
    labelLastName.setAttribute('for', `recipientLastName${schoolCount}`);
    labelLastName.textContent = "Recipient's Last Name:";
    const inputLastName = document.createElement('input');
    inputLastName.type = 'text';
    inputLastName.id = `recipientLastName${schoolCount}`;
    inputLastName.className = 'recipientLastName';
    inputLastName.required = true;

    schoolFields.appendChild(labelSchoolName);
    schoolFields.appendChild(inputSchoolName);
    schoolFields.appendChild(labelDepartment);
    schoolFields.appendChild(inputDepartment);
    schoolFields.appendChild(labelPrefix);
    schoolFields.appendChild(selectPrefix);
    schoolFields.appendChild(labelToEmail);
    schoolFields.appendChild(inputToEmail);
    schoolFields.appendChild(labelFirstName);
    schoolFields.appendChild(inputFirstName);
    schoolFields.appendChild(labelLastName);
    schoolFields.appendChild(inputLastName);

    schoolDiv.appendChild(schoolFields);

    schoolCount++;
}

document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fromName = document.getElementById('fromName').value;
    const fromEmail = document.getElementById('fromEmail').value;

    const downloadLinksDiv = document.getElementById('downloadLinks');
    while (downloadLinksDiv.firstChild) {
        downloadLinksDiv.removeChild(downloadLinksDiv.firstChild);
    }

    const schools = document.getElementsByClassName('schoolFields');
    for (let school of schools) {
        const schoolName = school.querySelector('.schoolName').value;
        const department = school.querySelector('.department').value;
        const prefix = school.querySelector('.prefix').value;
        const toEmail = school.querySelector('.toEmail').value;
        const recipientFirstName = school.querySelector('.recipientFirstName').value;
        const recipientLastName = school.querySelector('.recipientLastName').value;

        const emailSubject = `Inquiry about Transfer Process to ${schoolName} ${department}`;
        const emailBody = `
Hello ${prefix} ${recipientLastName},

My name is George Ulloa. I am currently enrolled in a nursing program at a SUNY institution and am interested in exploring ${schoolName}’s Nursing Program.

I am writing to inquire if I might have the opportunity to discuss a few specific questions I have regarding the program, particularly in the context of transfer students. I'm considering a transfer to better align with my educational and professional aspirations and I am eager to understand the transfer process at your esteemed institution.

Would it be possible to arrange a Zoom call or a phone conversation at a time that is convenient for you? It would really assist me in understanding the application process and make sure I am following the correct procedure. If you need any additional information or documentation from me, please don't hesitate to let me know.

Happy to help in any way I can.

Thank you for your time reading this email and have a great day.

Best,
George Ulloa`;

        const emlContent = `
From: "${fromName}" <${fromEmail}>
To: ${toEmail}
Subject: ${emailSubject}
MIME-Version: 1.0
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: 7bit

${emailBody}`;

        generateDownloadLinks(`${schoolName}.txt`, emailBody);
        generateDownloadLinks(`${schoolName}.eml`, emlContent);
    }
});

function generateDownloadLinks(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.innerHTML = `Download ${filename}`;

    const downloadLinksDiv = document.getElementById('downloadLinks');
    downloadLinksDiv.appendChild(downloadLink);
    downloadLinksDiv.appendChild(document.createElement('br'));
}

function clearAll() {
    const schoolDiv = document.getElementById('schoolDiv');
    while (schoolDiv.firstChild) {
        schoolDiv.removeChild(schoolDiv.firstChild);
    }
    const downloadLinksDiv = document.getElementById('downloadLinks');
    while (downloadLinksDiv.firstChild) {
        downloadLinksDiv.removeChild(downloadLinksDiv.firstChild);
    }
    schoolCount = 1;
    addSchoolField();
}

addSchoolField();
