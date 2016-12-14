$("#cancelBtn").click(function(event) {
	window.location.href = serverAddr + "/html/contract/contractMnge.html";
})

$("#deleteBtn").click(function(event) {
	if (location.search.startsWith("?")) {
		var contractNo = location.search.split("=")[1];
	}
	if (confirm("정말 삭제하시겠습니까?") == true) {		
		ajaxDeleteContract(contractNo)
	} else {
		return;
	} 
});

function ajaxLoadContract(no) {
	$.getJSON(serverAddr + "/contract/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}

		$("#email").val(result.data.tenantEmail);
		$("#name").val(result.data.name);
		$("#telePhone").val(result.data.telePhone);
		$("#gender").val(result.data.gender);
		$("#basicAddress").val(result.data.basicAddress);
		$("#rentAmount").val(result.data.rentAmount);
		$("#deposit").val(result.data.deposit);		
		$("#detailAddress").val(result.data.detailAddress);		
		$("#contractDate").val(result.data.contractDate);
		$("#endDate").val(result.data.endDate);
		$("#rentPayDate").val(result.data.rentPayDate);
		$("#utilityPayDate").val(result.data.utilityPayDate);
		$("#contractNo").val(result.data.contractNo);
		if ((result.data.contractType) == 0) {
			$("#contractType").val("월세");
		} else {
			$("#contractType").val("전세");
		}
		$("#file2").attr('src', "../../upload/" + result.data.filename);
		$("#updateBtn").click(function(event) {
			window.location.href = serverAddr + "/html/contract/tenantRegiUpdateForm.html?no=" + no
		})			
	})
}

function ajaxDeleteContract(no) {
	$.getJSON(serverAddr + "/contract/delete.json", {
		no: no,
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}
		location.href = serverAddr + "/html/contract/contractMnge.html"
	})
}




