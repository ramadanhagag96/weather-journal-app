/* Global Variables */
const apiKey = "&appid=18b745bec5cda7ff912d6b67432b1acc";
const zip= document.getElementById('zip');
const feelings = document.getElementById('feelings');


// Create a new date instance dynamically with JS
const d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
           //add eventlistner to button generate 
document.getElementById('generate').addEventListener('click', Xgenerate);

function Xgenerate(){
    let Burl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    const data = {zipvalue:zip.value, content:feelings.value , date:newDate };
     //get weather openweathermap
getweather(Burl,zip.value, apiKey).then(function(data){
    
     //post data to server
posttoserver(data).then(
      //update UI
    updateUI()
    )
});

      //get weather from openweathermap
async function getweather(Burl, value, Key){
    
  
  const res = await fetch(Burl+value+Key)
  try {

      const data1 = await res.json();
      data.temp=data1.main.temp;
      console.log("getting weather from openweathermap seccussfully");
      return data;
    
  }  catch(error) {
    console.log("error", error);
    
  }
    
}
      // post data to server
async function posttoserver(data){
     const response = await fetch(`http://localhost:3030/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
     try { 
         
          const newData = await response.json();
          console.log("data post to server seccussfully");
          return newData;
  }
  catch (error) {
    console.log(error);
  }
}
    // update UI
async function updateUI(){
     const request = await fetch('http://localhost:3030/all');
  try{
      
      const all = await request.json();
         //update entry values
      document.getElementById('date').innerHTML = 'data is :'+all.date;
      document.getElementById('temp').innerHTML = 'temperature is :'+all.temp;
      document.getElementById('content').innerHTML = 'your feelings is :'+all.content;
      console.log("UI updated seccussfully");
      

  }catch(error){
    console.log("error", error);
  }
}

}
    
