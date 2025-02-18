const ui = {
    form: document.querySelector('.calculator'),
    tips: document.querySelector('.tips'),
    tipAmount: document.querySelector('.tip-amount'),
    tipPerGuest: document.querySelector('.tip-guest'),
    totalPerGuest: document.querySelector('.total')
};


function initApp() {
    
    ui.form.addEventListener('submit', onFormSubmit)
    ui.form.addEventListener('reset', onFormReset);
    document.addEventListener('DOMContentLoaded', onFormReset);
}

function onFormSubmit(e) {
    e.preventDefault()

    //user inputs 

    const billAmount = parseFloat(ui.form.billAmount.value);

    const guestCount = parseInt(ui.form.guestCount.value);


    //validate
    if (!billAmount) {
        alert('Please provide a valid bill amount. ');
        return;
    }


    //calculate
 const tipAmount = calculateTip(billAmount);
 const tipPerGuest = tipAmount / guestCount;
 const totalPerGuest = (billAmount + tipAmount) / guestCount;

   displayResult(tipAmount, tipPerGuest, totalPerGuest)
}

function onFormReset(){
    displayResult(0, 0, 0);
}


function displayResult(tipAmount, tipPerGuest, totalPerGuest){
    ui.tipAmount.textContent = formatNumber(tipAmount);
    ui.tipPerGuest.textContent = formatNumber(tipPerGuest);
    ui.totalPerGuest.textContent = formatNumber(totalPerGuest);
}


function calculateTip(billAmount){


    const selectedTip = ui.tips.querySelector('input:checked');

    if (selectedTip.id === 'custom')  {
        return parseInt(ui.form.customTip.value);
    }

    return (billAmount* parseInt(selectedTip.value)) /100;

}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number);
}

initApp();