var soup = advarr.concat(plots, people, places);
var filters = {
	fadv: 1,
	fplots: 1,
	fppl: 1,
	fpla: 1
};
function sum(obj){
	var s = 0;
	for (x in obj){
		s += obj[x];
	}
	return s;
}
function zero(obj){
	for (x in obj){
		obj[x] = 0;
	}
	
}

function gettit(obj){
	return adventures[obj].name;
}
function one(obj){
	for (x in obj){
		obj[x] = 1;
	}
	
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function srt(desc,key) {
 return function(a,b){
   return desc ? ~~(key ? a[key]<b[key] : a < b) 
               : ~~(key ? a[key]>b[key] : a > b);
  };
}

function get_table_head(imgwidth=100){
	return '<table class="u-full-width"><col width="5"><col width="5"><col width="'
	+imgwidth
	+'"><col><col width="20%"><thead></thead><th/><th/><th/><th>Details</th><th>Notes</th><tbody>';
	
}

function get_table_tail(){
	return '</tbody></table>';
}

function get_solo_form(note){
	return '<form id="notes" class="hidden"><textarea class="u-full-width" disabled>'
	+note
	+'</textarea><label for="exampleRecipientInput">Add to:</label><select class="u-full-width" id="exampleRecipientInput"><option value="Option 1" selected>Cool stuff that inspires me</option><option value="Option 2" disabled>New folder</option></select></form>'
}


function soloadv(obj){
	soloa = '<h5>&mdash; <i class="fa fa-book fa-lg"></i> &mdash;</h5><h5>'
	+obj.name
	+'</h5><p class="center"><strong>'
	+obj.edition
	+', Level '
	+obj.level
	+'</strong></p><p>'
	+obj.synopsis
	+'</p><a href="'
	+obj.src
	+'.html" target="blank" class="button">Details</a><h4><a class="star"><i class="fa fa-star-o fa-2x" title="Save"></i></a></h4>';
	return soloa;
}


function soloplace(obj){
	solopl = '<h5>&mdash; <i class="fa fa-map fa-lg"></i> &mdash;</h5><h5>'
	+obj.name
	+'</h5><img src="images/'
	+obj.image
	+'" width="300px"></img><p class="center"><strong>'
	+obj.tags
	+'</strong></p><p><em>'
	+obj.caption
	+'</em></p><p>'
	+obj.description
	+'</p><p class="center"><a target="blank" href="'
	+ obj.src
	+ '.html">'
	+ adventures[obj.src].name
	+'</a></p><h4><a class="star"><i class="fa fa-star-o fa-2x" title="Save"></i></a></h4>'
	+ get_solo_form(obj.notes);
	return solopl;
	
}
function soloperson(obj){
	soloper = '<h5>&mdash; <i class="fa fa-user fa-lg"></i> &mdash;</h5><h5>'
	+obj.name
	+'</h5><p>'
	+obj.description
	+'</p><p class="center"><a target="blank" href="'
	+obj.src
	+'.html">'
	+adventures[obj.src].name
	+'</a></p><h4><a class="star"><i class="fa fa-star-o fa-2x" title="Save"></i></a></h4>'
	+get_solo_form(obj.notes)
	return soloper;
}


function soloplot(obj){
	var oneplot = '<h5>&mdash; <i class="fa fa-bookmark fa-lg"></i> &mdash;</h5><h5 style="text-align:left;">'
	+ obj.text
	+'</h5><p class="center"><a target="blank" href="'
	+ obj.src
	+ '.html">'
	+ adventures[obj.src].name
	+ '</a></p><h4><a class="star"><i class="fa fa-star-o fa-2x" title="Save"></i></a></h4><form id="notes" class="hidden"><textarea class="u-full-width" disabled>'
	+ obj.notes
	+ '</textarea><label for="exampleRecipientInput">Add to:</label><select class="u-full-width" id="exampleRecipientInput"><option value="Option 1" selected>Cool stuff that inspires me</option><option value="Option 2" disabled>New folder</option></select></form>'
	return oneplot;
}

function getplot(obj){
 var plot_html =
	'<tr><td><a class="star"><i class="fa fa-star-o fa-2x" title="Save"></i></a></td><td><a href="'
 +obj.src
 +'.html" title="Source"><i class="center fa fa-2x fa-link"></i></a></td><td class="center"><i class="fa fa-3x fa-bookmark" title="Plot"></i></td><td><h5>'
 +obj.text
 +'</h5></td><td><form><textarea class="u-full-width" id="exampleMessage" disabled>'
 +obj.notes+'</textarea></form></td></tr>';
 //console.log(allplots);
 
 return plot_html;
}

function getperson(obj){
	 		var person_html =
				'<tr><td><a class="star"><i class="fa fa-star-o fa-2x" title="Save"></i></a></td><td><a href="'
			 +obj.src
			 +'.html" title="Source"><i class="center fa fa-2x fa-link"></i></a></td><td class="center"><i class="fa fa-3x fa-user" title="Person"></i></td><td><h5>'
			 +obj.name
			 +'</h5><p>'
			 +obj.description
			 +'</p></td><td><form><textarea class="u-full-width" id="exampleMessage" disabled>'
			 +obj.notes+'</textarea></form></td></tr>';
			 return person_html;
}


function getplace(obj,imgwidth=100){
		//console.log("hahahaha")
	var place_html =
	   	 	'<tr><td><a class="star"><i class="fa fa-star-o fa-2x" title="Save"></i></a></td><td><a href="'
	   		 +obj.src
			 +'.html" title="Source"><i class="center fa fa-2x fa-link"></i></a></td><td class="center"><img width="'
			+imgwidth
			+'" src="images/'
			+obj.image
			 +'"></img></td><td><h5>'
	   		 +obj.name
	   		 +'</h5><p><em>'
			 +obj.caption
			 +"</em></p><p>"
			 +obj.description
			 +'</p></td><td><p><strong>'
			 +obj.tags
			 +'</strong></p><form><textarea class="u-full-width" id="exampleMessage" disabled>'
	   		 +obj.notes+'</textarea></form></td></tr>';
			 //console.log(allplots);
			 return place_html;
}

function getadventure(obj){
			  var advhtml=
				'<tr><td><a class="star"><i class="fa fa-star-o fa-2x" title="Save"></i></a></td><td><a href="'
			 +obj.src
			 +'.html" title="Source"><i class="center fa fa-2x fa-link"></i></a></td><td class="center"><i class="fa fa-3x fa-book" title="Adventure"></i></td><td><h5><a href="'
			 +obj.src
			 +'.html">'
			 +obj.name
			 +'</a></h5><p>'
			 +obj.synopsis
			 +'</p></td><td><p><strong>'
			 +obj.edition
			 +", Level "
			 +obj.level
			 +'</strong></p><form><textarea class="u-full-width" id="exampleMessage" disabled>'
			 +obj.notes+'</textarea></form></td></tr>';
			 //console.log(allplots);
			 return advhtml;
}


function peopleby(adventure,imgwidth=50){
		//console.log("hahahaha")
		var allpeople = get_table_head(imgwidth);
		var p = 0;
	    for (x in people){
	   	 
	   	 if (adventure=="" || people[x].src == adventure){
			 //console.log(plots[x]);	 
			 allpeople += getperson(people[x]);
			 p += 1;
			 //console.log(allplots);
 	
	    }
		
	}
	allpeople+= get_table_tail();
	if (p>0) return allpeople;
	else return "";
}

	function plotsby(adventure,imgwidth=50){
		//console.log("hahahaha")
		var p = 0;
		var allplots = get_table_head(imgwidth);

	    for (x in plots){
	   	 
	   	 if (adventure=="" || plots[x].src == adventure){
			 //console.log(plots[x]);	 
			 allplots += getplot(plots[x]);
 			 p += 1;
	    }
		
	}
	allplots+=get_table_tail();
	if (p>0) return allplots;
	else return "";
}
 
function placesby(adventure,imgwidth=200){
		//console.log("hahahaha")
		var allplaces = get_table_head(imgwidth);
		var p = 0;
	    for (x in places){
	   	 
	   	 if (adventure=="" || places[x].src == adventure){
			 //console.log(plots[x]);	 
			 allplaces += getplace(places[x],imgwidth);
			 p+= 1;
	    }
		
	}
	allplaces+= get_table_tail();
	if (p>0) return allplaces;
	else return "";
}
 

function all_adventures(){
		//console.log("hahahaha")
		var alladventures = get_table_head(50);

	    for (x in advarr){
	   	 
			var this_adv = advarr[x];
			 //console.log(plots[x]);	 
			 alladventures += getadventure(this_adv);
			 //console.log(allplots);
 	
	    
		
	}
	alladventures+=get_table_tail();
	return alladventures;
}
 
 
function single_adventure(adv){
	var adv = adventures[adv];
	var oneadv = '<h1 class="center">'
	+ adv.name
	+ ' <a class="star"><i class="fa fa-star-o fa-2x"></i></a></h1><div class="row"><div class="one-third column"><h5>Summary</h5><p>'
	+ adv.synopsis
	+ '</p></div><div class="one-third column"><h5>Details</h5><table class="u-full-width"><thead></thead><tbody><tr><td><strong>Author</strong></td><td>'
	+ adv.author
	+ '</td></tr><tr><td><strong>Edition</strong></td><td>'
	+ adv.edition
	+ '</td></tr><tr><td><strong>Level</strong></td><td>'
	+ adv.level
	+ '</td></tr><tr><td><strong>Length</strong></td><td>'
	+ adv.pages
	+ ' pages</td></tr><tr><td><strong>Source</strong></td><td>'
	+ adv.source
	+ '</td></tr></tbody></table></div><div class="one-third column"><h5>Notes</h5><form><textarea class="u-full-width" id="exampleMessage">'
	+ adv.notes
	+ '</textarea></form></div></div><div class="row"><img class="u-center" src="images/'
	+ adv.image
	+ '"></div>';
	return oneadv;
	
} 


function build_filtered_array(){
	var filtered_array = [];
	for (x in soup) {
		var item = soup[x];
		
		switch (item.type){
		case "adventure":
			if (filters["fadv"]==1) filtered_array.push(item);
			break;
		case "place":
			if (filters["fpla"]==1) filtered_array.push(item);
			break;
		case "plot":
			if (filters["fplots"]==1) filtered_array.push(item);
			break;
		case "person":
			if (filters["fppl"]==1) filtered_array.push(item);
			break;
		}
		
	}
	return filtered_array;
} 


function return_solo(obj){
		switch (obj.type){
		case "adventure":
			return soloadv(obj);
			break;
		case "place":
			return soloplace(obj);
			break;
		case "plot":
			return soloplot(obj);
			break;
		case "person":
			return soloperson(obj);
			break;
		}
		
	

}


function build_html_soup(imgwidth=100,filters){
	arr = build_filtered_array(filters);
	
	var html_soup = '<table class="u-full-width"><col width="5"><col width="5"><col width="'
	+imgwidth
	+'"><col><col width="20%"><thead></thead><th/><th/><th/><th>Details</th><th>Notes</th><tbody>';
	for (x in arr) {
		var item = arr[x];
		
		switch (item.type){
		case "adventure":
			html_soup += getadventure(item);
			break;
		case "place":
			html_soup += getplace(item);
			break;
		case "plot":
			html_soup += getplot(item);
			break;
		case "person":
			html_soup += getperson(item);
			break;
		}
		
	}
	html_soup += "</tbody></table>";
	return html_soup;
}

$(document).ready(function(){
	
	$(".allfilter").click(function(){
		
		if (sum(filters) == 4){
			zero(filters);
		} else {
			one(filters);
		}
		update_buttons();
		console.log(filters);
	});
	
	
	$(".filter").click(function(){
		var id = $(this).attr('id');
		console.log(filters[id]);
		if (filters[id] == 0){
			filters[id] = 1;
		} else {
			filters[id] = 0;
		}
		update_buttons();
		console.log(filters);
	});
$('body').on("click",'.expand',function(){
	//console.log($(this));
	var chevron = $(this);
	//console.log(chevron);
	
	if (chevron.hasClass("fa-chevron-down")){
			chevron.removeClass("fa-chevron-down");
			chevron.addClass("fa-chevron-right");
	} else {
		chevron.removeClass("fa-chevron-right");
		chevron.addClass("fa-chevron-down");
	}
	
	
	
	
  var eid = $(this).attr("id").substring(1);
  //console.log(eid);			  
    $('#content'+eid).slideToggle('slow');
});
});