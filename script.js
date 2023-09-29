let advisorCount = 1;

function addAdvisorField() {
    const advisorsDiv = document.getElementById('advisorsDiv');

    const labelFirstName = document.createElement('label');
    labelFirstName.setAttribute('for', `recipientFirstName${advisorCount}`);
    labelFirstName.textContent = "Recipient's First Name:";

    const inputFirstName = document.createElement('input');
    inputFirstName.type = 'text';
    inputFirstName.id = `recipientFirstName${advisorCount}`;
    inputFirstName.className = 'recipientFirstName';
    inputFirstName.required = true;

    const labelLastName = document.createElement('label');
    labelLastName.setAttribute('for', `recipientLastName${advisorCount}`);
    labelLastName.textContent = "Recipient's Last Name:";

    const inputLastName = document.createElement('input');
    inputLastName.type = 'text';
    inputLastName.id = `recipientLastName${advisorCount}`;
    inputLastName.className = 'recipientLastName';
    inputLastName.required = true;

    advisorsDiv.appendChild(labelFirstName);
    advisorsDiv.appendChild(inputFirstName);
    advisorsDiv.appendChild(labelLastName);
    advisorsDiv.appendChild(inputLastName);
    advisorsDiv.appendChild(document.createElement('br'));
    advisorsDiv.appendChild(document.createElement('br'));

    advisorCount++;
}

document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission behavior

    const schoolName = document.getElementById('schoolName').value;
    const department = document.getElementById('department').value;
    const prefix = document.getElementById('prefix').value;
    
    const recipientFirstNames = Array.from(document.getElementsByClassName('recipientFirstName')).map(input => input.value);
    const recipientLastNames = Array.from(document.getElementsByClassName('recipientLastName')).map(input => input.value);
    const emails = [];

    for (let i = 0; i < recipientFirstNames.length; i++) {
        const emailSubject = `Inquiry about Transfer Process to ${schoolName} ${department}`;
        const emailBody = `Hello ${prefix}. ${recipientLastNames[i]},

My name is George Ulloa. I am currently enrolled in a nursing program at a SUNY institution and am keenly interested in exploring ${schoolName}’s Nursing Program.

I am writing to inquire if I might have the opportunity to discuss a few specific questions I have regarding the program, particularly in the context of transfer students. I'm considering a transfer to better align with my educational and professional aspirations and I am eager to understand the transfer process at your esteemed institution.

Would it be possible to arrange a Zoom call or a phone conversation at a time that is convenient for you? It would really assist me in understanding the application process and any specific requirements in greater detail. Should you need any additional information or documentation from me, please don't hesitate to let me know. Happy to help in any way I can. 

Thank you for your time reading this email. Have a great day.

Best,
George Ulloa`;

        emails.push(emailSubject + "\n\n" + emailBody);
    }

    const emailContent = emails.join("\n\n-------------------------\n\n");  // Separate each email with a divider
    const blob = new Blob([emailContent], { type: 'text/plain' });
    const downloadLink = document.getElementById('downloadLink');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${schoolName}_email.txt`;
    downloadLink.style.display = 'block';

    // Create a formatted email for PDF export
    const formattedEmails = emails.map(email => {
        const splitEmail = email.split("\n\n");
        return `<h4>${splitEmail[0]}</h4><p>${splitEmail[1].replace(/\n/g, '<br/>')}</p>`;
    });

    const formattedContent = formattedEmails.join("<hr/>");

    // Create a hidden div to store the formatted content
    const hiddenDiv = document.createElement("div");
    hiddenDiv.id = "pdfContent";
    hiddenDiv.style.display = "none";
    hiddenDiv.innerHTML = formattedContent;
    document.body.appendChild(hiddenDiv);

    document.getElementById('pdfExportButton').style.display = 'block';
});

function exportAsPDF() {
    const element = document.getElementById('pdfContent');
    const opt = {
        margin: 10,
        filename: 'email.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).outputPdf().then(function(pdf) {
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'email.pdf';
        link.click();
    });
}
