
        
        const inFile = document.getElementById("inpFile");
        
        const previewContainer = document.getElementById("imagePreview");
        
        const previewImage = previewContainer.querySelector(".image-preview__image");
        
        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
        
        
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