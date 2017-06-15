
function Nounours(element,time)
{
    this.element = element;
    this.time = time;
    this.timer;

    this.reset = function()
    {
        element.classList.add("nounours_conteneur");
        var images = this.element.getElementsByTagName("img");
        
        

        if(images.length > 1)
        {
            var before = document.createElement("div");
            before.classList.add("before");    
            element.insertBefore(before, element.childNodes[0]); 
            before.addEventListener("click",this.precedent,false);

            var after = document.createElement("div");
            after.classList.add("after");    
            element.appendChild(after);
            after.addEventListener("click",this.suivant,false);

            this.selection(images[0]);
            this.timer = setInterval(this.suivant,time);        
        
        }
        else
        {
            console.error("no images in nounours slider !! ");
        }
    }

    this.selection = function(imageEnCours)
    {
        imageSuivant = imageEnCours.nextElementSibling 
        if(imageSuivant == null || imageSuivant.tagName != "IMG")
            imageSuivant = this.element.getElementsByTagName("img")[0];
        
        imagePrecedent = imageEnCours.previousElementSibling;
        if(imagePrecedent == null || imagePrecedent.tagName != "IMG")
        {
            imagePrecedent = this.dernierElement(this.element.getElementsByTagName("img"));
        }
            
        
        if(imageEnCours.tagName == "IMG")
        {

            for(var className of ["nounours_suivant", "nounours_precedent", "nounours_encours"]){
                for(var ele of this.element.getElementsByClassName(className))
                {
                    ele.classList.remove(className);
                }
            }


            imageSuivant.classList.add("nounours_suivant");
            imageEnCours.classList.add("nounours_encours");
            imagePrecedent.classList.add("nounours_precedent");
        }
        else
        {
            this.selection(imageSuivant);
        }
    }

    this.suivant = () => 
    {
        this.selection(this.element.getElementsByClassName("nounours_suivant")[0]);
        clearInterval(this.timer);
        this.timer = setInterval(this.suivant,time);
    }

    this.precedent = () =>
    {
        this.selection(this.element.getElementsByClassName("nounours_precedent")[0]);
        clearInterval(this.timer);
        this.timer = setInterval(this.suivant,time);
    }

    this.dernierElement= function(collection)
    {
        return collection[collection.length -1] || null;
    }

}