# Qmery showcase
Qmery showcase is available in two directions 
## Installing

 1. Create an API token in qmery[ here](http://qmery.com/key)
 2. Download this repository
 3. Put the files on your webserver
 4. Edit `scripts/main.js` to customize your view
 
 ``` 
var qmeryConfig = {
	"token" 			: "fa8e92d0c24f",
	"sliderSlides" 		: 5,
	"sliderSort" 		: "id",
	"sliderSortDir" 	: "desc",
	"categorySort" 		: "videos",	
	"categorySortDir"	: "desc",	
	"categoryVideoLimit": 10, 
	"pageTitle"			: "My Channel"
}
```
| Variable 			| Description |
|----------			|-------------|
| token    			| Token which qmery generates for you |
| sliderSlides		| Number of slides for main page slider |
| sliderSort 		| Sort of videos for main sliders. available options are `id, title, length, create_date, modified_date, viewed`|
| sliderSortDir 	| Sort of slider data to be sorted with. available options are `asc, desc`		|
| categorySort 		| Sort of categories which are being showed in the main page. available options are `id, title, videos, create_date, last_modified`|
| categorySortDir 	| Sort of categories data to be sorted with. available options are `asc, desc`|
| categoryVideoLimit | limit of category sliders on main page (proposed to imporve performance for up to 1000 categories). Use 0 for unlimited |

 5. We are Ready!