let checkbox1 = document.getElementById("checkbox1");
let checkbox2 = document.getElementById("checkbox2");
let input1 = document.getElementById("phone-number-1");
let input2 = document.getElementById("email-1");
let input3 = document.getElementById("id_card-1");
let input4 = document.getElementById("phone-number-2");
let input5 = document.getElementById("email-2");
let input6 = document.getElementById("id_card-2");

function checked1() {
    if (checkbox1.checked) {
        input1.style.display = "none";
        input2.style.display = "none";
        input3.style.display = "none";
    } else {
        input1.style.display = "block";
        input2.style.display = "block";
        input3.style.display = "block";
    }
}
checked1();

checkbox1.addEventListener("change", function () {
    if (checkbox1.checked) {
        input1.style.display = "none";
        input2.style.display = "none";
        input3.style.display = "none";
    } else {
        input1.style.display = "block";
        input2.style.display = "block";
        input3.style.display = "block";
    }
});
checkbox2.addEventListener("change", function () {
    if (checkbox2.checked) {
        input4.style.display = "none";
        input5.style.display = "none";
        input6.style.display = "none";
    } else {
        input4.style.display = "block";
        input5.style.display = "block";
        input6.style.display = "block";
    }
});
var checkTypeTicket = document.getElementById("type-ticket");
console.log(checkTypeTicket.innerHTML);
var checkOption= document.getElementById("infor-ticket-2");

function change(){
    if (checkTypeTicket.innerHTML=="Một chiều"){
        checkOption.style.display="none";
    }
    else{
        checkOption.style.display="block";
    }
}
change();
