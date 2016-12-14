$("#proUpBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/profileupdate.html";
})

$("#buildUpBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/buildupdate.html";
})

function ajaxBuildList(email) {
	$.getJSON(serverAddr + "/build/list.json", {"email": email}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		
		console.log(result.data);

		var template = Handlebars.compile($('#reTemplateText').html())
		$("#boardTable tbody").html(template(result))

		$(".buildList").click(function(event) {
			window.location.href = serverAddr + "/html/auth/builddelete.html?no=" + $(this).attr("data-no")

		})
	})
}


//회원정보수정 회원데이터 출력
function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}

		$("#email").html(result.data.email);
		$("#name").html(result.data.name);
		$("#gender").html(result.data.gender);
		$("#birth").html(result.data.birth);
		$("#postNo").html(result.data.postNo);
		$("#basicAddr").html(result.data.basicAddr);
		$("#detailAddr").html(result.data.detailAddr);
		$("#tel").html(result.data.tel);
		$("#phoPath").html(result.data.phoPath);
		$("#userName1").html(result.data.name);
		$("#userName2").html(result.data.name);
		$("authLevel").html(result.data.name);

		var auth = result.data.auth;
		var gender = result.data.gender;

		if (gender == 0) {
			$("#gender").html("남자");
		} else {
			$("#gender").html("여자");
		}

		if($.isNumeric(result.data.email)) {
	    	  if (result.data.phoPath != null && result.data.phoPath != "") {
	        	  $('#myPhoto1').attr('src', result.data.phoPath);
	        	  $('#myPhoto2').attr('src', result.data.phoPath);
	        	  $('#phoPath').attr('src', result.data.phoPath);
	          } else {
	        	  $('#myPhoto1').attr('src', '../../images/user_default.png');
	        	  $('#myPhoto2').attr('src', '../../images/user_default.png');
	        	  $('#phoPath').attr('src', '../../images/user_default.png');
	          }
	      } else {
	    	  if (result.data.phoPath != null && result.data.phoPath != "") {
	        	  $('#myPhoto1').attr('src', '../../upload/' + result.data.phoPath);
	        	  $('#myPhoto2').attr('src', '../../upload/' + result.data.phoPath);
	        	  $('#phoPath').attr('src', '../../upload/' + result.data.phoPath);
	          } else {
	        	  $('#myPhoto1').attr('src', '../../images/user_default.png');
	        	  $('#myPhoto2').attr('src', '../../images/user_default.png');
	        	  $('#phoPath').attr('src', '../../images/user_default.png');
	          }
	      }
		
		var email = result.data.email;			
		ajaxBuildList(email);			
	})
}

$("#myInfo").click(function(event) {
	alert("내정보");
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});



$(document).ready(function() {

	$("#logout").click(function(event) {
		alert("로그아웃");
		Kakao.Auth.logout(function(data) {
			if (data) { // 정상적으로 로그아웃이 되면 true가 떨어져서 처리하였습니다.
				window.location.href = serverAddr + "/html/index.html";
			}
		});
	});

	$("#getOut").click(function(event) {
		alert("탈퇴");
		Kakao.API.request({
			url : '/v1/user/unlink',
			success : function(res) {
				alert("탈퇴성공");
				kakaoOut();
				//window.location.href = serverAddr + "/html/index.html";
			}
		});
	});

	function kakaoOut() {
		alert("로그아웃 중...");
		Kakao.Auth.logout(function(data) {
			if (data) { // 정상적으로 로그아웃이 되면 true가 떨어져서 처리하였습니다.
				alert("로그아웃 됨!");
				window.location.href = serverAddr + "/html/index.html";
			}
		});
	}
});



