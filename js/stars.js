
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
			  
			  
		  
	      $("body").on("click","a.star",(function(e){
			  if ($(this).hasClass("sel")) {
				  $(this).removeClass("sel");
				  console.log("unsel");
				  ($(this).html('<i class="fa fa-star-o fa-2x"></i>'));
				  
			  } else {
			
				  
				  $(this).addClass("sel");
				  ($(this).html('<i class="fa fa-star fa-2x"></i>'));
				  
	          	console.log("sel"); 
			}
			  ($("#notes")).slideToggle("fast");
	      }));
		  
		  
		  
		  
	  });
