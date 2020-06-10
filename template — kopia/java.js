      
 const inFile = document.getElementById("customFile");
 customFile.addEventListener("change", function () {  
     const file = this.files[0];
 
     if (file) {
         const reader = new FileReader();
 
         reader.addEventListener("load", function () {

            color_picker(this.result);
      
         });
 
         reader.readAsDataURL(file);
      }    
 });


 function color_picker(base64) { // this jest naszym obrazkiem
    //przekazywane z gory zabrałem konstante
   
  
    // canvas może być const, nie zmieniacie ten element tylko jego propy  
    const canvas = document.getElementById("canvas");
  
    function getElementPosition(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        // w tym przypadku, i akurat w tym warto się zastanowić czy nie zwrócic dom~yslne wartosci, bo pózniej wam wywali się błąd
        return {   x: 0, y: 0 };  // w tym przypadku ustawilem wartosci domyslna 
    }
  
    function getEventLocation(element, event) {
        var pos = getElementPosition(element);
        // tu będzie błąd z undefined wartosciami o ktorym piśalem wam wyżej
        return {
            x: (event.pageX - pos.x),
            y: (event.pageY - pos.y)
        };
    }
  
    //funcja zamieniajaca rgb na hex
    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }
  
    function drawImageFromWebUrl(sourceurl) {
        var img = new Image();
  
        img.addEventListener("load", function () {
            // The image can be drawn from any source
            canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  
        });
  
        img.setAttribute("src", sourceurl);
    }
  
    drawImageFromWebUrl(base64);
  
    canvas.addEventListener("mousedown", function (e) {
        //wszystkie zmianne mogą być konstantami 
        const eventLocation = getEventLocation(this, e);
        // Get the data of the pixel according to the location generate by the getEventLocation function
        const context = this.getContext('2d');
        const pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; //
  
        const hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
        
        // Draw the color and coordinates.
        document.getElementById("color").style.backgroundColor = hex; 
        document.getElementById("status").innerHTML = hex;
        
        //zrobiłem tu funkcje żeby wam pokazać jak jeszcze się da wyswietlić kolory
        displayColors(pixelData);
    });
  
    function displayColors(pixelData) {
        //rownież tak można ten color wyswietlić 
        const rgb = "rgb(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + ")";
        document.getElementById("rgb-color").style.backgroundColor = rgb;
        document.getElementById("rgb-status").innerHTML = rgb;
  
        //ogoólnie wrzucanie elementów do DOMa nie jest łatwe, ale dla przykladu to może być zrobione tak na pale. W tym lepiej używać jakichoś templatek czy frameworków.
        // albo z odcieniami
        const colorContainer = document.querySelector("#colorContainer");
  
        //wyczyścić poprzedni kontent
        colorContainer.innerHTML = ""
  
        //tworze element do textu
        const label = document.querySelector(".color-item text-center my-2");
        //przypisuje text
        label.innerText = "Paleta kolorów"
        //dodaje do konteneru "autko"
  
        //jasność będzi`e si`e zmieniała o 10%, ale da się ustalić mniejszy krok. im mniejszy będzie krok tym plyniej będzie się zmieniał kolor slupka.
        const step = 0.1;
        //i jest większe od step bo przy i = 0 kolor będzie biały, dla tego wyswietlam wszystko oprócz białego
        for (let i = 1; i >= step; i = i - step) {
            console.log(i);
            const rgba = "rgba(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + "," + i +")";
            // tworzę element div
            const color = document.createElement("div");
            // prypisuję klasę styli
            color.className = "color-item text-center my-2";
            // nadałem kolor tla
            color.style.backgroundColor = rgba;
            // wkleilem jako dziecko elementa "autko"
            colorContainer.appendChild(color);
        }
    }
  
  }



const getBtn = document.getElementById('New_Data'); 

function getData(selectedColor){
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse( this.responseText);
            console.log(data);
            
            //albo w tym jquery done(getData(data, selectedColor));        
          } else {
              // warto wyswietlić jakiś komunikat użytkownikówi że pobranie danych nie powiodło si`e i że warto spróbować pózniej
           
          }
        };
        xhttp.open("GET", "https://paintpickerapi-dev.azurewebsites.net/colors", true);
        xhttp.setRequestHeader("token", "9bc4e1bf91a34752adaa52ba6b322a36");
        xhttp.send();
}
getBtn.addEventListener('click', getData);

//
    