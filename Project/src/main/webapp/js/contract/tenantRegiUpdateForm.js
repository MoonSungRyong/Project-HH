
$("#cancelBtn").click(function(event) {
	var contractNo = location.search.split("=")[1];	 
	location.href= serverAddr + "/html/contract/viewMyContract.html?no=" + contractNo
});

$(".updateBtn").click(function(event) {
	
	console.log(contractNo)
	
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

	ajaxUpdateContract(formData)
});


function ajaxLoadContract(no) {
	$.getJSON(serverAddr + "/contract/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		$("#contractNo").val(result.data.contractNo);
		$("#buildNo").val(result.data.buildNo);
		$("#tenantEmail").val(result.data.tenantEmail);
		if ((result.data.contractType) == 0) {
			$('input:radio[name="contractType"][value="0"]').prop('checked', true);
		} else {
			$('input:radio[name="contractType"][value="1"]').prop('checked', true);
		}
		$("#deposit").val(result.data.deposit);
		$("#contractDate").val(result.data.contractDate);
		$("#endDate").val(result.data.endDate);
		$("#rentPayDate").val(result.data.rentPayDate);		
		$("#utilityPayDate").val(result.data.utilityPayDate);
		if((result.data.contractStatus) == 0) {
			$('input:radio[name="contractStatus"][value="0"]').prop('checked', true);
		} else if ((result.data.contractStatus) == 1){
			$('input:radio[name="contractStatus"][value="1"]').prop('checked', true);
		} else {
			$('input:radio[name="contractStatus"][value="2"]').prop('checked', true);
		}
	})
}

function ajaxUpdateContract(formData) {
	$.ajax({
		url: serverAddr + "/contract/update.json",
		data: formData,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function(data){
			alert("EE");
			var no = location.search.split("=")[1];
			location.href = serverAddr + "/html/contract/viewMyContract.html?no=" + no
		}
	});		
}








