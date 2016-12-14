function ajaxRealEstateContractList() {
	$.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
			window.location.href = serverAddr + "/html/index.html"
			return
		}
		var tenantEmail = result.data.email;

		$.getJSON(serverAddr + "/contract/list.json", {email: tenantEmail}, function(obj) {
			var result = obj.jsonResult
			//console.log(result.data.list[0])
			if (result.state != "success") {
				alert("서버에서 데이터를 가져오는데 실패했습니다.")
				return

			}
			console.log(result.data);
			var rentPayDate = result.data.list[0].rentPayDate;
			console.log(rentPayDate);
			$("#rentPayDate").html("[ " + rentPayDate + " ]");

			var now = new Date();
			var then = new Date(rentPayDate);
			var dday = then.getTime() - now.getTime();
			dday = Math.floor(dday / (1000 * 60 * 60 * 24));

			$("#dday").html(dday);

		})
	})
}


