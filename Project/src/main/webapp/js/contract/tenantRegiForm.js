$("#cancelBtn").click(function(event) {
	window.location.href = serverAddr + "/html/contract/contractMnge.html";
})

$(document.body).ready(function() {
	$('.limitation').on('keyup', function() {
		if($(this).val().length > 200) {
			alert("글자수는 200자 이내로 제한됩니다.!");  
			$(this).val($(this).val().substring(0, 200));
		}
	});
});

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
		
	})
}


$("#addBtn").click(function(event) {
	/*var contract = {
			buildNo: $("#buildNo").val(),
			tenantEmail: $("#tenantEmail").val(),
			contractType: $(":input:radio[name=radio1]:checked").val(),
			deposit: $("#deposit").val(),
			contractDate: $("#contractDate").val(),
			endDate: $("#endDate").val(),
			rentPayDate: $("#rentPayDate").val(),
			utilityPayDate: $("#utilityPayDate").val(),
			contractStatus:	$(":input:radio[name=radio]:checked").val() 		

	}*/
	var buildNo = $("input[type=radio][name=buildNo]:checked").val();
	
	var val1 = $(":input:radio[name=contractType]:checked").val();

	if (val1 == 0) {
		$('input:radio[name=contractType]:input[value=0]').attr("checked", true);
	} else {
		$('input:radio[name=contractType]:input[value=1]').attr("checked", true);
	}

	
	var val2 = $(":input:radio[name=contractStatus]:checked").val();

	if (val2 == 0) {
		$('input:radio[name=contractStatus]:input[value=0]').attr("checked", true);
	} else if (val2 == 1) {
		$('input:radio[name=contractStatus]:input[value=1]').attr("checked", true);
	} else {
		$('input:radio[name=contractStatus]:input[value=2]').attr("checked", true);
	}
    
	//contractStatus:	$(":input:radio[name=radio]:checked").val()


	var form = $('form')[0];
	var formData = new FormData(form);	
	formData.append(buildNo, buildNo)
	
	console.log(formData.get("buildNo"));
	//console.log(formData.get("contractStatus"));
	//console.log(formData.get("contractType"));
	ajaxAddContractFile(formData)
});


/*
function ajaxAddContract(contract) {
	$.post(serverAddr + "/contract/add.json", contract, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("등록 실패입니다.")
			return
		} 
	}, "json")
}
 */

/*
$("#addBtn").click(function(event) {

	var form = $('form')[0] + $('form')[1];
	var formData = new FormData(form);

	ajaxAddContract(formData);
});

 */


function ajaxAddContractFile(formData) {
	$.ajax({
		url: serverAddr + "/contract/add.json",
		data: formData,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data){
			//alert("EE");
			window.location.href = serverAddr + "/html/contract/contractMnge.html"
		}
	});
}













