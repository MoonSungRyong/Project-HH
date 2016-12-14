$("#cancelBtn").click(function(event) {
	// alert("취소")
	window.location.href = serverAddr + "/html/auth/myinfo.html"
});

// 회원정보수정 회원데이터 출력
function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return;

		}

		$("#email").html(result.data.email);
		$("authLevel").html(result.data.name);
		$("#userName1").html(result.data.name);
		$("#userName2").html(result.data.name);

		var auth = result.data.auth;

		if (auth == 0) {
			$("#authLevel").html("임대인");
		} else {
			$("#authLevel").html("임차인");
		}

		if ($.isNumeric(result.data.email)) {
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
				$('#myPhoto1').attr('src',
						'../../upload/' + result.data.phoPath);
				$('#myPhoto2').attr('src',
						'../../upload/' + result.data.phoPath);
				$('#phoPath')
						.attr('src', '../../upload/' + result.data.phoPath);
			} else {
				$('#myPhoto1').attr('src', '../../images/user_default.png');
				$('#myPhoto2').attr('src', '../../images/user_default.png');
				$('#phoPath').attr('src', '../../images/user_default.png');
			}
		}

		var email = result.data.email;

		$("#agreeBtn").click(
				function(event) {
					var building = {
						email : email,
						reID : $(".reID").val(),
						postNo : $(".postNo").val(),
						basicAddr : $(".basicAddr").val(),
						detailAddr : $(".detailAddr").val(),
						reType : $("#radios2-1").is(":checked") ? 0 : 1,
						park : $("#radios2-3").is(":checked") ? 0 : 1
					}

					if (building.reID == "" || building.postNo == ""
							|| building.basicAddr == ""
							|| building.detailAddr == "") {
						// alert("빈공간이 있습니다.");
						swal({
							title : '빈공간이 있습니다.',
							confirmButtonColor : '#3085d6',
							confirmButtonText : '확인',
							type : 'error'
						})
					} else {
						ajaxAddBuilding(building)
					}
				});

		$("#updateBtn").click(function(event) {
			var no = location.search.split("=")[1];
			var buildinging = {
				buildNo : no,
				email : email,
				reID : $(".reID").val(),
				postNo : $(".postNo").val(),
				basicAddr : $(".basicAddr").val(),
				detailAddr : $(".detailAddr").val(),
				reType : $(":input:radio[name=radios2-1]:checked").val(),
				park : $(":input:radio[name=radios2-2]:checked").val()
			}
			swal({
				title : '정말 변경하시겠습니까?',
				type : 'warning',
				showCancelButton : true,
				confirmButtonColor : '#3085d6',
				cancelButtonColor : '#d33',
				confirmButtonText : '변경',
				cancelButtonText : '취소'
			}).then(function() {
				ajaxUpdateBuilding(buildinging)
			})
		});
	})
}

// load함수를 이용하여 core스크립트의 로딩이 완료된 후, 우편번호 서비스를 실행합니다.
daum.postcode.load(function() {
	new daum.Postcode({
		oncomplete : function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
			// 예제를 참고하여 다양한 활용법을 확인해 보세요.
		}
	})/* .open(); */
});

// 우편번호 API
function DaumPostcode() {
	new daum.Postcode({
		oncomplete : function(data) {
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
			if (data.userSelectedType === 'R') {
				// 법정동명이 있을 경우 추가한다.
				if (data.bname !== '') {
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if (data.buildingName !== '') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName
							: data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
			}

			console.log(document.getElementById('address').value);
			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('postcode').value = data.zonecode; // 5자리
			// 새우편번호
			// 사용
			document.getElementById('address').value = fullAddr;

			// 커서를 상세주소 필드로 이동한다.
			document.getElementById('address2').focus();
		}
	}).open();
}

function ajaxAddBuilding(building) {
	$.post(serverAddr + "/build/add.json", building, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("등록 실패입니다.")
			return;

		}
		swal({
			title : '건물이 등록되었습니다.',
			confirmButtonColor : '#3085d6',
			confirmButtonText : '확인'
		}).then(function() {
			window.location.href = serverAddr + "/html/auth/myinfo.html"
		});
	}, "json")
}

function ajaxLoadBuilding(no) {
	$.getJSON(serverAddr + "/build/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return;

		}

		$(".reID").val(result.data.reID);
		$(".postNo").val(result.data.postNo);
		$(".basicAddr").val(result.data.basicAddr);
		$(".detailAddr").val(result.data.detailAddr);
		var reType = result.data.reType;
		var park = result.data.park;
		if (reType == 0) {
			$('input:radio[name=radios2-1]:input[id=radios2-1]').attr(
					"checked", true);
		} else {
			$('input:radio[name=radios2-1]:input[id=radios2-2]').attr(
					"checked", true);
		}

		if (park == 0) {
			$('input:radio[name=radios2-2]:input[id=radios2-3]').attr(
					"checked", true);
		} else {
			$('input:radio[name=radios2-2]:input[id=radios2-4]').attr(
					"checked", true);
		}

	})
}

function ajaxUpdateBuilding(building) {
	$.post(serverAddr + "/build/update.json", building, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return;

		}
		swal({
			title : '건물정보가 변경되었습니다.',
			confirmButtonColor : '#3085d6',
			confirmButtonText : '확인'
		}).then(function() {
			window.location.href = serverAddr + "/html/auth/myinfo.html"
		});
	}, "json")
}

$("#deleteBtn").click(function(event) {
	var no = location.search.split("=")[1];
	swal({
		title : '정말 삭제하시겠습니까?',
		text : "데이터를 되돌릴 수 없습니다.",
		type : 'warning',
		showCancelButton : true,
		confirmButtonColor : '#3085d6',
		cancelButtonColor : '#d33',
		confirmButtonText : '삭제',
		cancelButtonText : '취소'
	}).then(function() {
		ajaxDeleteBuild(no)
	})
});

function ajaxDeleteBuild(no) {
	$.getJSON(serverAddr + "/build/delete.json", {
		no : no
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return;

		}
		swal({
			title : '건물이 삭제되었습니다.',
			confirmButtonColor : '#3085d6',
			confirmButtonText : '확인'
		}).then(function() {
			window.location.href = serverAddr + "/html/auth/myinfo.html"
		});

	})
}
