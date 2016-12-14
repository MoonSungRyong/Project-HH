$("#addBtn").click(function(event) {
	var form = $('form')[0];
	var formData = new FormData(form);
	
	ajaxAddGongziFile(formData);
});

$("#cancelBtn").click(function(event) {
	window.location.href = serverAddr + "/html/board/gongzi.html";
});


$(document.body).ready(function() {
    $('.limitation').on('keyup', function() {
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


function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
	    if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
	    	alert("로그아웃 되었습니다.");
	    	window.location.href = serverAddr + "/html/index.html"
	         return
	    }

		console.log(result.data.email);
		console.log(result.data.name);
		
		$(".email").val(result.data.email);
		$(".writer").val(result.data.name);
		
    })
}


function ajaxAddGongziFile(formData) {
	$.ajax({
	    url: serverAddr + "/board/add.json",
	    data: formData,
	    processData: false,
	    contentType: false,
	    type: 'POST',
	    success: function(data){
	    	swal({
				  title: '등록 되었습니다.',
				  confirmButtonColor: '#3085d6',
				  confirmButtonText: '확인'
				}).then(function () {
					  window.location.href = serverAddr + "/html/board/gongzi.html"
				});
	    }
	  });
}








