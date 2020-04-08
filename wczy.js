
        
        const inFile = document.getElementById("inpFile");
        
        const previewContainer = document.getElementById("imagePreview");
        
        const previewImage = previewContainer.querySelector(".image-preview__image");
        
        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
        
        //Prede wszystkim macie zmianą inFile, ale event change jest podpinany pod inpFile, kt~ora nie jest zadeklarowana. Moim zdaniem musicie miec event podpięty pod inFile.
        //wyslałem wam linka odnośnie scope w javascript, w tym przypadku finkcja addEventListener jest osobnym skopem, scope gdzie jesr zadeklarowanna zmianna inFile jest tak zwany global scope
        //i tu możecoe dodać (zadeklarować) jeszcze jedną zmianna a (przeż "let a") i przepisać do niej wartość wewnątrz funkcji.
        // no i eventualnie użyć jej pózniej, ale prosze pamentać, że wartość (ta co w środku funkcji) może byv nie przypisana jeżeli event nie nastąmpi, i zmiana będie miala wartosc undefined
        //dlatego musicie sprawdzić czy zmiana ma przepisaną wartość
        //let a;
        //inFile.addEventListener("change", function(){
        // a = "jakas wartość"; 
        //}
        //...
        // if (a) { // jeżeli a ma wartość (ty wchodzą w gre tak zwane trusness & falseness), chyli jest sprawdzane czy a ma jakaś wartość odmianą od false, 0, null, undefined
        //     //a ma wartość robcie co jest potrzeble z tą wartościa
        //     console.log(a);
        // }

        inpFile.addEventListener("change", function(){ 
        
            const file = this.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                previewDefaultText.style.display = "none";
                previewImage.style.display = "block";
                
                reader.addEventListener("load", function() {
                    console.log(this);
                    previewImage.setAttribute("src", this.result);
                });
                
                reader.readAsDataURL(file);
            }
            else {
                previewDefaultText.style.display = null;
                previewImage.style.display = null;
                previewImage.setAttribute("src", "");
            }
            
        });
 

        var canvas = document.getElementById("inpFile");

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