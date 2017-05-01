
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
		  
		  
		  
		  $('.expand').click(function(){
			  var eid = $(this).attr("id").substring(1);
			  console.log(eid);			  
		      $('#content'+eid).slideToggle('slow');
		  });
		  
		  
		  $(".rand").each(
			  function (){
			  	
				  console.log("kjdfnv");
				  var rand = Math.floor((Math.random() * 99) + 1);
				  $(this).text(rand);
			  });  
			  
			  
		  
	      $(".star").on("click",(function(e){
			  if ($(this).hasClass("sel")) {
				  $(this).removeClass("sel");
				  console.log("unsel");
				  ($(this).html('<i class="fa fa-star-o"></i>'));
				  
			  } else {
			
				  
				  $(this).addClass("sel");
				  ($(this).html('<i class="fa fa-star"></i>'));
	          	console.log("sel"); 
			
			  //getting height and width of the message box
				console.log($(this).offset());
			    var height = $(this).offset().top;
			    var width = $(this).offset().left;
				console.log(height,width);
			    //calculating offset for displaying popup message
			    leftVal=width - 125 + "px";
			    topVal= height - 3 + "px";
//			    leftVal=e.pageX-(width/2)+"px";
//			    topVal=e.pageY-(height/2)+"px";
			    //show the popup message and hide with fading effect
			    $('#popup_div').css({left:leftVal,top:topVal}).show().delay(500).fadeOut(500);
			
			}
			  
	      }));
		  
		  
		  
		  
	  });
