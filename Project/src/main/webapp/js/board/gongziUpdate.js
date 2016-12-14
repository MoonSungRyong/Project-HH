$(document.body).ready(function() {
    $('.updateLimit').on('keyup', function() {
        if($(this).val().length > 300) {
        	swal({
        		  title: '글자수는 300자로 제한됩니다.',
        		  type: 'error',
        		  timer: 2000
        		});
            $(this).val($(this).val().substring(0, 300));
        }
    });
});


$("#cancelBtn").click(function(event) {
	 var no = location.search.split("=")[1];	 
	 location.href= serverAddr + "/html/board/gongziForm.html?no=" + no
});

$("#updateBtn").click(function(event) {
  var gongzi = {
	    title: $("#title2").val(),
	    contents: $("#contents").val(),
	    email: $("#email").val(),
	    boardNo: $("#no").val()
		}
  	//console.log(gongzi);
  
  swal({
	  title: '정말 변경하시겠습니까?',
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  cancelButtonText: '취소',
	  confirmButtonText: '변경'
	}).then(function () {
	  swal(
	    '변경되었습니다.'
	  ).then(function () {
		  ajaxUpdateGongzi(gongzi)
	  })
	});
});


function ajaxLoadGongzi(no) {
	$.getJSON(serverAddr + "/board/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		$("#no").val(result.data.boardNo);
		$("#email").val(result.data.email);
		$("#writer").val(result.data.writer);
		$("#title1").text(result.data.title);
		$("#title2").val(result.data.title);
		$("#contents").text(result.data.contents);
		$("#createdDate").val(result.data.createDate);
		$("#viewCount").text(result.data.viewCount);		
	})
}

function ajaxUpdateGongzi(gongzi) {
	$.post(serverAddr + "/board/update.json", gongzi, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		 var no = location.search.split("=")[1];
	     location.href = serverAddr + "/html/board/gongziForm.html?no=" + no
	}, "json")
}








