/*----------------------------------------------------- 공지사항 불러오기 -----------------------------------------------------*/
function ajaxFirstList() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}
		
		var email = result.data.email;
		
		$.getJSON(serverAddr + "/board/firstlist.json", {email: email}, function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("서버에서 데이터를 가져오는데 실패했습니다.")
				return
			}
			//console.log(result.data.list[0]);
			var title = result.data.list[0].title;
			var contents = result.data.list[0].contents;
			var boardNo = result.data.list[0].boardNo;
			$("#gongzi_title").html(title);
			$("#gongzi_contents").html(contents);
	
			$("#gongzi_detail").click(function(event) {
				//alert("공지 디테일");
				window.location.href = serverAddr + "/html/board/gongziForm.html?no=" + boardNo;
			});
		});
	});
}
/*----------------------------------------------------- /공지사항 불러오기 -----------------------------------------------------*/



/*----------------------------------------------------- 세입자 불러오기 -----------------------------------------------------*/
function ajaxTenantList() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}

		var tenantEmail = result.data.email;
		//console.log(tenantEmail);

		$.getJSON(serverAddr + "/contract/tenantList.json", {email: tenantEmail}, function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("서버에서 세입자 데이터를 가져오는데 실패했습니다.")
				return
			}
			console.log(result);
			//alert("서버에서 세입자 데이터를 가져옴 성공!!");
			//console.log(result.data.list)

			var template = Handlebars.compile($('#tenantList').html())       
			$("#tenantListTable").html(template(result.data))   
		})
	})
}
/*----------------------------------------------------- /세입자 불러오기 -----------------------------------------------------*/
function ajaxLoginUserList() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}

		var email = result.data.email;
		ajaxBuildList(email)
		//ajaxBuildReqList(email)
	})
}


function ajaxBuildList(email) {
	$.getJSON(serverAddr + "/build/list.json", {"email": email}, function(obj) {
		var result = obj.jsonResult
		//console.log(result)
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#buildList').html())	    
		$("#buildListTable").html(template(result))

		//$(document.body).on('click', '.contractForm1', function(event) {
		//window.location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + $(this).attr("data-no")
		//})
	})
}

function ajaxBuildReqList(email) {
	$.getJSON(serverAddr + "/build/reqList.json", {"email": email}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.build")
			return
		}

		var template = Handlebars.compile($('#buildReqList').html())	    
		$("#buildReqTable tbody").html(template(result))

	})
}




