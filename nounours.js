
function Nounours(element,time)
{
    this.element = element;
    this.time = time;
    this.timer;

    this.reset = function()
    {
        element.classList.add("nounours_conteneur");
        var self = this; 
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

        var images = Array.from(this.element.childNodes).filter(self.elementValide);    
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
    this.selection = (imageEnCours) =>
    {
        //récuperation de l'image suivante
        var self = this;
	realChilNodes = Array.from(this.element.childNodes).filter(self.elementValide);    


	imageSuivant = imageEnCours.nextElementSibling;
	
	if(! this.elementValide(imageSuivant))//si le suivant est une fleche on prend la premièr image aussi
        	imageSuivant = realChilNodes[1];//on prend le 2eme element (le 1er c'est la fleche)


        //récupération de l'image précédente
        imagePrecedent = imageEnCours.previousElementSibling;

	if(! this.elementValide(imagePrecedent))//si il y en a pas ou si le precedent est une fleche on prend la dernière
	{
	    imagePrecedent = this.dernierElement(realChilNodes);
        }
	 
        //on fait les oprations si l'élément est bien une image
        if(this.elementValide(imageEnCours))
        {

            for(var className of ["nounours_suivant", "nounours_precedent", "nounours_encours"]){
          	       
		for(var ele of Array.from(this.element.getElementsByClassName(className)))
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
    
    this.elementValide = function(ele)
    {
	if(ele == null)
	{
		return false
	}	
	else
	{	try
		{
			var isBefore = ele.classList.contains("before");  
		}
		catch(err)
		{
			var isBefore = false;
		}
		
		try
		{
			var isAfter = ele.classList.contains("after"); 
		}
		catch(err)
		{
			var isBefore = false;
		}
		var bool = !((ele.nodeName == "#text") || isAfter || isBefore); 						
		//console.log(ele);
		//console.log(bool);
		return bool;
	}
    }
}
