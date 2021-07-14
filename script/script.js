'use-strict';
//const selectors
const screenContainer=document.querySelector('.screen-container');
const movieSelect=document.getElementById("movie-name");
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

//change selectors
let ticketPrice=+movieSelect.value;
let count=document.getElementById('count');
let totalMoney=document.getElementById('money');


//populateUI();
//funtion
//updateselected seat
const updateSelected=function() {
  const selectedSeat=document.querySelectorAll('.row .seat.selected');
  if(movieSelect.value!=="0"){
  const seatIndex =[...selectedSeat].map((seat) => {
    return [...seats].indexOf(seat);
  })
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
  const allSelectedSeat=selectedSeat.length;
  count.innerText=allSelectedSeat;
  totalMoney.innerText=ticketPrice * allSelectedSeat;
}else if(movieSelect.value=="0"){
  count.innerText=0;
  totalMoney.innerText=0;
 // [...selectedSeat].map((seat)=>{
  //  seat.classList.remove('selected')
 // })

}
}

//store movie price and index
const storeMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem('selectedMoviePrice', moviePrice);
  localStorage.setItem('selectedMovieIndex', movieIndex);
};

//populate UI
 function populateUI(){
  const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
  const moviePrice=localStorage.getItem('selectedMoviePrice')

  if(selectedSeats!=="" && selectedSeats.length>0){
   seats.forEach((seat,index) => {
    if (selectedSeats.indexOf(index) > -1) {
      seat.classList.add('selected');
      movieSelect.value=moviePrice;
      ticketPrice=+movieSelect.value;
      totalMoney.innerText=ticketPrice * selectedSeats.length;
      count.innerText=selectedSeats.length;
    }
   })
  }
}

//events
//seat select event
screenContainer.addEventListener('click',(e)=>{
  if(movieSelect.value!="0"){
  if(e.target.classList.contains('seat') && !e.target.classList.contains('filled')){
    e.target.classList.toggle('selected');
    updateSelected();
  }}
  else {
   alert('Please Select Movie!');
   
  }
 
})
//ticket price change event
movieSelect.addEventListener('change',(e)=>{
  ticketPrice=+e.target.value;
  [...seats].map((seat)=>{
    seat.classList.remove('selected');
  })
  storeMovieData(e.target.selectedIndex,e.target.value);
  updateSelected();

})

populateUI()