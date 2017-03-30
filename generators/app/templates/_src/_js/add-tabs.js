//$(document).ready(function(){
//	$(".next-tab").on("click", function(e){
//		e.preventDefault();
//
//		var current_tab_pane = $(".add-tabs-pane.active").attr("id");
//		console.log("id: "+current_tab_pane);
//		var next_pane = $("#"+current_tab_pane).next().attr("id");
//		console.log("next: "+next_pane);
//
//		$("#"+current_tab_pane).hide();
//		$("#"+next_pane).show();
//
//
//		$(".add-tabs-pane").removeClass("active");
//		next_pane.addClass("active");
//
//	});
//});