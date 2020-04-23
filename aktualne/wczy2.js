function color_picker(){ // this jest naszym obrazkiem
             
              
  const base64 = this.getAttribute("src");
  
     
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

      
      
   },false);
  
}