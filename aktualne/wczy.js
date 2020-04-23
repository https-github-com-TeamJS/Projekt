      
    
       const inFile = document.getElementById("inpFile");
       
       const previewContainer = document.getElementById("imagePreview");
       
       const previewImage = previewContainer.querySelector(".image-preview__image");
       
       const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

       
    
       


       inpFile.addEventListener("change", function(){  //addEventListener metoda rejestruje "obserwatora" do okreslnego typu zdarzenia
                                                      
           const file = this.files[0];
           
           if (file) {
               const reader = new FileReader();
               
               reader.addEventListener("load", function() {
               console.log(this); 
               
               previewImage.setAttribute("src", this.result); //setAttribute dodaje nowy lub zmienia wartość atrybutu w bieżącym elemencie.

                
               previewImage.addEventListener("load", color_picker)
            
            
           });
           
               
               reader.readAsDataURL(file);
           }

           
           else {
               previewDefaultText.style.display = null;
               previewImage.style.display = null;
               previewImage.setAttribute("src", "");
           }
        
       });

