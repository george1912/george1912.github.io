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

I am writing to inquire if I might have the opportunity to discuss a few specific questions I have regarding the program, particularly in the context of transfer students. I'm considering a
