$("#addBtn").click(function(event) {
	window.location.href = serverAddr + "/html/board/complainCreate.html";
})
 
$(function () { 
	$(".tab_content").hide();
	$(".tab_content:first").show();

	$("ul.tabs li").click(function () {
		$("ul.tabs li").removeClass("active").css("color", "#333");
		//$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
		$(this).addClass("active").css("color", "darkred");
		$(".tab_content").hide()
		var activeTab = $(this).attr("rel");
		$("#" + activeTab).fadeIn()
	});
});

$(document).on('click','#deleteBtn',function(event){
	if (confirm("정말 삭제하시겠습니까?") == true) {
		ajaxDeleteComplain($("#no").text())
	} else {
		return;
	}  
})

function ajaxDeleteComplain(no) {
	$.getJSON(serverAddr + "/complain/delete.json", {
		no: no
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			console.log("삭제 실패입니다.")
			return
		}
		location.href = "complain_t.html"
	})
}

$("#prevBtn").click(function(event) {
	pageNo--;
	ajaxComplainListRsvd1_t()
});

$("#nextBtn").click(function(event) {
	pageNo++;
	ajaxComplainListRsvd1_t()
});

$("#prevBtn0").click(function(event) {
	pageNo--;
	ajaxComplainListRsvd0_t()
});

$("#nextBtn0").click(function(event) {
	pageNo++;
	ajaxComplainListRsvd0_t()
});


//글로벌 변수 = window 프로퍼티 
var pageNo = 1, /* window.pageNo */
pageLength = 6; /* window.pageLength */


function ajaxComplainListRsvd1_t() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		var userEmail = obj.member.email
		console.log(userEmail);

		$.getJSON(serverAddr + "/complain/list5.json", {
			"pageNo": pageNo,
			"length": pageLength,
			"email" : userEmail
		}, function(obj) {
			var result = obj.jsonResult;
			if (result.state != "success") {
				alert("서버에서 데이터를 가져오는데 실패했습니다.")
				return
			}
			// console.log("서버에서 데이터를 잘 가져옵니다.");
			// console.log("핸들바스를 시작합니다.");
			var rsvd = result.data.list[0].rsvd;
			//console.log(rsvd);

			var template = Handlebars.compile($('#trTemplateText').html())
			//console.log(template);
			$("#complainTable").html(template(result.data))

			//console.log("핸들바스가 끝났습니다.");


			$(document).on('click','#updateBtn1',function(event){
				window.location.href = serverAddr + 
				"/html/board/complainUpdate_t.html?no=" + 
				$(this).attr("data-no1") + "&rsvd=" + rsvd;
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
				//$('#prevBtn').removeClass("disabled");
			} 

			// 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
			if (pageNo >= totalPage) {
				$("#nextBtn").css({ 'pointer-events': 'none' });
				$('#nextBtn').addClass("disabled");
			} else {
				$("#nextBtn").css({ 'pointer-events': 'visible' });
				//$('#nextBtn').removeClass("disabled");
			}
		})
		var TEmail = result.data.email;
		console.log(TEmail)      

		$.getJSON(serverAddr + "/build/lemail.json", {"TEmail": TEmail}, function(obj) {
			var result = obj.jsonResult
			console.log(result)
			var email = result.data;
			console.log(email)
			if (email == null) {
				$("#addBtn").css({ 'pointer-events': 'none' });
				$('#addBtn').addClass("disabled");
			} else {
				$("#addBtn").css({ 'pointer-events': 'visible' });
			} 
		})
	})
}


function ajaxComplainListRsvd0_t() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		var userEmail = obj.member.email

		$.getJSON(serverAddr + "/complain/list4.json", {
			"pageNo": pageNo,
			"length": pageLength,
			"email" : userEmail
		}, function(obj) {
			var result = obj.jsonResult;
			if (result.state != "success") {
				alert("서버에서 데이터를 가져오는데 실패했습니다.")
				return
			}

			var rsvd = result.data.list[0].rsvd;


			var template = Handlebars.compile($('#trTemplateText2').html())
			$("#complainTable2").html(template(result.data))

			$(document).on('click','#updateBtn0',function(event){
				window.location.href = serverAddr + 
				"/html/board/complainUpdate_t.html?no=" + 
				$(this).attr("data-no0") + "&rsvd=" + rsvd;
			})
			// 현재 페이지 번호를 span 태그에 출력한다.
			pageNo = result.data.pageNo;
			totalPage = result.data.totalPage;
			$('#pageNo').text(pageNo);

			// 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
			if (pageNo <= 1) {
				$("#prevBtn0").css({ 'pointer-events': 'none' });
				$('#prevBtn0').addClass("disabled");
			} else {
				$("#prevBtn0").css({ 'pointer-events': 'visible' });
//				$('#prevBtn0').removeClass("disabled");
			} 

			// 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
			if (pageNo >= totalPage - 1) {
				$("#nextBtn0").css({ 'pointer-events': 'none' });
				$('#nextBtn0').addClass("disabled");
			} else {
				$("#nextBtn0").css({ 'pointer-events': 'visible' });
				//$('#nextBtn0').removeClass("disabled");
			}
		})
	})
}
