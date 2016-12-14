
$("#deleteBtn").click(function(event) {
	var no = location.search.split("=")[1];
	if (confirm("정말 삭제하시겠습니까?") == true) {
		 ajaxDeleteComplain(no)
	} else {
		return;
	}  
});

function ajaxAddComplain(complain) {
	$.post(serverAddr + "/complain/add.json", complain, function(obj) {
		var result = obj.jsonResult 
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    } 
	    window.location.href = serverAddr + "/html/board/complain_t.html"
	}, "json")
}


function ajaxLoadComplain(no, rsvd) {
	$.getJSON(serverAddr + "/complain/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		//console.log(rsvd);
		$("#no").val(result.data.no);
		$("#title").val(result.data.title);
		$("#title").text(result.data.title);
		$("#contents").val(result.data.contents);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createdDate);
		$("#viewCount").text(result.data.viewCount);
		
		$("#updateBtn").click(function(event) {
	          window.location.href = serverAddr + "/html/board/complainUpdate_t.html?no=" + no + "=" + rsvd;
	          })
	})
}

function ajaxDeleteComplain(no) {
	$.getJSON(serverAddr + "/complain/delete.json", {
		no: no
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			console.log("삭제 실패입니다.")
			return
		}
		location.href = serverAddr + "/html/board/complain_t.html"
	})
}


