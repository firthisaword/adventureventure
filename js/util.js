var soup = advarr.concat(plots, people, places);
/*var filters = {
	fadv: 1,
	fplots: 1,
	fppl: 1,
	fpla: 1
};*/

var everything = {};
for (i in soup){
	everything[soup[i].id] = soup[i];
}
//console.log("A good start:");
//console.log(everything);

var ccollections = {
	adventure: advarr,
	plot: plots,
	person: people,
	place: places
};

var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

// UTIL FUNCTIONS

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

function check_filters(){
	if (!sum(filters())) 
		sessionStorage.removeItem('filterdata');
	if (!JSON.parse(sessionStorage.savedokay))
		sessionStorage.savedokay = 1;
	
}

function update_buttons(){
	
	f = filters();
	
	for (x in f){
		if (f[x] == 1){
			$('#'+x).addClass("button-primary");
		} else {
			$('#'+x).removeClass("button-primary");
		}
	}
	if (sum(f)==4){
		$(".allfilter").addClass("button-primary");
	} else {
		$(".allfilter").removeClass("button-primary");
	}
	
	if (!JSON.parse(sessionStorage.savedokay))
		$(".sfilter").addClass("button-primary");
	else 
		$(".sfilter").removeClass("button-primary");
	
}

function filters() {
	var filtero;
	if (sessionStorage.filterdata) { filtero = JSON.parse(sessionStorage.filterdata);
	} else {
		filtero = {
			a: 1,
			p: 1,
			c: 1,
			m: 1
		};
		sessionStorage.filterdata = JSON.stringify(filtero);
	};
	
	if (!sessionStorage.savedokay) sessionStorage.savedokay = JSON.stringify(1);
	return filtero;
}



function next(adv){
	var curr = advarr.indexOf(adventures[adv]);
	if (curr == advarr.length-1) return null;
	return advarr[curr + 1];
}

function prev(adv){
	var curr = advarr.indexOf(adventures[adv]);
	if (curr == 0) return null;
	return advarr[curr-1];
}

function srt(desc,key) {
 return function(a,b){
   return desc ? ~~(key ? a[key]<b[key] : a < b) 
               : ~~(key ? a[key]>b[key] : a > b);
  };
}



function get_solo_form(note){
	return '<p class="center">Saved!</p><form id="notes" class="hidden"><textarea class="u-full-width" disabled>'
	+note
	+'</textarea><label for="exampleRecipientInput">Add to:</label><select class="u-full-width" id="exampleRecipientInput"><option value="Option 1" selected>Cool stuff that inspires me</option><option value="Option 2" disabled>New folder</option></select></form>'
}

function adventure_url(src){
	return "adventure.html?id=" + src.src;
}

function item_url(obj){
	return "item.html?id=" + obj.id;
}

function randomize(savedokay){	
	if (!savedokay){
		savedokay = true;
	}
  var rand = random_valid_id(savedokay);
  if (rand != "na") return rand;
  return "x";
}

function viable_items(type,savedokay){
	var q = [];
	for (e in everything) {
		
		if (e.startsWith(type)) {
			if (savedokay || !is_saved(e)) {
				//console.log(e);
				q.push(e);
			}
		}
	}
	//console.log(q);
	return q;
}

