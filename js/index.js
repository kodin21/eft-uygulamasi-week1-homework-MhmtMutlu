// import { accounts } from "./example-other-file"

const accounts = [
    {
        iban: 'TR11 0000 1111 0000',
        balance: 100,
    },
    {
        iban: 'TR11 0000 1111 0001',
        balance: 5040,
    },
    {
        iban: 'TR11 0000 1111 1001',
        balance: 10594,
    }
];

let accountsDOM = document.querySelector(".accounts")
let inputMoneyDOM = document.querySelector("#money-input")
let alertLabelDOM = document.querySelector(".alert-label")
let inputReceiverDOM = document.querySelector(".receiver-account")
let sendButtonDOM = document.querySelector(".send-button")
let timerCountdownDOM = document.querySelector(".timer-countdown")

accounts.forEach((acc, index) => {accountsDOM.innerHTML += `
    <div id=${index} class="card">
        <h2>Account</h2>
        <p>${acc.iban}</p>
        <h3>Cash Amount</h3>
        <p>${acc.balance} $</p>
        <button id=${index} class="select-buttons">Select</button>
    </div>
`})

window.onload = function() {
    var minute = 1;
    var sec = 59;
    setInterval(function() {
        timerCountdownDOM.innerHTML = "0" + minute + " : " + sec;
        sec--;
        if (sec < 10) {
            sec = "0" + sec
        }
        if (sec == 0) {
            if (minute == 0 && sec == 0) {
                window.location.reload()
            }
            minute--;
            sec = 60;
        }
    }, 1000);
}

let selectCardsDOM = document.querySelectorAll(".card")
let selectButtonsDOM = document.querySelectorAll(".select-buttons")
let selectedButtons = []
selectButtonsDOM.forEach(btn => btn.addEventListener("click", (e) => {
    selectCardsDOM[e.target.id].classList = "selected-card"
    selectedButtons.push(e.target.id)
    let lastSelection = selectedButtons[selectedButtons.length - 1]
    let previousSelection = selectedButtons[selectedButtons.length - 2]
    if(lastSelection !== previousSelection) {
        selectCardsDOM[previousSelection].classList = ""
    }
}))

let ibanRegex = /^TR\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}|TR\d{14}$/
inputReceiverDOM.addEventListener("input", (e) => {
    if(!ibanRegex.test(e.target.value)) {
        inputMoneyDOM.disabled = true
    } else {
        inputMoneyDOM.disabled = false
    }
})

inputMoneyDOM.addEventListener("input", (e) => {
    let selectedBankAccount = selectCardsDOM[selectedButtons[selectedButtons.length - 1]].id
    if (e.target.value) {
        selectButtonsDOM.forEach(btn => btn.classList = "disable-button")
    } else {
        selectButtonsDOM.forEach(btn => btn.classList = "")
    }
    if(e.target.value > accounts[selectedBankAccount].balance) {
        alertLabelDOM.innerText = "You have not enough money!"
        sendButtonDOM.classList = "disable-button"
    } else {
        alertLabelDOM.innerText = ""
        sendButtonDOM.classList = ""
    }
})

sendButtonDOM.addEventListener("click", (e) => {
    if(inputMoneyDOM.value <= 500) {
        alertify.success('Money was send successfully!');
    } else {
        alertify.prompt("You should enter the code which was sended to your phone", "",
        function(evt, value ){
            if(value === "1234") {
                alertify.success('Code was correct. Money was send successfully!');
            } else {
                alertify.error('Code was not correct. Operation is cancelled!');
            }
        },
        function(){
            alertify.error('Operation is cancelled!');
        })
    }
})