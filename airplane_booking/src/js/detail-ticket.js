var checkTypeTicket = document.getElementById("type-ticket");
var checkOption = document.getElementById("infor-ticket-2");

function change() {
    if (checkTypeTicket.innerHTML== "Một chiều") {
        checkOption.style.display = "none";
    } else {
        checkOption.style.display = "block";
    }
}
change();
