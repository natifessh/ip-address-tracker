async function getApiKey() {
    let response = await fetch("https://ip-address-tracker-ziuj.onrender.com/get-api-key");
    let data = await response.json();
    return data.apiKey;
  }
//const { map } = require("leaflet")
var map = L.map('map')


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();


let ipAddress=document.querySelector(".ip-adress")
let timeZone=document.querySelector(".time-zone")
let iSpAddress=document.querySelector(".isp-adress")
let loc=document.querySelector(".location")
let inputSection=document.querySelector(".ip-input-section")
console.log(inputSection)


let h1=document.querySelector(".h1")
let btn=document.querySelector(".btn")


const getIspDetail=async function(){
    let apiKey=await getApiKey();
    let ispValue=inputSection.value.trim();
    console.log(ispValue)
    try{
        var data=await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${ispValue}`)
        if (!data.ok) throw new Error("Network response was not ok " + data.statusText);
        var response = await data.json();
       
    }catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      
    }
  
   console.log(response)
    map.setView([response.location.lat, response.location.lng], 13);
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([response.location.lat, response.location.lng]).addTo(map);
ipAddress.textContent=response.ip;
loc.textContent=response.location.region+","+response.location.city
iSpAddress.textContent=response.isp;
timeZone.textContent=response.location.timezone


}


btn.addEventListener("click",function(){
   
    console.log()
  
    getIspDetail()
    

   

   
    
  
})
