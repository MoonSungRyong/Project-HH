$(document.body).ready(function() {
	$('.updateLimit').on('keyup', function() {
		if($(this).val().length > 200) {
			alert("글자수는 200자 이내로 제한됩니다.!");  
			$(this).val($(this).val().substring(0, 200));
		}
	});
});


$("#cancelBtn").click(function(event) {
	var no = location.search.split("=")[1];	 
	location.href= serverAddr + "/html/board/freeboardForm_t.html?no=" + no
});

$("#updateBtn").click(function(event) {
	var form = $('form')[0];
	var formData = new FormData(form);
	
	swal({
		title : '정말 변경하시겠습니까?',
		type : 'warning',
		showCancelButton : true,
		confirmButtonColor : '#3085d6',
		cancelButtonColor : '#d33',
		confirmButtonText : '변경',
		cancelButtonText : '취소'
	}).then(function() {
		ajaxUpdateFreeBoard(formData);
	})
});


function ajaxLoadFreeBoard(no) {
	$.getJSON(serverAddr + "/freeboard/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		//console.log(result.data);
		$("#boardNo").val(result.data.boardNo);
		$("#email").val(result.data.email);
		$("#writer").val(result.data.writer);
		$("#title").val(result.data.title);
		$("#title1").text(result.data.title);
		$("#contents").val(result.data.contents);
		$("#createDate").val(result.data.createDate);
		$("#viewCount").val(result.data.viewCount);		
	})
}

function ajaxUpdateFreeBoard(formData) {
	$.ajax({
		url: serverAddr + "/freeboard/update.json",
		data: formData,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data){
			var no = location.search.split("=")[1];
			swal({
				title : '게시물이 변경되었습니다.',
				confirmButtonColor : '#3085d6',
				confirmButtonText : '확인'
			}).then(function() {
				window.location.href= serverAddr + "/html/board/freeboardForm_t.html?no=" + no
			});
		}
	});
}








