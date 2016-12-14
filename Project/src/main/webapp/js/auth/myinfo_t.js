$("#logoBtn").click(function(event) {
	window.location.href = serverAddr + "/html/index.html"
});

$("#myinfoLink").click(function(event) {
	window.location.href = serverAddr + "/html/dashboard/dashboard_t.html"
});

$("#phoPath").click(function(event) {
	window.location.href = serverAddr + "/html/auth/profileupdate_t.html"
});

$("#proUpBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/profileupdate_t.html"
});

$("#contactUpBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/contactupdate.html"
});

$("#buildUpBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/buildupdate.html"
});

$("#memberUpBtn").click(function(event) {
	alert("탈퇴")
	//window.location.href = serverAddr + ""
});

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
		
		var auth = result.data.auth;
		var gender = result.data.gender;

		if (auth == 0, gender == 0) {
			$("#gender").html("남자");
		} else {
			$("#gender").html("여자");
		}

		if (result.data.phoPath != null && result.data.phoPath != "") {
			$('#phoPath').attr('src', '../../upload/' + result.data.phoPath);
			$('#myPhoto1').attr('src', '../../upload/' + result.data.phoPath);
			$('#myPhoto2').attr('src', '../../upload/' + result.data.phoPath);
		} else {
			$('#phoPath').attr('src', '../../images/user_default.png');
			$('#myPhoto1').attr('src', '../../images/user_default.png');
			$('#myPhoto2').attr('src', '../../images/user_default.png');
		}
		ajaxLoginUser();
	})
}

$("#myInfo").click(function(event) {
	alert("내정보");
	window.location.href = serverAddr + "/html/auth/myinfo_t.html"
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


///*----------------------------------------------------- 로그인 정보 불러오기 -----------------------------------------------------*/
//function ajaxLoginUser() {
//$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
//var result = obj.jsonResult
//if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
//window.location.href = serverAddr + "/html/index.html"
//return
//}

//$("#userName1").html(result.data.name);
//$("#userName2").html(result.data.name);

//var auth = result.data.auth;
//if (auth == 0) {
//$("#authLevel").html("임대인");
//} else {
//$("#authLevel").html("[임차인]");
//}
//})
//}
///*----------------------------------------------------- /로그인 정보 불러오기 -----------------------------------------------------*/
