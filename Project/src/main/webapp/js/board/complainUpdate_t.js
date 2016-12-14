$(document.body).ready(function() {
    $('.limitation').on('keyup', function() {
        if($(this).val().length > 1000) {
        	 alert("글자수는 1000자 이내로 제한됩니다.!");  
            $(this).val($(this).val().substring(0, 1000));
        }
    });
});

var rsvdAll;

function rsvdCall(rsvd) {
	rsvdAll = rsvd;
}



function ajaxLoadComplain(no, rsvd) {
	$.getJSON(serverAddr + "/complain/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		$("#no").val(result.data.no);
		$("#title").val(result.data.title);
		$("#title").text(result.data.title);
		$("#contents").val(result.data.contents);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createdDate);
		$("#viewCount").text(result.data.viewCount);
	})
}


$("#updateBtn").click(function(event) {
	
	var form0 = $('form')[0];
	var formData0 = new FormData(form0);
	var fileName = formData0.get('file').name;
	
	console.log(formData0.get('no'));
	
	if (fileName == "" || fileName == null) {
		ajaxUpdateComplain0(formData0)
	} else {
		ajaxUpdateComplain1(formData0)
	}
	  
	  /*
		 * if (confirm("정말 변경하시겠습니까?") == true) {
		 * ajaxUpdateComplain(formData0) } else { return; }
		 */
});



function ajaxUpdateComplain0(formData0) {
	$.ajax({
	    url: serverAddr + "/complain/update0.json",
	    data: formData0,
	    processData: false,
	    contentType: false,
	    type: 'POST',
	    success: function(data){
	    	alert("업뎃완료");
	    	window.location.href = serverAddr + "/html/board/complain_t.html"
	    }
	  });
}

function ajaxUpdateComplain1(formData0) {
	$.ajax({
	    url: serverAddr + "/complain/update1.json",
	    data: formData0,
	    processData: false,
	    contentType: false,
	    type: 'POST',
	    success: function(data){
	    	alert("업뎃완료");
	    	window.location.href = serverAddr + "/html/board/complain_t.html"
	    }
	  });
}


function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
	    	alert("로그아웃 되었습니다.");
	    	window.location.href = serverAddr + "/html/index.html"
	         return
	    }

		$(".email").val(result.data.email);
		$(".writer").val(result.data.name);
		
    })
}