function random_valid_id(savedokay){
	
//	 var oldtype = localStorage.lasttype;
	 var oldid = localStorage.lastid;
	
	//var id = "na";
	//var id = -1;
	var f = filters();
	//console.log(f);
	// var newonly = localStorage.newonly;
	if (sum(f)){
		//var viable_types = [];
		var all_viable_options = [];
		for (z in f){
			if (f[z]==1) {
				var q = viable_items(z,savedokay);
				all_viable_options = all_viable_options.concat(q);
			}
		}

		if (all_viable_options.length == 0) return "x";
		
		var oldindex = all_viable_options.indexOf(oldid);
		if (oldindex != -1){
			all_viable_options.splice(oldindex, 1);
		}
		//console.log(all_viable_options);		
		if (all_viable_options.length == 0) return "x";
		
		index = Math.floor(Math.random() * all_viable_options.length);
		return all_viable_options[index];
		
		
	}
	else {
		return "x";
	}
/*	if (sum(f)){
		do {
			index = Math.floor(Math.random() * everything.length);
			}
		while (false);
		

	//select random type from viable_types
		if (viable_types.length > 0) type = viable_types[Math.floor(Math.random() * viable_types.length)];
	
		col = ccollections[type];
		do {id = Math.floor(Math.random() * col.length);}
			while (id == Number(oldid)));
	} else {
		type = "x"
		id = "x"
	};
	
	return [type,id];*/
}

function soloadv(obj){
	//obj = advarr[id];
	soloa = '<h3 class="center">&mdash; <a title="Direct link" href="'
	+ adventure_url(obj)
	+'" target=_blank><i class="fa fa-book fa-lg"></i></a> &mdash;</h3><p class="center"><strong>'
	+obj.edition
	+' Adventure, Level '
	+obj.level
	+'</strong></p><h5 class="center">'
	+obj.name
	+'</h5><p>'
	+obj.synopsis
	+'</p><div class="center"><a href="'
	+adventure_url(obj)
	+'" target=_blank class="button ucenter">Details</a></div>'
	+ add_star_code(obj.id);
	return soloa;
}
function soloplace(obj){
	//obj = places[id];
	solopl = '<h3 class="center">&mdash; <a title="Direct link" href="'
	+ item_url(obj)
	+'" target=_blank><i class="fa fa-map fa-lg"></i></a> &mdash;</h3><p class="center"><strong>'
	+obj.tags
	+'</strong></p><h5 class="center">'
	+obj.name
	+'</h5><img src="images/'
	+obj.image
	+'" width="300px" class="u-center"></img><p><em>'
	+obj.caption
	+'</em></p><p>'
	+obj.description
	+'</p><p class="center">Adventure:<br/><a target=_blank href="'
	+ adventure_url(obj)
	+ '">'
	+ everything[obj.src].name
	+'</a></p>'
		+ add_star_code(obj.id);
	return solopl;
	
}
function soloperson(obj){
	//obj = people[id];
	
	var tag="";
	if (obj.tag) tag = obj.tag;
	//console.log(item_url(obj));
	soloper = '<h3 class="center">&mdash; <a title="Direct link" href="'
	+ item_url(obj)
	+'" target=_blank><i class="fa fa-user fa-lg"></i></a> &mdash;</h3><p class="center"><strong>'
	+ tag
	+'</strong></p><h5 class="center">'
	+obj.name
	+'</h5><p>'
	+obj.description
	+'</p><p class="center">Adventure:<br/><a target=_blank href="'
	+adventure_url(obj)
	+'">'
	+everything[obj.src].name
	+'</a></p>'
	+ add_star_code(obj.id);
	return soloper;
}
function soloplot(obj){
	//obj = plots[id];
	var oneplot = '<h3 class="center">&mdash; <a href="'
	+ item_url(obj)
	+'" target=_blank"><i class="fa fa-bookmark fa-lg"></i></a> &mdash;</h3><p class="center"><strong>Plot hook</strong></p><h5 style="margin: 40px 0px 20px 0px; text-align:left;">'
	+ obj.text
	+'</h5><p style="padding-top:20px" class="center">Adventure:<br/><a target=_blank href="'
	+ adventure_url(obj)
	+ '">'
	+ everything[obj.src].name
	+ '</a></p>'
	+ add_star_code(obj.id);
	return oneplot;
}



