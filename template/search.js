function processData(data, selectedColor){
    
    data = filterData(selectedColor, data, 5000); // 0,8%
    dispayData(data);
    

}

function filterData(selectedColor, data, distance){
    let result = new Array(); 
    for (let color of data){
        if (colorEquals(selectedColor, color.hex, distance)){
            result.push(color);
            
          
        }
    }

    return result;
}

function colorEquals(selectedColor, color, distance){

    let rgbSelecterColor = toRgb(selectedColor);
    let rgbColor = toRgb(color);

    function toRgb(value) {
        if (value.indexOf("rgb") >= 0) {
            if (value.indexOf('(') != value.lastIndexOf(')')) {
                let spectres = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')')).split(',');
                if (spectres.length > 0)
                    return {
                        r: parseInt(spectres[0].trim()),
                        g: parseInt(spectres[1].trim()),
                        b: parseInt(spectres[2].trim())
                    }
            }
        } else {
            let bigint = parseInt(value.replace('#', ''), 16);

            return {
                r: (bigint >> 16) & 0xFF,
                g: (bigint >> 8) & 0xFF,
                b: bigint & 0xFF
            }
        }
    }

    let cR=rgbColor.r-rgbSelecterColor.r;
    let cG=rgbColor.g-rgbSelecterColor.g;
    let cB=rgbColor.b-rgbSelecterColor.b;
    let uR=rgbColor.r+rgbSelecterColor.r;

    

        //console.log(rgbColor);
    let colorDistance=(cR*cR*(2+uR/256) + cG*cG*4 + cB*cB*(2+(255-uR)/256));
   
    
    return colorDistance <= distance;  
   
}



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

    function dispayData(data){
        // tu ma być algorytm do wyswiętlania danych
        //pobrać kontener gdzie będą dodawane danę <div class="row">, nadajcie mu jakiś id
        for (let color of data)
        {
        
        
        console.log(data);

        

           for (let i = 1; i >= 10; i++) {
           
            document.createElement("div"); // tworzę element div
            color.className = "color-item text-center my-2"; // przypisanie klasy styli

            document.createElement("div");
            color.className = "hexagon";
            color.style.backgroundColor;// nadanie koloru tla

            document.createElement("label");
            color.className = "lead text-muted";
            
            
        }
            // tu będziecie mieli już kolor pojedynczy z tablicy kolorów wyfiltowanych
          
        }
    }
  
      