function header(){
	var htm = '<a class="button constant" id="index" href="index.html" style="text-align:center;">Home</a>'
			+ '<a class="button constant" id="db" href="database.html" style="text-align:center;">The Database</a>'
			  + '<a class="button constant" id="archive" href="savedcol.html?id=archive" style="text-align:center;">Your Stuff</a>'
			  + '<a class="button constant" id="coll" href="collections.html" style="text-align:center;">User Collections</a>'
			  + '<a class="button constant" id="about" href="about.html" style="text-align:center;">About</a>'
			  + '<button id="nuke" class="constant">Reset</button>'
	+ '<p class="right">You are logged in as <a href="savedcol.html?id=archive">TheBestDM</a></p>';
	return htm;
}

$(document).ready(function(){

/*	      $(".star").hover(function(){
			  if ($(this).hasClass("sel")) {
				  //console.log("enter no touchie");
			  } else {
				   //console.log("enter touchie");
	          	($(this).html('<i class="fa fa-star"></i>')); }
	      }, function(){
			  if ($(this).hasClass("sel")) {
				  //console.log("exit no touchie");
			  } else {
				  				  //console.log("exit touchie");
	          	($(this).html('<i class="fa fa-star-o"></i>')); }
	      });
*/		  
		  
		  
		  
		  
	$('body').on("click",'#nuke',function(){
		var r = confirm("Restore the site to its original state? You will lose your archive and notes.");
		//console.log(localStorage);
		if (r == true) {
		    localStorage.clear();
			sessionStorage.clear();
			location.reload();
			//console.log("Local storage reset");
		} else {
		    //console.log("Crisis averted");
		}
		//console.log(localStorage);  		
  	});
		  
		  
		  $(".rand").each(
			  function (){
			  	
				  //console.log("kjdfnv");
				  var rand = Math.floor((Math.random() * 99) + 1);
				  $(this).text(rand);
			  });  
			  
			  
		  
	      $("body").on("click",".star",(function(e){
			  item = $(this).attr('id');
			  if ($(this).hasClass("sel")) {
				  $(this).removeClass("sel");
				  //console.log("unsel");
				  unsave(item);
				  
				  //($(this).html('<i class="fa fa-star-o fa-2x"></i>'));
				  
			  } else {
			
				  
				  $(this).addClass("sel");
				  
				  save(item);
				  //($(this).html('<i class="fa fa-star fa-2x"></i>'));
				  
	          	//console.log("sel"); 
			}
			//console.log($(this));
			update_star(item,$(this));

	      }));
		  
		  
		  
		  
	  });