/*
function peopleby(adventure,imgwidth){
		////console.log("hahahaha")
		var allpeople = get_table_head(imgwidth);
		var p = 0;
	    for (x in people){
	   	 
	   	 if (adventure=="" || people[x].src == adventure){
			 ////console.log(plots[x]);	 
			 allpeople += person_row(x);
			 p += 1;
			 ////console.log(allplots);
 	
	    }
		
	}
	allpeople+= get_table_tail();
	if (p>0) return allpeople;
	else return "";
}

function plotsby(adventure,imgwidth=50){
		////console.log("hahahaha")
		var p = 0;
		var allplots = get_table_head(imgwidth);

	    for (x in plots){
	   	 
	   	 if (adventure=="" || plots[x].src == adventure){
			 ////console.log(plots[x]);	 
			 allplots += plot_row(x);
 			 p += 1;
	    }
		
	}
	allplots+=get_table_tail();
	if (p>0) return allplots;
	else return "";
}
 
function placesby(adventure,imgwidth=200){
		////console.log("hahahaha")
		var allplaces = get_table_head(imgwidth);
		var p = 0;
	    for (x in places){
	   	 
	   	 if (adventure=="" || places[x].src == adventure){
			 ////console.log(plots[x]);	 
			 allplaces += place_row(x,imgwidth);
			 p+= 1;
	    }
		
	}
	allplaces+= get_table_tail();
	if (p>0) return allplaces;
	else return "";
}
 
function absolutely_all_items(imgwidth=200){
	var allitems = get_table_head(imgwidth);
	for (q in soup){
		var src = soup[q];
		for (x in src) {
		////console.log(src[x].type);
		allitems += table_row(src[x].type, x,imgwidth);
	}
	}
	allitems += get_table_tail();
	////console.log(allitems);
	return allitems;
	
}
*/
function all_items(type,imgwidth,src){
	if (!type) type = "all";
	if (!imgwidth) imgwidth = 50;
	if (!src) src = "all";
	////console.log(src);
	var allitems = get_table_head(imgwidth);
	var found = 0;
	for (x in everything){
		////console.log(src[x].type);
		if ((type=="all") || (everything[x].type == type)) {
			if ((src=="all") || (everything[x].src == src)){
				found += 1;
			allitems += table_row(everything[x] , imgwidth);}
		}
	}
	allitems += get_table_tail();
	////console.log(allitems);
	if (found == 0) return "";
	return allitems;
}


function list_collections(){
	s = JSON.parse(localStorage.saved);
	h = "<h3>User Collections</h3>";
	for (c in s) {
		var currcol = s[c];
		if (!currcol.mine)	h += '<h5>' 
			+ currcol.name 
			+ ' ('
			+ currcol.contents.length
			+ ' items)'
			+ '</h5><p><strong>Author: '
			+ currcol.author
			+ '</strong></p><p>'
			+ currcol.notes
			+ '</p><a class="button" href="savedcol.html?id=' 
			+ currcol.id 
			+ '">Details</a>';
	}
	return h;
}

function show_collection(col,imgwidth){
	//get the full collection and build html from there
	if (!imgwidth) imgwidth = 100;
	var col_html = "<h1>"
	+ col.name
	+ '</h1>';
	if (col.mine=="0") {
		col_html += '<h5>Author\'s Collection Notes</h5><p>' + col.notes + '</p>';
	} else {
		col_html += '<h5>Your Archive Notes</h5><form onsubmit="return false;"><textarea class="u-full-width" id="colNotes-'
		+ col.id + '">'	+ col.notes	+ '</textarea><input type="submit" class="button notesave" value="Save" id="save-'+col.id+'"></form>';
	}
	
	var allitems = get_table_head(imgwidth);
	var found = 0;

	for (x in col.contents){
		////console.log(src[x].type);
	////console.log(x);		
			found += 1;
			allitems += table_row(everything[col.contents[x].id], imgwidth, col);
		}
	
	allitems += get_table_tail();
	////console.log(allitems);
	if (found == 0) col_html += '<div class="center"><h5 class="center">Your archive is empty.</h5><a class="button button-primary" href="index.html">Random item</a><br/><a class="button button-primary" href="collections.html">Collections</a></div>';
	else col_html += allitems;
	
	return col_html;
}





 
function adventure_details(adv){
	var adv = everything[adv];
	if (adv.pages != "?") apages = adv.pages + ' pages'; else apages = "N/A";
	//console.log(apages);
	var oneadv = '<h1 class="center">'
	+ adv.name
	+ '</h1>'
	+ add_star_code(adv.id)
	+ '<div class="row"><img class="u-center" width=400 src="images/'
	+ adv.image
	+ '"></div><div class="row"><h5>Summary</h5><p>'
	+ adv.synopsis
	+ '</p><h5>Details</h5><table class="u-full-width"><thead><th>Author</th><th>Edition</th><th>Level</th><th>Length</th><th>Source</th></thead><tbody><tr><td>'
	+ adv.author
	+ '</td><td>'
	+ adv.edition
	+ '</td><td>'
	+ adv.level
	+ '</td><td>'
	+ apages
	+ '</td><td>'
	+ adv.source
	+ '</td></tr></tbody></table></div>';
	return oneadv;
	
} 





				




