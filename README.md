Responsive Menu
===============

Menu simple responsive & accessible (Plugin jQuery)

* Menu affiché si JavaScript est désactivé
* Accessible RGAA / Accessiweb
* ARIA
* Gestion de la navigation au clavier selon les recommandation W3C
 * FLECHES : Se déplacer parmi les options
 * TAB : Déplace le focus sur le prochain élément / Widget
 * ECHAP : Fermer le popup
 * Utilisation des tabindex


## Support

* Chrome
* Firefox
* IE7+ (sans responsive)


## Installation

### 1. Joindre le plugin et la bibliothèque accessUI

```html
<script src="jquery.accessUI.js"></script>
<script src="jquery.responsiveMenu.js"></script>
```

```html
<link rel="stylesheet" media="all" href="responsiveMenu.css" />
```

> La classe "js" doit être présente sur un parent pour indiquer que JavaScript est activé.
> Elle est mise automatiquement par http://modernizr.com/


### 2. HTML

```html
<nav class="responsive-menu responsive-menu-theme">
	<ul>
		<li><a href="index.html?p=pe">Pêches</a></li><!--
		--><li class="active"><a href="index.html?p=pm">Pommes</a></li><!--
		--><li><a href="index.html?p=pg">Pommes Golden</a></li><!--
		--><li><a href="#po">Poires (ancre HTML)</a></li><!--
		--><li><a href="#sc">Scoubidous (ancre HTML)</a></li>
	</ul>
</nav>
```


### 3. JavaScript

```js
$(document).ready(function() {

	// Menu responsive
	if( $.fn.responsiveMenu )
		$('nav.responsive-menu').responsiveMenu();

}); // /ready
```


### 4. Options

* **triggerText** : Texte du bouton en mode compact (défaut : 'Menu ')
* **breakpoint** : Syntaxe media-queries (défaut : '(max-width: 767px)')

> En cas de changement, reporter la modification dans le CSS.

