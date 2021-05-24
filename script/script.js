'use-strict';
//const selectors
const screenContainer=document.querySelector('.screen-container');
const movieSelect=document.querySelector('#movie-name');

//change selectors
let ticketPrice=+movieSelect.value;
let count=document.getElementById('count');
let totalMoney=document.getElementById('money');

//funtion
//updateselected seat
const updateSelected=function() {
  const selectedSeat=document.querySelectorAll('.row .seat.selected');
  const allSelectedSeat=selectedSeat.length;
  count.innerText=allSelectedSeat;
  totalMoney.innerText=ticketPrice * allSelectedSeat;
}
//events
//seat select event
screenContainer.addEventListener('click',(e)=>{
  if(movieSelect.value !=" "){
  if(e.target.classList.contains('seat') && !e.target.classList.contains('filled')){
    e.target.classList.toggle('selected');
    updateSelected();
  }}
  else{
   alert('Please Select Movie!');

  }
 
})
//ticket price change event
movieSelect.addEventListener('change',(e)=>{
  ticketPrice=+e.target.value;
  updateSelected();
})