function lookup(type, id){
	switch (type){
	case "adventure":
		return advarr[id];
		break;
	case "place":
		return places[id];
		break;
	case "plot":
		return plots[id];
		break;
	case "person":
		return people[id];
		break;
	default:
		return null;
		break;
}
}


function add_star_code(id){
	var g;
	var colls = inColl(id);
	//var pid = type + "." + id;
	if (colls.length > 0){
		//thing exists, set star to on
		g = '<div class="center">';
		g += '<a class="star sel" id="' + id + '"><i class="fa fa-star fa-2x" title="Unsave"></i></a></div>'	 
		$("#save").html("Un(s)ave item");
		$("#save").addClass("button-primary");

	} else{
		//not saved yet
		g = '<div class="center">';
		g += '<a class="star" id="' + id + '"><i class="fa fa-star-o fa-2x" title="Save"></i></a></div>';
		$("#save").html("<strong>(s)ave item");
		$("#save").removeClass("button-primary");
	}
	return g;
	/*var c = inColl(type,id);
	if (c.length > 0){
		//this has been saved
		 var output = '<h4 class="center"><a class="sel" id="' + type + '.' + id + '"><i class="fa fa-star fa-2x" title="Save"></i></a></h4><p class="center">Saved to <strong>';
		 for (x in c) {
			 output += c[x] + ", ";
			 
		 }
		 output += '</strong></p></a></h4>';
		 return output;
	} else {
	return '<form id="notes" class="hidden"><p style="padding-top: 20px; color:rgb(30, 174, 219);" class="center">Saved to <strong>Archive</strong>!</p><label for="exampleRecipientInput">Change folder:</label><select class="u-full-width" id="exampleRecipientInput"><option value="Option 1" selected>Archive</option><option value="Option 2" disabled>Cool stuff that inspires me</option><option value="Option 3" disabled>+ New folder</option></select><textarea placeholder="(optional notes here)" class="u-full-width"></textarea></form><h4 class="center">'
		+ '<a class="star" id="' + type + '.' + id + '"><i class="fa fa-star-o fa-2x" title="Save"></i></a></h4>';
	}*/
}

