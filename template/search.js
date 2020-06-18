function processData(data, selectedColor){
    data = filterData(selectedColor, data); // musi być dodany dystans do róznicy kolorów, liczba czy % to już jak tam algorytm zaimplementujecie
    displayData(data);
}

function filterData(selectedColor, data, distance){
    let result = new Array(); 
    for (let color of data){
        if (colorEquals(selectedColor, color, distance)){
            result.push(color);
        }
    }
    return result;
}

function colorEquals(selectedColor, color, distance){

    let rgbSelecterColor = hexToRgb(selectedColor);
    let rgbColor = hexToRgb(color.hex);
    
    
    function hexToRgb(hex) {
         let bigint = parseInt(hex.replace('#', ''), 16);
        
        return{

            r: (bigint >> 16) & 0xFF,
            g: (bigint >> 8) & 0xFF,  
            b: bigint & 0xFF,

        }
    }
    


    cR=rgbColor.r-rgbSelecterColor.r
    cG=rgbColor.g-rgbSelecterColor.g
    cB=rgbColor.b-rgbSelecterColor.b
    uR=rgbColor.r+rgbSelecterColor.r 


    
    distance=cR*cR*(2+uR/256) + cG*cG*4 + cB*cB*(2+(255-uR)/256)
    
 
    
    // tu algorytm do sprawdzenia koloru, gdzie selectedColor jest kolor wybrany przez użytkownika, a color - kolor z tablicy danych, distance dopuszczalna róznica
    // oczywiszcze operujecie na hexach dlatego nie podaje tu typy, no i return jest pod względem porówmania objektów, wlaśnie musicie to zmienić
    return selectedColor <= color + distance;
    
}

function dispayData(data){

    // tu ma być algorytm do wyswiętlania danych
    //pobrać kontener gdzie będą dodawane danę <div class="row">, nadajcie mu jakiś id
    for (let color of data){
        
       // tu będziecie mieli już kolor pojedynczy z tablicy kolorów wyfiltowanych
      
    }
}



/////////////////////////////////////////////////
function getData(selectedColor){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse( this.responseText);
            processData(data, selectedColor);
            //albo w tym jquery done(getData(data, selectedColor));        
          } else {
              // warto wyswietlić jakiś komunikat użytkownikówi że pobranie danych nie powiodło si`e i że warto spróbować pózniej
          }
        };
        xhttp.open("GET", "https://paintpickerapi-dev.azurewebsites.net/colors", true);
        xhttp.setRequestHeader("token", "9bc4e1bf91a34752adaa52ba6b322a36");
        xhttp.send();
}
   ///....
   //pobrac w odpowoiednim miejscu
    let lookforPaintBtn = document.querySelector("#search");
    lookforPaintBtn.addEventListener("click", function (e) {
        let selectedColor = document.querySelector("#selectedColor").style.backgroundColor;
             getData(selectedColor);
             
             console.log(selectedColor);

            
    }); 




 