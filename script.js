function checkPassword() {
    var input = document.getElementById("passwordInput").value;
    if(input == "condor") {
        document.getElementById("contentSection").style.display = "block";
        document.getElementById("passwordSection").style.display = "none";
    } else {
        alert("Incorrect password. Please try again.");
    }
}
