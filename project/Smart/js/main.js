var lastId,
	topMenu = $(".navbar-nav"),
	topMenuHeight = topMenu.outerHeight() + 15,
	// All list items
	menuItems = topMenu.find("a"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function () {
		var item = $($(this).attr("href"));
		if (item.length) {
			return item;
		}
	}),
	locations = [{
			lat: 19.415946,
			lng: -98.152022,
			info: '1',
			contentString: '<p>Мы здесь</p>'
		}, //Мексика, штат Тлакскала, г. Аписако; 
		{
			lat: 50.258974,
			lng: 10.961267,
			info: '2',
			contentString: '<p>Мы здесь</p>'
		}, //Кобург, Германия
		{
			lat: 50.651031,
			lng: 10.669861,
			info: '3',
			contentString: '<p>Мы здесь</p>'
		} //Германия Г. Целла-Мелис
	]

function initMap() {
	var uluru = {
		lat: 49.983293,
		lng: 36.227600
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: uluru
	});
	var contentString = '<p>Мы здесь</p>'
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});

	infowindow.open(map, marker);
};

function initClasterMap(lat, lng) {

	var map = new google.maps.Map(document.getElementById('mapClaster'), {
		zoom: 13,
		center: {
			lat: lat,
			lng: lng
		}
	});

	// Create an array of alphabetical characters used to label the markers.
	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	// Create titel for marker
	var contentString = '<p>Мы здесь</p>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	// Add some markers to the map.
	// Note: The code uses the JavaScript Array.prototype.map() method to
	// create an array of markers based on a given "locations" array.
	// The map() method here has nothing to do with the Google Maps API.
	var markers = locations.map(function (location, i) {
		return new google.maps.Marker({
			position: location,
			label: labels[i % labels.length],
			title: location.info
		});
	});
	// Add a marker clusterer to manage the markers.
	var markerCluster = new MarkerClusterer(map, markers, {
		imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
	});
};

$(document).ready(function () {
	var link = $(".nav-link").on("click", function (e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
		return false;
	});

	var caption = $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});

	var carousel = $('#carouselExampleControls').on('slide.bs.carousel', function (from) {
		var tabs = $(".tabs > div");
	
		$(".tabs > div").each(function (index) {
			if (from.to !== index) {
				$(this).removeClass("active");
			}
			if (from.to == index) {
				if (!$(this).hasClass("active")) {
					$(this).addClass("active");
				}
			}
		});
	});

	var sendmass = $("#send_form").submit(function (e) {
		e.preventDefault();
		var form_data = $(this).serialize();
		var send = $.ajax({
				beforeSend: function () {
					$("#send_mail").prop('disabled', true);
					$("#send_mail").attr('value', '...');
					setTimeout("$('#send_mail').prop('disabled', false).attr('value','Отправить')", 5000);
				},
				type: "POST",
				url: "main.php",
				data: form_data,
				success: function () {
					$('#modal_send').modal('show');
					$('.modal-content > h3').html('Ваше сообщение отправлено');
					setTimeout("$('#modal_send').modal('hide')", 2000);
				}
			})
			.fail(function () {
				$('#modal_send').modal('show');
				$('.modal-content > h3').html('Ошибка отправки сообщения');
				setTimeout("$('#modal_send').modal('hide')", 2000);
			});
	});

	var s = $('.tabs__content .fa.fa-map-marker').on('click', function () {
		var lat = +$(this).attr('data-lat'),
			lng = +$(this).attr('data-lng'),
			modal = $('#modal_map');
	
		modal.modal('show');
		initClasterMap(lat, lng);
	});
	var closeModalMap = $("#close_modal_map");
	closeModalMap.on('click', function(){
		var modal = $('#modal_map');
		modal.modal('hide');
	});
	var youtube = $(".youtube > a");
	
	youtube.on('click', function (e) {
		e.preventDefault();
		var src = $(this).attr('data-src');
		var innerSrc = $("#innerSrc");
		var mod = $("#modal_youtube");
		if (innerSrc.has( "iframe").length != 0){
			$(".iframe").remove();
		};
		innerSrc.append('<iframe width="100%" class="iframe" height="420px" src="' + src + '"' +
			'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		mod.modal('show');
	});
	var closeModalMap = $("#close_modal_youtube");
	closeModalMap.on('click', function(){
		var modal = $('#modal_youtube');
		modal.modal('hide');
	});
});

$(window).scroll(function (e) {
	// Get container scroll position
	var fromTop = $(this).scrollTop() + topMenuHeight;

	// Get id of current scroll item
	var cur = scrollItems.map(function () {
		if ($(this).offset().top < fromTop)
			return this;
	});
	// Get the id of the current element
	cur = cur[cur.length - 1];

	var id = cur && cur.length ? cur[0].id : "";

	if (lastId !== id) {
		lastId = id;
		// Set/remove active class
		menuItems
			.parent().removeClass("active")
			.end().filter("[href='#" + id + "']").parent().addClass("active");
	};
	if ($(this).scrollTop() < 650) {
		$(".navbar").css({
			'transform': 'translateY(-75px)'
		});
	} else {
		$(".navbar").css({
			'transform': 'translateY(0)'
		});
	}
});