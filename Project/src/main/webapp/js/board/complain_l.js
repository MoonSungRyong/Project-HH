
$(function () { 
    $(".tab_content").hide();
    $(".tab_content:first").show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
        // $(this).addClass("active").css({"color": "darkred","font-weight":
		// "bolder"});
        $(this).addClass("active").css("color", "darkred");
        $(".tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
});


$("#prevBtn").click(function(event) {
	pageNo--;
	ajaxComplainListRsvd1()
});

$("#nextBtn").click(function(event) {
	pageNo++;
	ajaxComplainListRsvd1()
});

$("#prevBtn0").click(function(event) {
	pageNo--;
	ajaxComplainListRsvd0()
});

$("#nextBtn0").click(function(event) {
	pageNo++;
	ajaxComplainListRsvd0()
});


$(document).on('click','.aaa',function(event){
	//console.log("찾아봅니다.");
	//console.log(this.id);
	var superBtn = this.id;
	//console.log('#updateBtn1-' + superBtn);

	$(document).on('click', '#updateBtn1-' + superBtn, function(event){
		var complain = {
				no: superBtn,
				title: $("#title1-" + superBtn).text(),
				contents: $("#complain_conts1-" + superBtn).text(),
		        rsvd: $('#rsvd1-' + superBtn).is(":checked") ? 1 : 0
		        };
		
		console.log(complain);
		
		swal({
			  title: '미처리 민원을 처리했습니까?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  cancelButtonText: '취소',
			  confirmButtonText: '처리'
			}).then(function () {
			  swal(
			    '처리 되었습니다.'
			  ).then(function () {
				  ajaxUpdateComplain(complain)
			  })
			});
	});
});


$(document).on('click','.bbb',function(event){
	//console.log("찾아봅니다.");
	//console.log(this.id);
	var superBtn = this.id;
	//console.log('#updateBtn0-' + superBtn);
	
	$(document).on('click','#updateBtn0-' + superBtn,function(event){
		var complain = {
				no: superBtn,
				title: $("#title0-" + superBtn).text(),
				contents: $("#complain_conts0-" + superBtn).text(),
		        rsvd: $('#rsvd0-' + superBtn).is(":checked") ? 0 : 1
		        }
		
		console.log(complain);
		
		swal({
			  title: '처리 민원을 미처리하겠습니까?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  cancelButtonText: '취소',
			  confirmButtonText: '미처리'
			}).then(function () {
			  swal(
			    '미처리 되었습니다.'
			  ).then(function () {
				  ajaxUpdateComplain(complain)
			  })
			});
	});
});




// 글로벌 변수 = window 프로퍼티
var pageNo = 1, /* window.pageNo */
    pageLength = 6; /* window.pageLength */


function ajaxComplainListRsvd1() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
      // console.log(obj.member.email)
      var userEmail = obj.member.email
    
   $.getJSON(serverAddr + "/complain/list3.json", {
      "pageNo": pageNo,
      "length": pageLength,
      "email" : userEmail
   }, function(obj) {
      var result = obj.jsonResult
      // console.log(result.data)
      if (result.state != "success") {
           alert("서버에서 데이터를 가져오는데 실패했습니다.")
           return
       }
      
       var template = Handlebars.compile($('#trTemplateText').html())
       $("#complainTable").html(template(result.data))
            
       // 현재 페이지 번호를 span 태그에 출력한다.
       pageNo = result.data.pageNo;
       totalPage = result.data.totalPage;
       // console.log(totalPage)
       $('#pageNo').text(pageNo);
       
    // 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
	    if (pageNo <= 1) {
	    	$("#prevBtn").css({ 'pointer-events': 'none' });
	    	$('#prevBtn').addClass("disabled");
	    } else {
	    	$("#prevBtn").css({ 'pointer-events': 'visible' });
	    	$('#prevBtn').removeClass("disabled");
	    } 
	    
	    // 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
	    if (pageNo >= totalPage - 1) {
	    	$("#nextBtn").css({ 'pointer-events': 'none' });
	    	$('#nextBtn').addClass("disabled");
	    } else {
	    	$("#nextBtn").css({ 'pointer-events': 'visible' });
	    	$('#nextBtn').removeClass("disabled");
	    }
    })
   })
}

function ajaxComplainListRsvd0() {
   $.getJSON(serverAddr + "/auth/loginUser.json", function(obj) {
      var result = obj.jsonResult
      var userEmail = obj.member.email
    
   $.getJSON(serverAddr + "/complain/list2.json", {
      "pageNo": pageNo,
      "length": pageLength,
      "email" : userEmail
   }, function(obj) {
      var result = obj.jsonResult
      // console.log(result.data)
      if (result.state != "success") {
           alert("서버에서 데이터를 가져오는데 실패했습니다.")
           return
       }
      
      var template = Handlebars.compile($('#trTemplateText2').html())
       $("#complainTable2").html(template(result.data))
            
       // 현재 페이지 번호를 span 태그에 출력한다.
       pageNo = result.data.pageNo;
       totalPage = result.data.totalPage;
       // console.log(totalPage)
       $('#pageNo').text(pageNo);
       
       
       // 페이지 번호가 1이면 [이전] 버튼을 비활성화시킨다.
   	    if (pageNo <= 1) {
   	    	$("#prevBtn0").css({ 'pointer-events': 'none' });
   	    	$('#prevBtn0').addClass("disabled");
   	    } else {
   	    	$("#prevBtn0").css({ 'pointer-events': 'visible' });
   	    	$('#prevBtn0').removeClass("disabled");
   	    } 
   	    
   	    // 페이지 번호가 마지막 페이지라면 [다음] 버튼을 비활성화시킨다.
   	    if (pageNo >= totalPage - 1) {
   	    	$("#nextBtn0").css({ 'pointer-events': 'none' });
   	    	$('#nextBtn0').addClass("disabled");
   	    } else {
   	    	$("#nextBtn0").css({ 'pointer-events': 'visible' });
   	    	$('#nextBtn0').removeClass("disabled");
   	    }
    })
   })
}

function ajaxUpdateComplain(complain) {
   $.post(serverAddr + "/complain/update.json", complain, function(obj) {
      var result = obj.jsonResult
      if (result.state != "success") {
         alert("변경 실패입니다.")
         return
      }
      window.location.href = "complain_l.html"
   }, "json")
}

