
function Nounours(element,time)
{
    this.element = element;
    this.time = time;
    this.timer;

    this.reset = function()
    {
        element.classList.add("nounours_conteneur");
        var images = this.element.getElementsByTagName("img");
        
        //on clean si le slider est déja lancé
        var before = element.getElementsByClassName("before")[0] || null;
        if(before != null )
        {
            before.parentElement.removeChild(before);
        }

        var after = element.getElementsByClassName("after")[0] || null;
        if(after != null )
        {
            after.parentElement.removeChild(after);
        }
        
        clearInterval(this.timer);

        //on verifie qu'il y a bien des images
        if(images.length > 1)
        {
            //creation de la fleche gauche
            var before = document.createElement("div");
            before.classList.add("before");    
            element.insertBefore(before, element.childNodes[0]); 
            before.addEventListener("click",this.precedent,false);

            //creation de la flèche droite
            var after = document.createElement("div");
            after.classList.add("after");    
            element.appendChild(after);
            after.addEventListener("click",this.suivant,false);

            //on demmare l'animation
            this.selection(images[0]);
            this.timer = setInterval(this.suivant,time);        
        
        }
        else
        {
            console.error("no images in nounours slider !! ");
        }
    }
    
    //fait l'animation
    this.selection = function(imageEnCours)
    {
        //récuperation de l'image suivante
        imageSuivant = imageEnCours.nextElementSibling 
        if(imageSuivant == null || imageSuivant.tagName != "IMG")//si il y'en a pas... on prend la première
            imageSuivant = this.element.getElementsByTagName("img")[0];
        
        //récupération de l'image précédente
        imagePrecedent = imageEnCours.previousElementSibling;
        if(imagePrecedent == null || imagePrecedent.tagName != "IMG")//si il y en a pas... on prend la dernière
            imagePrecedent = this.dernierElement(this.element.getElementsByTagName("img"));
            
        //on fait les oprations si l'élément est bien une image
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
        else // sinon on prend l'élément suivant
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