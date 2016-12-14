$("#loginBtn").click(function(event) {
	location.href = "../auth/authApp.html"
});

$("#logoutBtn").click(function(event) {
	location.href = "../auth/authApp.html"
});

function ajaxComplainList() {
	$.getJSON(serverAddr + "/complain/list.json", function(obj) { 
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
	    var template = Handlebars.compile($('#trTemplateText').html())
	    $("#complainTable .king").html(template(result))
	    
	    $(".titleLink").click(function(event) {
		    window.location.href = serverAddr + "/html/board/complainForm_t.html?no=" + $(this).attr("data-no")
	    })
    })
}
 
//function ajaxLoginUser() {
//	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
//		var result = obj.jsonResult
//	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
//	         $('.my-login').css("display", "none")
//	         return
//	    }
//	      
//	    $('.my-logout').css("display", "none")
//	      
//	    $("#userName").text(result.data.name);
//    })
//}


