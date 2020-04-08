
        //to tak nie zadziała, bo jest nie wiadomo co jest this.result
        const proba = this.result;
        const inFile = document.getElementById("inpFile");
        
        const previewContainer = document.getElementById("imagePreview");
        
        const previewImage = previewContainer.querySelector(".image-preview__image");
        
        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
        // to jest zbędne i problem jest taki że używacie tu const co jest konstantą a nie zmianną i da się jej jeden raz przepisać i nie da się nadpisać.
        const obrazek=proba;

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
        previewImage.addEventListener("click", function(){
            // w tym kontekscie this jest waszym obrazkiem previewImage
            const base64 = this.getAttribute("src");
            if (base64){
                console.log(base64);
                // cos tu zrobić z tym base64
            }
        })
        
        
        inpFile.addEventListener("change", function(){  //addEventListener metoda rejestruje "obserwatora" do okreslnego typu zdarzenia
                                                        // Listener 
            const file = this.files[0];
            
            if (file) {
                const reader = new FileReader();

                
                previewDefaultText.style.display = "none";
                previewImage.style.display = "block";
                
                reader.addEventListener("load", function() {
                console.log(this); 
                
                previewImage.setAttribute("src", this.result); //tutaj przypisac ,setAttribute dodaje nowy lub zmienia wartość atrybutu w bieżącym elemencie.
            
                // to jest deklaracja zmianej wewnątrz tego if-a, ale konstanta będzie dostępna w calej funkcji, i nie będzie dostępna poza nią (nie jest tu potrzebne)
                const proba = this.result;
                //eventy (wydarzenia)  nie zwracają wartosci dla tego lepiej stąd wywolać inne wydarzenie, czy funkcię patrzcie funkcję getcolor
                return proba;
                let color = getColor(this.result);
               
                });
                // tu do html probujecie dopisać wartość proba, co nie jest wam potrzebe, chyba żeby zobaczyć co się dzieje, ale po to macie console.log() i to się pojawi na konsoli (F12 -> zakladka Console)
                document.write(proba);

                reader.readAsDataURL(file);
            }
            else {
                previewDefaultText.style.display = null;
                previewImage.style.display = null;
                previewImage.setAttribute("src", "");
            }
        });

        // const base64 = previewImage.getAttribute("src");
        //console.log(base64);

       console.log(obrazek);

       // to samo macie na samej górze, ale zadeklarowane jako konstanta, nie ma sensu jeszcze raż to deklarować
       //var albo w nowszych wersjach let - do zmiannych, const do konstant, w js to zmienne które się nie zmienią
        var canvas = document.getElementById("inpFile");

function getColor(base64){
    //tu coś możecie zrobić z tym base 64
}

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