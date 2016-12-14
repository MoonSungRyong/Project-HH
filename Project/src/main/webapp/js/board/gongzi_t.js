/*------------------------------------------- 공통 대쉬보드(꼭 확인하세요!!!!!) ----------------------------------*/
/* [ 대쉬보드 JS 사용법 ]
 * <link rel="stylesheet" type="text/css" href="../../css/dashboard/sseung.css" /> 를 html 에 붙이세요.
 * dashboard.js 에서 [ 공통 대쉬보드 ] 부분을 복사해서 붙여넣어 주세요.
 * 되도록이면 [ 공통 대쉬보드 ] 부분을 수정하지 말아주세요.
 * [ 공통 대쉬보드 ] 부분에 수정 발생시 따로 공지하겠습니다.
 * 감사합니다. 				- 이승도 -
 */
$("#dashboardLink").click(function(event) {
	window.location.href = serverAddr + "/html/dashboard/dashboard_t.html"
});

$("#myInfo").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo_t.html"
});

$("#gongziLink").click(function(event) {
	window.location.href = serverAddr + "/html/board/gongzi_t.html"
});

$("#complainLink").click(function(event) {
	window.location.href = serverAddr + "/html/board/complain_t.html"
});

$("#myinfoLink").click(function(event) {
	window.location.href = serverAddr + "/html/auth/myinfo_t.html"
});

$(document.body).on('click', '.hidden_no', function(event) {
	var clno= $("#hidden_no").val();
	console.log(clno)
	ajaxGongziClickList(clno)
	window.location.href = serverAddr + "/html/board/gongziForm_t.html?no=" + $("#hidden_no").val();
})


//카카오 준비
$(document).ready(function() {
	Kakao.init("bfb48672ff68dbf137c2daffb44adfb0");

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


/*----------------------------------------------------- 로그인 정보 불러오기 -----------------------------------------------------*/
function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}
		//onsole.log(result.data);
		$("#userName1").html(result.data.name);
		$("#userName2").html(result.data.name);
		$("#authLevel").html("임차인");

		//console.log($.isNumeric(result.data.email));

		if($.isNumeric(result.data.email)) {
			if (result.data.phoPath != null && result.data.phoPath != "") {
				$('#myPhoto1').attr('src', result.data.phoPath);
				$('#myPhoto2').attr('src', result.data.phoPath);
			} else {
				$('#myPhoto1').attr('src', '../../images/user_default.png');
				$('#myPhoto2').attr('src', '../../images/user_default.png');
			}
		} else {
			if (result.data.phoPath != null && result.data.phoPath != "") {
				$('#myPhoto1').attr('src', '../../upload/' + result.data.phoPath);
				$('#myPhoto2').attr('src', '../../upload/' + result.data.phoPath);
			} else {
				$('#myPhoto1').attr('src', '../../images/user_default.png');
				$('#myPhoto2').attr('src', '../../images/user_default.png');
			}
		}

		var TEmail = result.data.email;
		console.log(TEmail)      

		$.getJSON(serverAddr + "/build/lemail.json", {"TEmail": TEmail}, function(obj) {
			var result = obj.jsonResult
			console.log(result)
			if (result.state != "success") {
				alert("서버에서 데이터를 가져오는데 실패했습니다.")
				return
			}
			var email = result.data.email;
			ajaxFirstList(email)
			ajaxGongziList(email)
		})
	})
}
/*----------------------------------------------------- /로그인 정보 불러오기 -----------------------------------------------------*/
/*----------------------------------------------------- /공통 대쉬보드(지우지마세요) -----------------------------------------------------*/




function ajaxFirstList(email) {
	$.getJSON(serverAddr + "/board/firstlist.json", {"email": email}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		$("#hidden_no").val(result.data.list[0].boardNo);
		$("#recent_title").html(result.data.list[0].title);
		$("#recent_contents").html(result.data.list[0].contents);
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


//글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
pageLength = 4; /* window.pageLength */

function ajaxGongziList(email) {
	$.getJSON(serverAddr + "/board/list.json", {"pageNo": pageNo, "length": pageLength, "email": email}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		var template = Handlebars.compile($('#trTemplateText').html())	    
		$("#gongziTable").html(template(result.data))

		$(document.body).on('click', '.card1', function(event) {
			var clno= $(this).attr("data-no")
			//console.log(clno)
			ajaxGongziClickList(clno)
			window.location.href = serverAddr + 
			"/html/board/gongziForm_t.html?no=" + $(this).attr("data-no")
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
			var clno= $(this).attr("data-no")
			//console.log(clno)
			ajaxGongziClickList(clno)
			window.location.href = serverAddr + "/html/board/gongziForm_t.html?no=" + $(this).attr("data-no")
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

function ajaxGongziClickList(clno) {
	$.post(serverAddr + "/board/updateVW_CNT.json", {no:clno}, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
	}, "json")
}





