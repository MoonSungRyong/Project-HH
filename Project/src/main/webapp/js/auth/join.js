// 회원가입 //
 
///////////////////////////////// 체크 시작 /////////////////////////////////
// 이메일 체크
/*$('#email').blur(function() {
	if (validateEmail($("#email").val())) {
		$("#email-check").text("형식에 맞는 이메일 입니다.");
		$("#email-check").css("color", "blue");
	} else if (!$("#email").val()) {
		$("#email-check").text("필수 항목입니다.");
		$("#email-check").css("color", "red");
	} else {
		$("#email-check").text("형식에 맞지 않는 이메일 입니다.");
		$("#email-check").css("color", "red");
	}
});

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}*/

//노드 email
$(document).ready(
		function() {
		$('#email').keyup(function() {
			if ($('#email').val().length > 8) {
			var email = $(this).val();
			// ajax 실행
			$.ajax({
			type : 'POST',
			dataType : "json",
			url : "http://localhost:8000/hh/auth/emailVerify.json",
			crossDomain : true,
			data : {
			email : email
			},
			success : function(obj) {
			if (obj.state == "success") {
			$("#checkedEmail").html("사용 가능한 이메일 입니다.");
			$("#checkedEmail").css("color","blue");
			} else {
			$("#checkedEmail").html("이미 등록된 이메일 입니다.");
			$("#checkedEmail").css("color","red");
			}
				}
			}); // end ajax
			} else {$("#checkedEmail").text("");}
										}); 
					});

// 패스워드 체크
$('#password').blur(function() {
	if ($("#password").val().length >= 8) {
		$("#password-check").text("사용 가능한 패스워드 입니다.");
		$("#password-check").css("color", "blue");
	} else if (!$("#password").val()) {
		$("#password-check").text("필수 항목입니다.");
		$("#password-check").css("color", "red");
	} else {
		$("#password-check").text("패스워드는 8자리 이상 필요합니다.");
		$("#password-check").css("color", "red");
	}
});

// 이름 체크
function validateName(name) {
	var kor = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i;
	return kor.test(name);
}

$('#name').blur(function() {
	if (!$("#name").val()) {
		$("#name-check").text("필수 항목입니다.");
		$("#name-check").css("color", "red");
	} else if (validateName($("#name").val())) {
		$("#name-check").text("한글만 입력 가능합니다.");
		$("#name-check").css("color", "red");
	} else {
		$("#name-check").text("사용 가능한 이름 입니다.");
		$("#name-check").css("color", "blue");
	}
});

// 전화번호 체크

function validateTel(tel) {
	var num = /^\(?([0-1]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/; 
	return !num.test(tel);
}

$('#tel').blur(function() {
	var tel = $("#tel").val();
	if (!tel) {
		$("#tel-check").text("필수 항목입니다.");
		$("#tel-check").css("color", "red");
	} else if (validateTel(tel)) {
		$("#tel-check").text("유효한 번호가 아닙니다.");
		$("#tel-check").css("color", "red");
	} else {
		$("#tel-check").text("사용 가능한 번호 입니다.");
		$("#tel-check").css("color", "blue");
	}
});
	
///////////////////////////////// 체크 끝 /////////////////////////////////

$("#joinBtn").click(function(event) {
	var member = {
	  email: $("#email").val(),
	  name: $("#name").val(),
	  password: $("#password").val(),
	  tel: $("#tel").val(),
	  gender: $("#gender").is(":checked") ? 0 : 1,
	  birth: $("#birth1").val() + '-' + $("#birth2").val() + '-' + $("#birth3").val(),
	  auth: $("#auth").is(":checked") ? 0 : 1
	}
	ajaxAddMember(member)
});



function ajaxAddMember(member) {
	$.post(serverAddr + "/auth/join.json", member, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("회원 가입 실패입니다.");
	    	 return location.href = location.href;
	    }
		swal({
			  title: '가입에 성공했습니다.',
			  confirmButtonColor: '#3085d6',
			  confirmButtonText: '확인'
			}).then(function () {
				window.location.href = serverAddr + "/html/index.html";
			});
	}, "json")
}

//radio
;(function ($) {
  'use strict';
  var instance = 0;
  var beenDisabled = 0;

  var RadioButtons = function (el, opts) {
    var element = $(el).is('[type=radio]') ? $(el) : $(el).find('[type=radio]');
    var alreadyCalled = element.parent().is('label');
    var customClass = opts.customClass ? ' ' + opts.customClass : '';
    var disabled = opts.disabled;
    var textSource = opts.text;
    var destroy = opts.destroy;
    var text = function(el) {
      var textValue = $(el).attr(textSource);

      if (textSource == 'empty') return '';
      else if (!textValue) return 'No text source';
      else if (textSource) return textValue;
    };
    var clicкEvents = function(labels, thisLabel) {
      labels.parent().removeClass('selected');
      $(thisLabel).addClass('selected');
    };
    var destroyPlugin = function(element) {
      if (element.parent().is('label')) {
        element
          .removeAttr('style')
          .parent()
            .off('touchstart.customradio click.customradio')
            .find('span').remove();
        element.unwrap();
      }
    };

    // Hide input radio
    if (destroy) {
      destroyPlugin(element);
      return;
    } else {
      element.css({'position':'absolute', 'top':'0', 'left':'0', 'margin':'0', 'z-index':'-1', 'opacity':'0'});
    }
    // We only need to do this only once
    if (!alreadyCalled) {
      element
        .wrap('<label/>')
        .parent()
          .append('<span>')
          .on('touchstart.customradio click.customradio', function() {
            clicкEvents(element, this);
          })
    }

    // Flexible changes if "customRadio" is called more than once
    element.each(function() {
      var object_number = ++instance;

      $(this)
        .parent()
          .removeAttr('class')
          .addClass('radio_btn radio_' + object_number + customClass)
          .find('span').text(text(this));
    });

    // If we want to disable radio buttons
    if (disabled) {
      beenDisabled++;

      element
        .attr('disabled', true)
          .parent()
            .addClass('disabled')
            .css({'cursor':'not-allowed'})
            .off('touchstart.customradio click.customradio');
    } else {
      element
        .attr('disabled', false)
          .parent()
            .removeClass('disabled')
            .css({'cursor':'pointer'});
    }

    // Return click events if we re-enable buttons
    if (alreadyCalled && beenDisabled != 0) {
      element
        .parent()
          .on('touchstart.customradio click.customradio', function() {
            clicкEvents(element, this);
          });
    }
  };

  $.fn.customRadio = function (options, callback) {
    var opts = $.extend({}, $.fn.customRadio.defaults, options, callback);

    return this.each(function () {
      new RadioButtons($(this), opts);
    });
  }
  $.fn.customRadio.defaults = { text: 'value', customClass: '', disabled: false, destroy: false };

  $('div[data-radio-custom]').customRadio();

})(jQuery);

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();


  