function update_star(id,obj){
//	obj = obj.firstChild();
	//console.log("Update star");
	var colls = inColl(id);
	//console.log(colls);
	var pid = "#" + id;
	//console.log(pid);
	var star_html = "";
	obj.addClass("sel");
	if (colls.length > 0){
		//thing exists, set star to on
		star_html += '<a><i class="fa fa-star fa-2x" title="Unsave"></i></a>';	 
		var s = $("#save");
		s.html("Un(s)ave item");
		s.addClass("button-primary");
	} else{
		//not saved yet
		obj.removeClass("sel");
		star_html += '<a><i class="fa fa-star-o fa-2x" title="Save"></i></a>';
				$("#save").html("(s)ave item");
				$("#save").removeClass("button-primary");
	}
	
	obj.html(star_html);
	
	//obj.attr('style',"color:red;");
	//$("#"+pid).show();
}
function return_solo(id){
		// update star of this thing
	//console.log("Returning solo " + id);
	var q = "";
	if (id == "x") {
		q = '<h1 style="padding-top: 100px" class="center">¯\\_(ツ)_/¯</h1><p class="center">There doesn\'t seem to be anything here.<br/><a class="button button-primary" href="index.html">Try again</a></p>';}
	else {
		item = everything[id];
	////console.log(id);
	////console.log(item);
		
		////console.log(q);
		switch (item.type){
		case "adventure":
			q = soloadv(item);
			break;
		case "place":
			q = soloplace(item);
			break;
		case "plot":
			q = soloplot(item);
			break;
		case "person":
			q = soloperson(item);
			break;
		//update_star(id);
		
		
	

}

}

return q;
}







function table_row(item,imgwidth,col){
	output = "";
	if (!imgwidth) imgwidth = 100;
	if (!col) col = null;
		switch (item.type){
		case "adventure":
			output = adv_row(item,imgwidth, col);
			break;
		case "place":

			output = place_row(item,imgwidth,col);
			break;
		case "plot":
			output =  plot_row(item,imgwidth,col);
			break;
		case "person":
			output = person_row(item,imgwidth, col);
			break;
		}
	return output;	
		//get the right thing
	

}


function get_table_head(imgwidth){
	return '<table class="u-full-width"><col width="5px"><col width="'
	+imgwidth
	+'px"><col><col width="200px"><thead></thead><tbody>';
	
}

function get_table_tail(){
	return '</tbody></table>';
}


function notes_field(id, col){
	html = "";
	if (col == null){
		return html;
	} else {
		var index = indexOfSaved(id, col.contents);
		var notes = col.contents[indexOfSaved(id, col.contents)].notes;
		if (col.mine == "1") {
		
		
			html += '<td><form onsubmit="return false;"><label>Your Notes:</label><textarea class="u-full-width" style="height:auto;" id="colNotes-'
		+ col.id +'-'+ index + '">'	+ notes	+ '</textarea><input class="button notesave" value="Save" id="save-'+col.id+'-'+index+'" type="submit"></form></td>'
		} else {
			html += '<td><p><strong>'
			+ col.author 
			+'\'s Notes:</strong></p><p><em>'
			+ notes +'</em></p></td>';
		}
	}
		
	return html;
}

function add_star_to_row(obj){
	var id = obj.id;
	var g;
	var colls = inColl(id);
	//var pid = type + "." + id;
	if (colls.length > 0){
		//thing exists, set star to on
		g = '<td class="center star sel" id="' + id + '">';
		g += '<a><i class="fa fa-star fa-2x" title="Unsave"></i></a></td>'	 


	} else{
		//not saved yet
		g = '<td class="center star" id="' + id + '">';
		g += '<a><i class="fa fa-star-o fa-2x" title="Save"></i></a></td>';
	}
	return g;
	
	/*<p class="center">Saved to <strong>';
		for (x in colls) {
			g += colls[x] + ", ";
		}
		g += '</strong></p>*/
}

