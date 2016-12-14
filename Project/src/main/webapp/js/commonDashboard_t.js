/*------------------------------------------- 공통 대쉬보드(꼭 확인하세요!!!!!) ----------------------------------*/
/* [ 대쉬보드 JS 사용법 ]
 * <link rel="stylesheet" type="text/css" href="../../css/dashboard/sseung.css" /> 를 html 에 붙이세요.
 * dashboard.js 에서 [ 공통 대쉬보드 ] 부분을 복사해서 붙여넣어 주세요.
 * 되도록이면 [ 공통 대쉬보드 ] 부분을 수정하지 말아주세요.
 * [ 공통 대쉬보드 ] 부분에 수정 발생시 따로 공지하겠습니다.
 * 감사합니다. 				- 이승도 -
 */

// 카카오 준비
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
function ajaxDashboardUser() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
       if (result.state != "success") { // 로그아웃 상태일 경우 로그인 상태와 관련된 태그를 감춘다.
          window.location.href = serverAddr + "/html/index.html"
            return
       }
      //console.log(result.data);
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
    })
}
/*----------------------------------------------------- /로그인 정보 불러오기 -----------------------------------------------------*/
/*----------------------------------------------------- /공통 대쉬보드(지우지마세요) -----------------------------------------------------*/