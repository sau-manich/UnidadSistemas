var palabra = "prueba";

$("#paragraph p").each(function(){

    $(this).html( "<span>" + $(this).html().split(" ").join("</span> <span>") + "</span>" );

});

$("#paragraph span:contains('" + palabra + "')").css("color", "#F00");