function ajaxFirstList() {
	$.getJSON(serverAddr + "/board/firstlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#frTemplateText').html())	    
		$("#firstTable").html(template(result.data))	    
	})
}



$("#prevBtn").click(function(event) {
	pageNo--;
	ajaxGongziList();
});

$("#nextBtn").click(function(event) {
	pageNo++;
	ajaxGongziList();
});


// 글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
    pageLength = 6; /* window.pageLength */

function ajaxGongziList() {
	$.getJSON(serverAddr + "/board/list.json", {"pageNo": pageNo, "length": pageLength}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
	    var template = Handlebars.compile($('#trTemplateText').html())	    
	    $("#gongziTable").html(template(result.data))
	    
	    $(document.body).on('click', '.card1', function(event) {
		    window.location.href = serverAddr + "/html/board/gongziForm_test.html?no=" + $(this).attr("data-no")
	    })
	    
	    // 현재 페이지 번호를 span 태그에 출력한다.
	    pageNo = result.data.pageNo;
	    totalPage = result.data.totalPage;
	    $('#pageNo').text(pageNo);
	    
	    // 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
	    if (pageNo <= 1) {
	    	$('#prevBtn').attr('disabled', true);
	    } else {
	    	$('#prevBtn').removeAttr('disabled');
	    } 
	    
	    // 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
	    if (pageNo >= totalPage) {
	    	$('#nextBtn').attr('disabled', true);
	    } else {
	    	$('#nextBtn').removeAttr('disabled');
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
		    window.location.href = serverAddr + "/html/board/gongziForm_t_test.html?no=" + $(this).attr("data-no")
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