function plot_row(obj,imgwidth,col){
	////console.log(obj.src);
	
	var plot_html = '<tr>'
			+ add_star_to_row(obj)
			+ '<td class="center"><a href="'
	+ item_url(obj)
	+ '" target=_blank><i class="fa fa-3x fa-bookmark" title="Plot"></i></a></td><td><h5>'
 +obj.text
	+'</h5><p>Adventure: <a href="'
	+ adventure_url(obj)
	+ '" target=_blank>'
	+ everything[obj.src].name
	+ '</a></p></td>';
	plot_html += notes_field(obj.id, col);
	plot_html+='</tr>';
 ////console.log(allplots);
 
 return plot_html;
}
function person_row(obj, imgwidth,col){
	//var obj = people[id];
	////console.log(obj.tag);
	var person_html = '<tr>'
			+ add_star_to_row(obj)
			+ '<td class="center"><a href="'
	+ item_url(obj)
	+ '" target=_blank><i class="fa fa-3x fa-user" title="Person"></i></a><p class="center"><strong>'
	+ obj.tag
	+ '</strong></p></td><td><h5>'
			 + obj.name
			 + '</h5><p>'
			 + obj.description
	+'</p><p>Adventure: <a href="'
	+ adventure_url(everything[obj.src])
	+ '" target=_blank>'
	+ everything[obj.src].name
	+ '</a></p></td>';
	person_html += notes_field(obj.id, col);
	person_html +='</tr>';
	////console.log(person_html);
			 return person_html;
}
function place_row(obj,imgwidth,col){
		////console.log("hahahaha")
	//var obj = places[id];
	////console.log(obj.image);
	////console.log(notes);
	var place_html = '<tr>'
			+ add_star_to_row(obj)
			+ '<td class="center"><a href="'
			+ item_url(obj)
			+ '" target=_blank><img width="'
			+imgwidth
			+'" src="images/'
			+obj.image
			 +'"></img></a><p class="center"><strong>'
			 +obj.tags
			 +'</strong></p></td><td><h5>'
	   		 +obj.name
	   		 +'</h5><p><em>'
			 +obj.caption
			 +"</em></p><p>"
			 +obj.description
			+'</p><p>Adventure: <a href="'
	+ adventure_url(everything[obj.src])
	+ '" target=_blank>'
	+ everything[obj.src].name
	+ '</a></p></td>'
	place_html += notes_field(obj.id, col);
	place_html +='</tr>';
			 return place_html;
}
function adv_row(obj, imgwidth, col){
	////console.log(adventure_url(obj));
			  var advhtml = '<tr>'
	+ add_star_to_row(obj)
	+'<td class="center"><a href="'
			 + adventure_url(obj)
			 +'" title="Source" target=_blank><i class="fa fa-3x fa-book" title="Adventure"></i></a><p class="center""><strong>'
			 +obj.edition
			 +", Level "
			 +obj.level
			 +'</strong></p></td><td><h5><a href="'
			 +adventure_url(obj)
			 +'">'
			 +obj.name
			 +'</a></h5><p>'
			 +obj.synopsis
			 +'</p></td>'
			 advhtml += notes_field(obj.id, col);
			 advhtml += '</tr>';
			 ////console.log(allplots);
			 return advhtml;
}


/*function render_collection(id,imgwidth=100){
	var col = collections[id];
	var editable = col.mine;
	var output = ''
	//title
	+ '<h1>' + col.name +'</h1>';
	if (editable==0) {
		output += '<h5>Author\'s Collection Notes</h5><p>' + col.notes + '</p>';
	} else {
		output += '<h5>Your Collection Notes</h5><form><textarea class="u-full-width" class="notesave" id="exampleMessage">'	+ col.notes	+ '</textarea></form>';
	}
	
	output+= '<table class="u-full-width"><col width="5"><col width="5"><col width="'
	+imgwidth
	+'"><col><col width="20%"><thead><th/><th/><th/><th>Details</th><th>Notes</th></thead><tbody>';
	
	//notes
	//contents with notes (others' or mine)
	for (i in col.contents){
		item = col.contents[i];
		output += table_row(item.type, item.id, imgwidth, editable, item.notes);
	}
	output += '</tbody></table>';
	return output;
	
}*/

function indexOfSaved(id, arr){
	for (x in arr){
		o = arr[x];
		if (o.id == id) return x;
	}
	return -1;
}


function getSavedCollection(coll){
	if (!coll) coll = "archive";
	var saved = JSON.parse(localStorage.saved);
//	//console.log(saved[coll].contents);
	return saved[coll];
}

