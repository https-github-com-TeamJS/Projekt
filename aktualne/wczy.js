       //to tak nie zadziała, bo jest nie wiadomo co jest this.result
       
       const inFile = document.getElementById("inpFile");
       
       const previewContainer = document.getElementById("imagePreview");
       
       const previewImage = previewContainer.querySelector(".image-preview__image");
       
       const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
    
       // to jest zbędne i problem jest taki że używacie tu const co jest konstantą a nie zmianną i da się jej jeden raz przepisać i nie da się nadpisać.
      

       
       //Prede wszystkim macie zmianą inFile, ale event change jest podpinany pod inpFile, która nie jest zadeklarowana. Moim zdaniem musicie miec event podpięty pod inFile.
       //wyslałem wam linka odnośnie scope w javascript, w tym przypadku finkcja addEventListener jest osobnym skopem, scope gdzie jest zadeklarowanna zmianna inFile jest tak zwany global scope
       //i tu możecoe dodać (zadeklarować) jeszcze jedną zmianna a (przeż "let a") i przepisać do niej wartość wewnątrz funkcji.
       // no i eventualnie użyć jej pózniej, ale prosze pamentać, że wartość (ta co w środku funkcji) może byv nie przypisana jeżeli event nie nastąmpi, i zmiana będie miala wartosc undefined
       //dlatego musicie sprawdzić czy zmiana ma przepisaną wartość
       // let a;
       // inFile.addEventListener("change", function(){
       // a = "jakas wartość"; 
       // }
       //...
       // if (a) { // jeżeli a ma wartość (ty wchodzą w gre tak zwane trusness & falseness), chyli jest sprawdzane czy a ma jakaś wartość odmianą od false, 0, null, undefined
       //     //a ma wartość robcie co jest potrzeble z tą wartościa
       //     console.log(a);
       // }

       // ale najlepiej, moim zdaniem, i ja bym tak to zrobiłem, we wlasciwym miejscu, jak dobrze rozumiem potrzebujecie z tej funkcji this.result (czyli obrazek), wyciągnąć base64 z obrazku.
       // i sprawdzić czy ma ustawianą wartość 
       // const base64 = previewImage.getAttribute("src");
       // if (base64){
       //     // cos tu zrobić
       // }
       // czyli jak macie zdarzenie że użytkownik na obrazku coś kliknie (używam obecnych zmiannych), czyli jak się kliknie na obrazku na konsoli się pojawi jego base64

       
           
      
    

       inpFile.addEventListener("change", function(){  //addEventListener metoda rejestruje "obserwatora" do okreslnego typu zdarzenia
                                                       // Listener 
           const file = this.files[0];
           
           if (file) {
               const reader = new FileReader();
               
               reader.addEventListener("load", function() {
               console.log(this); 
               
               previewImage.setAttribute("src", this.result); //tutaj przypisac ,setAttribute dodaje nowy lub zmienia wartość atrybutu w bieżącym elemencie.

                base64=this.result;
                
                

                previewImage.addEventListener("load", function (){
              // w tym kontekscie this jest waszym obrazkiem previewImage
              
                    const base64 = this.getAttribute("src");
                    if (base64){
                       
                     var canvas = document.getElementById("canvas");
         
                     function getElementPosition(obj) {
                         var curleft = 0, curtop = 0;
                         if (obj.offsetParent) {
                             do {
                                 curleft += obj.offsetLeft;
                                 curtop += obj.offsetTop;
                             } while (obj = obj.offsetParent);
                             return { x: curleft, y: curtop };
                         }
                         return undefined;
                     }
                     
                     function getEventLocation(element,event){
                             var pos = getElementPosition(element);
                         
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
                     
                     function drawImageFromWebUrl(sourceurl){
                           var img = new Image();
                     
                           img.addEventListener("load", function () {
                               // The image can be drawn from any source
                               canvas.getContext("2d").drawImage(img, 0, 0, img.width,    img.height, 0, 0, canvas.width, canvas.height);
                               
                           });
                     
                           img.setAttribute("src", sourceurl);
                     }
                    
                     drawImageFromWebUrl(base64);
                     
                     canvas.addEventListener("mousedown",function(e){
                        var eventLocation = getEventLocation(this,e);
                         // Get the data of the pixel according to the location generate by the getEventLocation function
                         var context = this.getContext('2d');
                         var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 

                         var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
                         
                         // Draw the color and coordinates.
                         document.getElementById("color").style.backgroundColor = hex;
                         document.getElementById("status").innerHTML = hex;

                        var cos = hex; //ssssssssssssssssssssssssssssssssssssssssssssssssssssss 
                        
                     },false);
                    }
                })
                
                
               });
               
               
               reader.readAsDataURL(file);
           }

           
           else {
               previewDefaultText.style.display = null;
               previewImage.style.display = null;
               previewImage.setAttribute("src", "");
           }
        
       });

