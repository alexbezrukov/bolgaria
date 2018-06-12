
// Modal window//

$('#call-order,#call-order-footer').click(function(e) {
		// e.preventDefault(); --для ссылок a href
		$('#call-order-form').arcticmodal();
		$('.form-btn,.form-cta').click(function(e) {
	 	// e.preventDefault(); --для ссылок a href
		$('#thx').arcticmodal('close');
	 });
	});

// Policy of confidency modal window //

$('.foot__link').click(function(){
	$('#policy').arcticmodal('');
});



//	animated scroll
	$(document).ready(function () {
	$("button.scrollto").click(function () {
		var elementClick = '#' + $(this).attr("data-target").split("#")[1];
			var destination = $(elementClick).offset().top;
			jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
			return false;
		});
	});



//	gamburger menu
	$('.burger').click(function () {
		$('.burger-menu').toggleClass('visible');
		return false;
	});



//	slider
		$('.comments-slider').slick({
			dots: true,
			infinite: false,
			arrows: true,
			slidesToShow: 1,
			adaptiveHeight: false,
			edgeFriction: 0.25,
			responsive: [
				{
				breakpoint: 860,
					settings: {
						arrows: false,
					}
				},
				{
				breakpoint: 480,
					settings: {
						arrows: false,
					}
				}
			],
			prevArrow: '<i class="fa reviews__arrows fa-angle-left" aria-hidden="true"></i>',
			nextArrow: '<i class="fa reviews__arrows fa-angle-right" aria-hidden="true"></i>'
		});


//	form script
	$(document).ready(function () {
		$('[data-submit]').on('click', function(){
			$(this).parent('form').submit();
		})
		$.validator.addMethod(
			"regex",
			function(value, element, regexp) {
				var re = new RegExp(regexp);
				return this.optional(element) || re.test(value);
			},
			"Please check your input."
		);
		function valEl(el){
			el.validate({
				rules:{
					tel:{
						required: true,
						regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
					},
					name:{
						required:true,
						
					},
					email:{
						required: true,
						email: true
					}
				},
				messages:{
					tel:{
						required: 'Поле обязательно для заполнения',
						regex: 'Телефон может содержать символы + - ()'
					},
					name:{
						required: 'Поле обязательно для заполнения',
						regex: 'Имя не может содержать символы и цифры'
					},
					email:{
						required: 'Поле обязательно для заполнения',	
						email: 'Неверный формат E-mail'
					}
				},            
				submitHandler: function (form) {
					$('#loader').fadeIn();
					var $form = $(form);
					var $formId = $(form).attr('id');
					switch($formId){
						case'goToNewPage':
							$.ajax({
								type: 'POST',
								url: $form.attr('action'),
								data: $form.serialize(),
							})
							.always(function (response) {  
								//ссылка на страницу "спасибо" - редирект
								location.href = 'https://wayup.in/lm/landing-page-marathon/success';
								//отправка целей в Я.Метрику и Google Analytics
								ga('send', 'event', 'masterklass7', 'register');
								yaCounter27714603.reachGoal('lm17lead');
							});
							break;
							case'popupResult':
							$.ajax({
								type: 'POST',
								url: $form.attr('action'),
								data: $form.serialize(),
							})
							.always(function (response) {   
								setTimeout(function (){
									$('#call-order-form').fadeOut();
								},400); 
								setTimeout(function (){
									$('.arcticmodal-overlay').fadeOut();
								},400);                   
								setTimeout(function (){
									$('#loader').fadeOut();
								},800);
								setTimeout(function (){
									$('#overlay').fadeIn();
									$form.trigger('reset');
								},1100);
								$('#overlay').on('click', function(e) {
									$('#overlay').fadeOut();
								});
							});
						break;          
					}	       
					return false; 
				}                           
			})
		}       
		$('.js-form').each(function () {
			valEl($(this)); 
		});
	});
