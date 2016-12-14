$("#contract_input").click(function(event) {
	window.location.href = serverAddr + "/html/contract/tenantRegiForm.html";
})


function ajaxRealEstateContractList1(no) {
	$.getJSON(serverAddr + "/contract/list1.json", {no: no}, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#crTemplateText1').html())	  
		$("#contractTable1").html(template(result.data))

		$(document.body).on('click', '.contractForm1', function(event) {
			window.location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + $(this).attr("data-no")
		})
	})
}

function ajaxRealEstateContractList2(no) {
	$.getJSON(serverAddr + "/contract/list2.json", {no: no}, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		//console.log(result);
		
		var template = Handlebars.compile($('#crTemplateText2').html())	    
		$("#contractTable2").html(template(result.data))		

		$(document.body).on('click', '.contractForm2', function(event) {
			window.location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + $(this).attr("data-no")
		})
	})
}

function ajaxRealEstateContractList3(no) {
	$.getJSON(serverAddr + "/contract/list3.json", {no: no}, function(obj) {
		var result = obj.jsonResult
		console.log(result)
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#crTemplateText3').html())	    
		$("#contractTable3").html(template(result.data))		

		$(document.body).on('click', '.contractForm3', function(event) {
			window.location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + $(this).attr("data-no")
		 })
	})
}

function ajaxLoginUser() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}

		var email = result.data.email;
		ajaxBuildList(email)
	})
}


function ajaxBuildList(email) {
	$.getJSON(serverAddr + "/build/list.json", {"email": email}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}

		var template = Handlebars.compile($('#buildTemplateText').html())
		$(".buildList").html(template(result))

		$(".buildList_list").click(function(event) {
			var no =  $("input[type=radio][name=buildNo]:checked").val();
			//console.log(no)
			ajaxRealEstateContractList1(no)
			ajaxRealEstateContractList2(no)
			ajaxRealEstateContractList3(no)

		})
	})
}

















