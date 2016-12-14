$("#prevBtn").click(function(event) {
	pageNo--;
	ajaxFreeBoardList();
});

$("#nextBtn").click(function(event) {
	pageNo++;
	ajaxFreeBoardList();
});

$("#new_freeBoard").click(function(event) {
	window.location.href = serverAddr + "/html/board/freeboardInput.html";
});



$("#searchBtn").click(function(event) {	
	var keyword = $("#keyword").val();
	
	//console.log(keyword);
	ajaxFreeBoardList(keyword);	
});

$("#searchAllBtn").click(function(event) {	
	var keyword = "";
	pageNo = 1;
	ajaxFreeBoardList(keyword);	
});


//글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
pageLength = 10; /* window.pageLength */

function ajaxFreeBoardList(keyword) {
	$.post(serverAddr + "/freeboard/list.json", {"pageNo": pageNo, "length": pageLength, "keyword": keyword}, 
			function(obj) {
		var result = obj.jsonResult 
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		
		console.log(result.data)


		var template = Handlebars.compile($("#frTemplateText").html())	
		$("#freeboardTable tbody").html(template(result.data))

		$(document.body).on('click', '.freeForm', function(event) {
			var clno= $(this).attr("data-no1")
			//console.log(clno)
			ajaxFreeBoardClickList(clno)
			window.location.href = serverAddr + "/html/board/freeboardForm.html?no=" + $(this).attr("data-no1")
		})

		// 현재 페이지 번호를 span 태그에 출력한다.
		pageNo = result.data.pageNo;
		totalPage = result.data.totalPage;
		$('#pageNo').text(pageNo);

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

function ajaxFreeBoardList1() {
	$.post(serverAddr + "/freeboard/list.json", {"pageNo": pageNo, "length": pageLength}, 
			function(obj) {
		var result = obj.jsonResult 
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		console.log(result.data);

		var template = Handlebars.compile($("#frTemplateText").html())	
		$("#freeboardTable tbody").html(template(result.data))

		$(document.body).on('click', '.freeForm', function(event) {
			var clno= $(this).attr("data-no1")
			//console.log(clno)
			ajaxFreeBoardClickList(clno)
			window.location.href = serverAddr + "/html/board/freeboardForm.html?no=" + $(this).attr("data-no1")
		})

		// 현재 페이지 번호를 span 태그에 출력한다.
		pageNo = result.data.pageNo;
		totalPage = result.data.totalPage;
		$('#pageNo').text(pageNo);

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

// 조회수 증가 function
function ajaxFreeBoardClickList(clno) {
	$.post(serverAddr + "/freeboard/updateVW_CNT.json", {no:clno}, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
	}, "json")
}



