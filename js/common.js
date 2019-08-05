$(document).ready(function() {


	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#callBackForm").submit(function() {
		if(document.getElementById('phone1').value.length > 6 &&  document.getElementById('phone1').value.length < 12)
		{
			$.ajax({
				type: "GET",
				url: "mail.php",
				data: $("#callBackForm").serialize()
			}).done(function() {			
				alert("Спасибо за заявку!");
				//$(".callBackforma").slideToggle();
				setTimeout(function() {
					$.fancybox.close();
				}, 1000);
			});
			return true;
		}	else{	
			alert("Введите верный номер телефона");
			return false;	
		}		
		
	});

	$("#mainForm").submit(function() {
		if(document.getElementById('phone2').value.length > 6 &&  document.getElementById('phone2').value.length < 12)
		{
		$('.pOut').prop('disabled', false);
		$.ajax({
			type: "POST",
			url: "form.php",
			data: $("#mainForm").serialize()
		}).done(function() {
			$('.pOut').prop('disabled', true);
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return true;
	}	
	else{	
		alert("Введите верный номер телефона");
		return false;	
	}
	});


	$(".mainMenuButton").click(function(){
		$(".menuOpen").slideToggle();
	});

	$(".cancle").click(function(){
		$(".callBackforma").slideToggle();
	});

	$(".backCall").click(function(){
		$(".callBackforma").slideToggle();
	});

	var x =1;

	function plusRow(){
		x=x+1;		

		const input1 = document.createElement('input');
		input1.className="tInput articul";
		input1.type="text";
		input1.name="artic"+x;
		input1.placeholder="Артикульный номер товара";
		input1.autocomplete="off";

		const input2 = document.createElement('input');
		input2.className="tInput count";
		input2.type="text";
		input2.name="count"+x;
		input2.placeholder="Количество";
		input2.autocomplete="off";

		const price = document.createElement('input');
		price.value = '0р.';
		price.className="pOut";
		price.name="price"+x;

		const close = document.createElement('div');
		close.className="close";
		close.id="close"+x;

		const br = document.createElement('br');

		const block = document.createElement('div');
		block.id="Block"+x;
		block.appendChild(input1);
		block.appendChild(input2);
		block.appendChild(price);
		block.appendChild(close);
		block.appendChild(br);

		const LP = document.getElementById('listProducts');
		LP.appendChild(block);

		bindEvents(block);			

		$('.pOut').prop('disabled', true);
	};

	plusRow();

	$(".plus").click(plusRow);

	function bindEvents(B){
		const close = B.querySelector('div.close');
		const articul = B.querySelector('input.articul');
		const count = B.querySelector('input.count');

		close.addEventListener('click', closeRow);

		articul.addEventListener('change', articulChange);
		//articul.addEventListener('keyup', articulChange);
		//articul.addEventListener('click', articulChange);	

		count.addEventListener('change', articulChange);
		//count.addEventListener('keyup', articulChange);
		//count.addEventListener('click', articulChange);	

	};

	function closeRow(){		
		const row = this.parentNode;
		row.parentNode.removeChild(row);
		calc();
	};

	function calc(){
		var itog = 0;	
		var deliv = 0;
		var summ =0;

		var arr = document.getElementsByClassName('pOut');
		for(var i =0; i<arr.length; i++){
			itog += Number(arr[i].value.split('р')[0]);
		}	

		if(itog <= 3500)
		{deliv = 350;}

		if(itog > 3500 && itog <= 10000)
		{deliv = itog*0.09;}

		if(itog > 10000 && itog <= 25000)
		{deliv = itog*0.08;}

		if(itog > 25000 && itog <= 70000)
		{deliv = itog*0.07;}

		if(itog > 70000)
		{deliv = itog*0.06;}

		deliv = parseFloat(deliv.toFixed(0));

		summ = itog+ deliv;

		document.getElementById('products').innerHTML = String(itog);
		document.getElementById('delivery').innerHTML = String(deliv);
		document.getElementById('itog').innerHTML = String(summ);
	};
	

	function funcCount(data){
		$('.articul').prop('disabled', false);
		$('.count').prop('disabled', false);

		if(data==0){
			globalPrice.value = "0р.";
		}
		else{
			console.log(data);
			var count = Number(globalCount.value.replace(/\D+/g,""));
			if(count == 0){
				count = 1;
			}
				globalPrice.value =  data*count+"р.";	//выводим цену
				calc();
			}						
		}
	
	globalPrice;//глобальная переменная для поля цены
	globalCount;//глобальная переменная для количества
	//articul;//глобальная переменная для артикула
	function knowPrice(tovarUrl){
		$.ajax({
			url:"parsing.php",
			type: "POST",
			data: ({urlsite: tovarUrl}),
			dataType:"text",					
			beforeSend: function(){				
				$('.articul').prop('disabled', true);
				$('.count').prop('disabled', true);

				globalPrice.value = "...";
			},
			success: funcCount
		});
	};
	

	function articulChange(){
		var articul = this.parentNode.querySelector('input.articul');
		globalCount = this.parentNode.querySelector('input.count');

		globalPrice= this.parentNode.querySelector('.pOut');//выносим поле цены в глобальную область чтобы изменить в аяксе	
		

		if(articul.value.length>7 && articul.value.length<14){
			knowPrice("http://www.ikea.com/ru/ru/catalog/products/"+articul.value.replace(/\D+/g,"")+"/");							
		}
		//else if(articul.value.length>32 && articul.value.length<120){
		//	knowPrice(articul.value+"/");
		//}
		else{
			globalPrice.value = "0р.";
		};
	};

	


	


	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));

	//Stellar - Parallax Plugin
	//Документация: https://github.com/markdalgleish/stellar.js
	//HTML: <div class="parallax" data-stellar-background-ratio="0.5"></div>
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 40
	});

	//equalheight - одинаковая высота колонок
	//Пример списка элементов:
	//var eqElement = ".cat_container > div, .home_news > div"
	var eqElement = ".element"
	$(window).load(function(){equalheight(eqElement);}).resize(function(){equalheight(eqElement);});

	//Masked Input Plugin
	//Документация: http://digitalbush.com/projects/masked-input-plugin/
	//$("#date").mask("99/99/9999", {placeholder : "mm/dd/yyyy"});

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});
	//Скролл до id, указанного в hash URL
	var elem = window.location.hash;
	if(elem) {
		$.scrollTo(elem, 800, {
			offset: -90
		});
	};

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	function carousel_1() {
		var owl = $(".carousel");
		owl.owlCarousel({
			items : 1,
			loop : true,
			autoHeight : true,
			dots : true,
			singleItem : true
		});
		owl.on("mousewheel", ".owl-wrapper", function (e) {
			if (e.deltaY > 0) {
				owl.trigger("owl.prev");
			} else {
				owl.trigger("owl.next");
			}
			e.preventDefault();
		});
		$(".next_button").click(function() {
			owl.trigger("owl.next");
		});
		$(".prev_button").click(function() {
			owl.trigger("owl.prev");
		});
		owl.on("resized.owl.carousel", function(event) {
			var $this = $(this);
			$this.find(".owl-height").css("height", $this.find(".owl-item.active").height());
		});
		setTimeout(function() {
			owl.find(".owl-height").css("height", owl.find(".owl-item.active").height());
		}, 5000);
	};
	carousel_1();

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	
	
});

// Адаптивные скрипты, которые срабатывают только при определенном разрешении экрана
// Документация: https://github.com/maciej-gurban/responsive-bootstrap-toolkit
(function($, document, window, viewport) {
	function resizeWindow() {
		// $("a").click(function() {
		// 	if (viewport.is("lg")) {
		// 		return false;
		// 	};
		// });
	};
	$(document).ready(function() {
		resizeWindow();
	});
	$(window).bind("resize", function() {
		viewport.changed(function(){
			resizeWindow();
		});
	});
})(jQuery, document, window, ResponsiveBootstrapToolkit);