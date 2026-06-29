const base_URL="https://v6.exchangerate-api.com/v6/011234df70ec82aed1627aba/latest";
const dropdowns =document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
    for(let currencyCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currencyCode;
        newOption.value=currencyCode;
        if(select.name === "from" && currencyCode === "TRY"){
            newOption.selected = "selected";
        }if(select.name ==="to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }//using this for-in loop we can add all the option in the selectelement using newoption .
    //when the select change then some event occurs using eventListener
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);  //when the select changes evt object is targeted by calling updateFlag. evt.target means when we change something then where we have changed is passed to the updateFlag.
    })
}
//update flag when the country is changed
const updateFlag=(element)=>{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img"); // the element is select element so to access the img tag the parentElement attribute is used.
    img.src = newsrc;    
}
// now if i want to change the rate from one country to another by clicking the get exchange rate button.

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault(); //when the form is submited then it has default behaviour that the page is refreshing and in address bar some info is updated ,SO TO PREVENT THIS we use preventDefault.
    let amount = document.querySelector(".amount input")
    let amountVal = amount.value;
    console.log(amountVal);
    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";mm
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL = `${base_URL}/${fromCurr.value}`;
    let response = await fetch(URL);// this send a request to api and wait for response.
    let data = await response.json(); // convert the responce to js object.
    const rate=data.conversion_rates[toCurr.value]; // to convert the from_data to the to_data the property used is conversion_rates 
    const finalAmount= amountVal * rate; //ex : amountVal= 130 ,rate = 83.12 (1 USD = 83.12 INR) 130 * 83.12
    console.log(finalAmount); 

    // to retrive the msg on the page
    const msg = document.querySelector(".msg");
    msg.innerText= `${amountVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`; 
    // .toFixed(2) => means to limit the no of decimal after point & it also convert the number into the string with exacty 2 digit after the decimal point. 
});


