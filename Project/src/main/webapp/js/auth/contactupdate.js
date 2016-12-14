$("#logoBtn").click(function(event) {
	window.location.href = serverAddr + "/html/index.html"
});

$("#myinfoLink").click(function(event) {
	window.location.href = serverAddr + "/html/dashboard/dashboard.html"
});

$("#myinfo").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#cancelBtn").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

$("#updateBtn").click(function(event) {
	var member = {
//			email: myEmail,
//			password: myPassword,
//			name: myName,
//			birth: myBirth,
//			gender: myGender,
			postNo: $("#postNo").val(),
			basicAddr: $("#basicAddr").val(),
			detailAddr: $("#detailAddr").val(),
			tel: $("#tel").val()
	}
	//console.log(member)
	ajaxUpdateMember(member)

});

function ajaxUpdateMember(member) {
	$.post(serverAddr + "/auth/update.json", member, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		alert("변경성공");
		window.location.href = serverAddr + "/html/auth/myinfo.html"
	}, "json")
}

//회원정보수정 회원데이터 출력
function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}

		$("#postNo").val(result.data.postNo);
		$("#basicAddr").val(result.data.basicAddr);
		$("#detailAddr").val(result.data.detailAddr);
		$("#tel").val(result.data.tel);
		$("#userName1").html(result.data.name);
		$("#userName2").html(result.data.name);
		$("authLevel").html(result.data.name);

		var auth = result.data.auth;

		if (auth == 0) {
			$("#authLevel").html("임대인");
		} else {
			$("#authLevel").html("임차인");
			
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
//		ajaxFirstList();
	})
}

//우편번호 API
function sample6_execDaumPostcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수

			// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				fullAddr = data.roadAddress;

			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				fullAddr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if(data.userSelectedType === 'R'){
				//법정동명이 있을 경우 추가한다.
				if(data.bname !== ''){
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== ''){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('postNo').value = data.zonecode; //5자리 새우편번호 사용
			document.getElementById('basicAddr').value = fullAddr;

			// 커서를 상세주소 필드로 이동한다.
			document.getElementById('detailAddr').focus();
		}
	}).open();
}
