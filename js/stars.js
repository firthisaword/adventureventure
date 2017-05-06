
$(document).ready(function(){

/*	      $(".star").hover(function(){
			  if ($(this).hasClass("sel")) {
				  console.log("enter no touchie");
			  } else {
				   console.log("enter touchie");
	          	($(this).html('<i class="fa fa-star"></i>')); }
	      }, function(){
			  if ($(this).hasClass("sel")) {
				  console.log("exit no touchie");
			  } else {
				  				  console.log("exit touchie");
	          	($(this).html('<i class="fa fa-star-o"></i>')); }
	      });
*/		  
		  
		  
		  
		  
		  
		  
		  $(".rand").each(
			  function (){
			  	
				  console.log("kjdfnv");
				  var rand = Math.floor((Math.random() * 99) + 1);
				  $(this).text(rand);
			  });  
			  
			  
		  
	      $("body").on("click",".star",(function(e){
			  item = $(this).attr('id');
			  if ($(this).hasClass("sel")) {
				  $(this).removeClass("sel");
				  console.log("unsel");
				  unsave(item);
				  
				  //($(this).html('<i class="fa fa-star-o fa-2x"></i>'));
				  
			  } else {
			
				  
				  $(this).addClass("sel");
				  
				  save(item);
				  //($(this).html('<i class="fa fa-star fa-2x"></i>'));
				  
	          	console.log("sel"); 
			}
			console.log($(this));
			update_star(item,$(this));

	      }));
		  
		  
		  
		  
	  });
