// /////////////////////////////////////////____Login처리___//////////////////////////////////////////
$("#loginBtn").click(function(event) {
	var user = {
		email : $("#email").val(),
		password : $("#password").val(),
		saveEmail : $("#saveEmail").is(":checked")
	}
	ajaxLogin(user)
});

function ajaxLogin(user) {
	$.ajax({
		url : serverAddr + "/auth/login.json",
		method : "POST",
		dataType : "json",
		data : user,
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("로그인 실패입니다.\n이메일 또는 암호를 확인하세요.")
				return
			}
			
			var category = obj.member.auth;
			if (category == 0) {
				window.location.href = serverAddr
						+ "/html/dashboard/dashboard.html"
			} else {
				window.location.href = serverAddr
						+ "/html/dashboard/dashboard_t.html"
			}
		},
		error : function(msg) {
			alert(msg)
		}
	})
}

function ajaxLogout(user) {
	$.getJSON(serverAddr + "/auth/logout.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success")
	        console.log("로그아웃 실패입니다.")
    })
}

function init() {
	var cookieMap = bit.cookieToObject()
	
	if ("email" in cookieMap) { // cookieMap 객체에 email 이라는 이름의 프로퍼티가 있는가?
		$("#email").val(cookieMap["email"])
		$("#saveEmail").attr("checked", true)
	}
}
//////////////////////////////////____Login처리 끝___////////////////////////////////////


//////////////////////////////////____카카오 Login처리___////////////////////////////////////
$(document).ready(
		function() {
			Kakao.init("bfb48672ff68dbf137c2daffb44adfb0");
			
			function KakaoAutoLogout() {
				console.log("카카오 로그아웃");
				Kakao.Auth.logout(function(data) {
					if(data){	//정상적으로 로그아웃이 되면 true가 떨어져서 처리하였습니다.
			              window.location.href = serverAddr + "/html/index.html";
			        }
				})
			};

			/////////////////////////// 카카오 로그인 토큰 받기 ///////////////////////////
			function createKakaotalkLogin() {
				$("#kakaoLoginBtn").click(function() {
					Kakao.Auth.login({
						persistAccessToken : true,
						persistRefreshToken : true,
						success : function(authObj) {
							getKakaotalkUserProfile();
						},
						fail : function(err) {
							console.log(err);
						}
					});
				});
			}
			
			/////////////////////////// 카카오 로그인 정보 & 최초 설정 ///////////////////////////
			function getKakaotalkUserProfile() {
				Kakao.API.request({
					url : '/v1/user/me',
					success : function(res) {
						var kakao = {
								email: res.id,
								// name: res.properties.nickname,
								password: res.properties.PASSWORD
								// tel: res.properties.TEL,
								// gender: res.properties.GEND,
								// birth: res.properties.BIRTH,
								//auth: res.properties.AUTH
							}
						
						// 카카오 최초 설정 확인 //
						if (res.properties.GEND != null && res.properties.AUTH != null && res.properties.TEL != null
								&& res.properties.BIRTH != null && res.properties.PASSWORD != null) {
							ajaxKakaoLogin(kakao)
			
						} else {
							window.location.href = serverAddr + "/html/auth/kakaoInput.html";
						}
						//window.location.href = serverAddr + "/html/auth/kakaoInput.html";
					},
					fail : function(error) {
						console.log(error);
					}
				})
				//})
			}

			/////////////////////////// 카카오 정보 Objackie DB에 저장 ///////////////////////////
			function ajaxKakaoLogin(kakao) {
				console.log("카카오 ajaxKakaoLogin(kakao)");
				$.ajax({
					url : serverAddr + "/auth/login.json",
					method : "POST",
					dataType : "json",
					data : kakao,
					success : function(obj) {
						var result = obj.jsonResult
						if (result.state != "success") {
							alert("로그인 실패입니다.\n이메일 또는 암호를 확인하세요.")
							return
						}
						console.log(obj);
						var category = obj.member.auth;
						if (category == 0) {
							window.location.href = serverAddr + "/html/dashboard/dashboard.html"
						} else {
							window.location.href = serverAddr + "/html/dashboard/dashboard_t.html"
						}
					},
					error : function(msg) {
						alert("에러 : " + msg)
					}
				})
			}
			
			/////////////////////////// 카카오 토큰 확인 ///////////////////////////
			if (Kakao.Auth.getRefreshToken() != undefined
					&& Kakao.Auth.getRefreshToken().replace(/ /gi, "") != "") {
				getKakaotalkUserProfile();
			} else {
				createKakaotalkLogin();
			}
		});

//////////////////////////////////____카카오 Login처리 끝___////////////////////////////////////






