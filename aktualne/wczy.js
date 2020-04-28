const inFile = document.getElementById("inpFile");
//moim zdaniem dwie następne linije są zbędne
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");

// elementa image-preview__default-text chyba nie jest na widoku, i nie widzę że coś z nim robione, chyba jest zbędny
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

inpFile.addEventListener("change", function () {  //addEventListener metoda rejestruje "obserwatora" do okreslnego typu zdarzenia
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // console.log ma być usunienty przed tym ja wbijacie kod
            console.log(this);
            
            // moim zdaniem nie potrzbnie używacie prewiew image. Wyglada na to że jest używane tylko po to żeby przekazać base64 do funkcji żęby pózniej wypelnić canvas. 
            //To dla czego nie przekazać base64 orazy do funkcji.
            //color_picker(this.result);

            previewImage.setAttribute("src", this.result); //setAttribute dodaje nowy lub zmienia wartość atrybutu w bieżącym elemencie.
            previewImage.addEventListener("load", color_picker); // srednik zapomnialiście
        });

        reader.readAsDataURL(file);
     } 
     // to też nie jest potrzebne, caly else, chyba że chcecie pokażać na początku użytkownikowi żeby wybrał plik, ale jak pliku nie wybrał to nić się nie musi dzałać
     // oczywiszcze jak usuniecie previewImage którego tak naprawdę nie potrzebujecie
     else {
        previewDefaultText.style.display = null; // ta linija też jest zbędna
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");
    }
});

