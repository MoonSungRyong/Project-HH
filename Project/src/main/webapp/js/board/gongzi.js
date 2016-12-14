$("#new_gongzi").click(function(event) {
	window.location.href = serverAddr + "/html/board/gongziInput.html";
})

$("#prevBtn").click(function(event) {
	pageNo--;
	ajaxGongziList(email);
});

$("#nextBtn").click(function(event) {
	pageNo++;
	ajaxGongziList(email);
});


$(document.body).on('click', '.hidden_no', function(event) {
	var clno= $("#hidden_no").val();
	console.log(clno)
	ajaxGongziClickList(clno)
    window.location.href = serverAddr + "/html/board/gongziForm.html?no=" + $("#hidden_no").val();
})

$(document).ready(function() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}	
		
		email = result.data.email;
		ajaxFirstList(email);
		ajaxGongziList(email);
	})
})

function ajaxFirstList(email) {
	$.getJSON(serverAddr + "/board/firstlist.json", {"email": email}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		
		
		//console.log(result.data);
		$("#hidden_no").val(result.data.list[0].boardNo);
		$("#recent_title").html(result.data.list[0].title);
		$("#recent_contents").html(result.data.list[0].contents);
	})
}



// 글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
    pageLength = 4, /* window.pageLength */
    email;

function ajaxGongziList(email) {
	console.log(email)
	$.getJSON(serverAddr + "/board/list.json", {"pageNo": pageNo, "length": pageLength, "email": email}, 
			function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
	    var template = Handlebars.compile($('#trTemplateText').html())	    
	    $("#gongziTable").html(template(result.data))
	    
	   
	    
	    $(document.body).on('click', '.card1', function(event) {
	    	var clno= $(this).attr("data-no")
	    	//console.log(clno)
	    	ajaxGongziClickList(clno)
		    window.location.href = serverAddr + 
		    "/html/board/gongziForm.html?no=" + $(this).attr("data-no")
	    })
	    
	    // 현재 페이지 번호를 span 태그에 출력한다.
	    pageNo = result.data.pageNo;
	    totalPage = result.data.totalPage;
	    
	    //console.log(pageNo);
	    //console.log(totalPage);
	    
	    // 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
	    if (pageNo <= 1) {
	    	$("#prevBtn").css({ 'pointer-events': 'none' });
	    	$('#prevBtn').addClass("disabled");
	    } else {
	    	$("#prevBtn").css({ 'pointer-events': 'visible' });
	    	$('#prevBtn').removeClass("disabled");
	    } 
	    
	    // 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
	    if (pageNo >= totalPage) {
	    	$("#nextBtn").css({ 'pointer-events': 'none' });
	    	$('#nextBtn').addClass("disabled");
	    } else {
	    	$("#nextBtn").css({ 'pointer-events': 'visible' });
	    	$('#nextBtn').removeClass("disabled");
	    }
    })
}



$("#prevBtnT").click(function(event) {
	pageNo--;
	ajaxGongziList_T();
});

$("#nextBtnT").click(function(event) {
	pageNo++;
	ajaxGongziList_T();
});



function ajaxGongziList_T() {
	$.getJSON(serverAddr + "/board/list.json", {"pageNo": pageNo, "length": pageLength}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
	    var template = Handlebars.compile($('#trTemplateText').html())	    
	    $("#gongziTable").html(template(result.data))
	    
	    $(document.body).on('click', '.card1', function(event) {
	    	var clno= $(this).attr("data-no")
	    	//console.log(clno)
	    	ajaxGongziClickList(clno)
		    window.location.href = serverAddr + "/html/board/gongziForm_t.html?no=" + $(this).attr("data-no")
	    })
	    
	    // 현재 페이지 번호를 span 태그에 출력한다.
	    pageNoT = result.data.pageNo;
	    totalPageT = result.data.totalPage;
	    $('#pageNoT').text(pageNoT);
	    
	    // 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
	    if (pageNoT <= 1) {
	    	$('#prevBtnT').attr('disabled', true);
	    } else {
	    	$('#prevBtnT').removeAttr('disabled');
	    } 
	    
	    // 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
	    if (pageNoT >= totalPageT) {
	    	$('#nextBtnT').attr('disabled', true);
	    } else {
	    	$('#nextBtnT').removeAttr('disabled');
	    }
    })
}


/////////////////////////////////////////// 조회수 증가 ///////////////////////////////////////////
function ajaxGongziClickList(clno) {
	$.post(serverAddr + "/board/updateVW_CNT.json", {no:clno}, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
	}, "json")
}
/////////////////////////////////////////// 조회수 증가 끝 ///////////////////////////////////////////