function inColl(id) {
	//only with **YOUR COLLECTIONS**
	var saved = JSON.parse(localStorage.saved);
	var present = [];
	for (col in saved) {

		if (saved[col].mine == "1" && indexOfSaved(id,saved[col].contents) != -1) {
			present.push(col);
			
		}
	}
//	//console.log("Collections");
//	//console.log(present);
	return present;
}

function is_saved(id){
	return (inColl(id).length > 0);
}

function save(id, notes, coll){
	//console.log("Saving..." + id);
	if (!notes) notes = "";
	if (!coll) coll = "archive";
	var	saved = JSON.parse(localStorage.saved);
	q = indexOfSaved(id, saved[coll].contents);
	if (q == -1) {
		saved[coll].contents.push({
			id: id,
			notes: notes
		});
	}
	else {
		saved[coll].contents[q].notes = notes;
	
	}
	localStorage.saved = JSON.stringify(saved);
	//console.log(localStorage.saved);
	
}

function save_notes(notes, colname, index){
	//console.log(notes);
	//console.log(colname);
	
	var	saved = JSON.parse(localStorage.saved);
	if (!index) {
		////console.log(saved[colname]);
		saved[colname].notes = notes;
		
	} else {
			saved[colname].contents[Number(index)].notes = notes;
	}
	localStorage.saved = JSON.stringify(saved);
}

function unsave(id, coll){
	if (!coll) coll = "archive";
	var	saved = JSON.parse(localStorage.saved);
	q = indexOfSaved(id, saved[coll].contents);
	if (q != -1) {
		saved[coll].contents.splice(q, 1);
	}
	
	
	localStorage.saved = JSON.stringify(saved);
	//console.log(localStorage.saved);
	
}



$(document).ready(function(){
	//check_filters();
//	if (!sum(filters())) 
//		sessionStorage.removeItem('filterdata');

	if (!localStorage.saved) {
		console.log(starchive);
		saved = starchive;
		localStorage.saved = JSON.stringify(saved);
		////console.log(saved);
	}
	
/*	$(".allfilter").click(function(){
		q = filters();
		if (sum(q) == 4){
			zero(q);
		} else {
			one(q);
		}
		sessionStorage.filterdata = JSON.stringify(q);
		update_buttons();
	});
	*/
	
	$(".filter").click(function(){
		var id = $(this).attr('id');
		q = filters();
		//console.log(filters[id]);
		if (q[id] == "0"){
			q[id] = 1;
		} else {
			q[id] = 0;
		}
		sessionStorage.filterdata = JSON.stringify(q);
		//console.log(q);
		update_buttons();
	});
	
	
	$(".sfilter").click(function(){
		//console.log("Clicking");
		q = JSON.parse(sessionStorage.savedokay);
		if (q == 1){
			q = 0;
		} else {
			q = 1;
		}
		sessionStorage.savedokay = q;
		update_buttons();
	});
	
	
	$('body').on("click",'.notesave',function(){
		////console.log($(this));
		//var chevron = $(this);
		var col = $(this).attr('id').split('-')[1];
		var item = $(this).attr('id').split('-')[2];
		var q = "#colNotes-" + col;
		if (item) q += '-' + item;
		//console.log(q);
		var notes = $(q).val();
		save_notes(notes, col, item);
	});
	
	
	$('body').on("click",'.expand',function(){
		////console.log($(this));
		var chevron = $(this);
		////console.log(chevron);
	
		if (chevron.hasClass("fa-chevron-down")){
				chevron.removeClass("fa-chevron-down");
				chevron.addClass("fa-chevron-right");
		} else {
			chevron.removeClass("fa-chevron-right");
			chevron.addClass("fa-chevron-down");
		}
	
	
	
	
	  var eid = $(this).attr("id").substring(1);
	  ////console.log(eid);			  
	    $('#content'+eid).slideToggle('slow');
	});
});