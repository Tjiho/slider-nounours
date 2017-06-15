# slider-nounours
Slider d'images trop bien en javascript et css

## utilisation

inclure le css et le js : 
```html
<link rel="stylesheet" href="nounours.css" />
<script src="nounours.js"></script>
```

Créer le slider : 
```html
<div id="id_de_mon_slider">
    <img src="img/tata.jpg"/>
    <img src="img/titi.jpg"/>
    <img src="img/toto.jpg"/>
    <img src="img/tutu.jpg"/>
    <img src="img/tyty.jpg"/>
</div>

```

Démmarer le slider

```html
<script>
    var mon_slider = document.getElementById("id_de_mon_slider");//on selectionne l'element qui contient les images 
    slider = new Nounours(mon_slider,3000);//on creer le slider
    slider.reset();//on le reset
</script>
```