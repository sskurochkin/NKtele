const setActiveItem = () => {


	// создаем активность в мобильном меню
	// текущий URL
	const curURL = window.location.pathname;
	// при нажатии на кнопку мобильного меню
	(()=>{
			// два div-а необходимых для раскрытия всего каталога
			const catalogMainToggleOne = document.querySelector('.mob-menu__catalog');
			const catalogMainToggleTwo = document.querySelector('.mob-menu__catalog .js-slam-menu');
	
			// получаем список ссылки на разделы мобильного меню
			const menuLinksList = document.querySelectorAll('.mob-menu__catalog .slam-menu .nav-item > a');
			// прогоняем каждую ссылку в цикле
			menuLinksList.forEach(function (element) {
				// получаем href ссылки
				const sectionHref = element.getAttribute('href');
				if (curURL == sectionHref) { // если он совпадает с url то делаем ссылку активной и раскрываем меню
					element.classList.add('active');
					element.parentNode.classList.add('active');
					element.parentNode.querySelector('.nav-lvl2').classList.add('active');
					catalogMainToggleOne.classList.add('active');
					catalogMainToggleTwo.classList.add('active');
					catalogMainToggleTwo.style.display = 'block';
				} else {
					// если же href раздела не совпадает с url но входит в строку url
					if (curURL.includes(sectionHref)) {
						// получаем все ссылки на подразделы текущего раздела
						const subSections = element.parentNode.querySelectorAll('.nav-lvl2-link');
						// прогоняем каждый подраздел в цикле
						subSections.forEach(function (subElement) {
							// получаем href какждого подраздела
							const subSectionHref = subElement.getAttribute('href');
							// если href совпадает
							if (curURL == subSectionHref) {
								subElement.classList.add('active');
								element.classList.add('active');
								element.parentNode.classList.add('active');
								element.parentNode.querySelector('.nav-lvl2').classList.add('active');
								catalogMainToggleOne.classList.add('active');
								catalogMainToggleTwo.classList.add('active');
								catalogMainToggleTwo.style.display = 'block';
							}
						});
					}
				}
			});
	})();


	(()=>{
		// Делаем активность меню на ПК
		// получаем все li с разделами
		const allSectionsLi = document.querySelectorAll('.slam-menu .nav-item');
		// убираем активность если она есть ДО логики (необходими что бы пофиксить баг когда человек зашел в меню, но не перешел
		// по ссылке и вышел из меню, из-за этого при след открытии будут активны два пункта меню - один на котором остановился курсор до выхода
		// и второй который простовляется логикой ниже)
		allSectionsLi.forEach((section) => {
			section.classList.remove('active');
		});
		// получаем все <a> с сылками на разделы
		const  allLinks = document.querySelectorAll('.slam-menu .nav-item > a');
		// логическая переменная, нужна что бы понять, проставлена ли уже активность у какого-нибудь элемента или нет
		let  bactive = false;
		// перебираем все ссылки
		allLinks.forEach((a, index) => {
			// получаем значение href текущей ссылки
			const linkHref = a.getAttribute('href');
			// сравниваем ссылку с текущим URL
			if (linkHref == curURL) {
				// делаем ссылку активной
				a.parentNode.classList.add('active');
				bactive = true;

			} else {
				if (curURL.includes(linkHref)) {
					// получаем все  <a> ссылки на подразделы
					const allLinkslvl2 = a.parentNode.querySelectorAll('.nav-lvl2-item > a');
					// перебираем все ссылки подразделов
					allLinkslvl2.forEach((alvl2) => {
						// получаем href ссылки подраздела
						const  hrefLvl2 = alvl2.getAttribute('href');
						// сравниваем с текущим URL
						if (hrefLvl2 == curURL) {
							// проставляем активность и разделу и подразделу тоже
							alvl2.parentNode.classList.add('active');
							a.parentNode.classList.add('active');
							bactive = true;
						} else {
							if (curURL.includes(hrefLvl2)) {
								// получаем все ссылки 3-го уровня
								const allLinkslvl3 = alvl2.parentNode.querySelectorAll('.nav-lvl3-link');
								// перебираем их
								allLinkslvl3.forEach((alvl3) => {
									// получаем href
									const hrefLvl3 = alvl3.getAttribute('href');
									// проставляем активность
									if (hrefLvl3 == curURL) {
										bactive = true;
										alvl3.parentNode.classList.add('active');
										a.parentNode.classList.add('active');
									}
								});
							}
						}
					});
				} else {
					// если текущий элемент массива является последним и при этом активность не проставлена
					if (allLinks[index] == allLinks[allLinks.length - 1] && bactive == false) {
						// то проставляем активность самому первому элементу в списке меню
						allLinks[0].parentNode.classList.add('active');
					}
				}
			}
		});

	})();


}



window.addEventListener('load', function () {

	//scrollWidth

	(function () {
		if (document.body.scrollHeight <= window.innerHeight) {
			document.documentElement.style.setProperty('--scrollWidth', 0 + 'px');
		} else {
			let div = document.createElement('div');

			div.style.overflowY = 'scroll';
			div.style.width = '50px';
			div.style.height = '50px';

			// мы должны вставить элемент в документ, иначе размеры будут равны 0
			document.body.append(div);
			let scrollWidth = div.offsetWidth - div.clientWidth;

			div.remove();
			document.documentElement.style.setProperty('--scrollWidth', scrollWidth + 'px');
		}
	})();


	//SLAM CATALOG MENU LOAD

	(() => {
		let isMenuLoaded = false;
		$('.js-popup-catalog').click(async function (ev) {
			ev.stopPropagation();


			if ($(this).hasClass('active')) {
				// $('body').removeClass('slam-menu-active');
				// $('.js-popup-catalog').removeClass('active');
				// $('.header-catalog').removeClass('active');
				// $('.header-catalog').removeClass('bg-on');
				// $('.burger-icon').removeClass('active');
                window.reinit.closeCatalog()
				return;
			}

			const requestUrl = $(this).attr('data-ajax-src');
			const ajaxTarget = $($(this).attr('data-ajax-target'));
			ajaxTarget.addClass('bg-on');
			$('.burger-icon').addClass('active');
            $('body').addClass('slam-menu-active');

            $(this).addClass('active');

			if (!isMenuLoaded) {
				try {
					ajaxTarget.addClass('preloader-block');
					const response = await fetch(requestUrl);
					const html = await response.text();
					ajaxTarget.html(html);
					ajaxTarget.removeClass('preloader-block');

					setTimeout(() => {
						ajaxTarget.addClass('active');
					}, 0)

					isMenuLoaded = true;
					setActiveItem();
					window.reinit.catalogMenu();
                    window.reinit.closeSearch()
				} catch (e) {
					console.log(e);
				}
			} else {
				ajaxTarget.addClass('active');
                window.reinit.closeSearch()
			}


            $(document).on('click keydown',function (ev) {
                if (ev.key === 'Escape') {
                    // $('.burger-icon').removeClass('active');
                    // $('body').removeClass('slam-menu-active');
                    // $('.js-popup-catalog').removeClass('active');
                    // $('.header-catalog').removeClass('active');
                    // $('.header-catalog').removeClass('bg-on');
                    window.reinit.closeCatalog()
                    return
                }

                if (
                    $(ev.target).hasClass('search-results__inner')
                    || $(ev.target).hasClass('header-mid__search')
                    || $(ev.target).closest('.search-results__inner').length
                    || $(ev.target).closest('.header-mid__search').length
                    || $(ev.target).closest('.cookie-notification').length

                ) return;

                window.reinit.closeCatalog()

				// $('.burger-icon').removeClass('active');
				// $('body').removeClass('slam-menu-active');
				// $('.js-popup-catalog').removeClass('active');
				// $('.header-catalog').removeClass('active');
				// $('.header-catalog').removeClass('bg-on');
			})



		})
	})();


	//SLAM MOBILEMENU CATALOG MENU LOAD

	(() => {
		let isMenuLoaded = false;
		$('.js-mobile-catalog').click(async function () {
			const requestUrl = $(this).attr('data-ajax-src');
			const ajaxTarget = $($(this).attr('data-ajax-target'));
			$('.js-mob-menu').addClass('active');
			if (!isMenuLoaded) {
				try {
					$('.js-mob-menu').addClass('preloader');
					// ajaxTarget.addClass('preloader-block');
					const response = await fetch(requestUrl);
					const html = await response.text();
					ajaxTarget.html(html);
					$('.js-mob-menu').removeClass('preloader');
					setActiveItem();
					// ajaxTarget.removeClass('preloader-block');
					isMenuLoaded = true;
					// window.reinit.catalogMenu();

				} catch (e) {
					console.log(e);
				}
			} else {
				// ajaxTarget.addClass('active');
			}
		})


		$('.js-mob-menu-close').click(function () {
			$(this).closest('.js-mob-menu').removeClass('active');
		})

		$('.js-slide-mobile-catalog').click(function () {
			if ($('.js-slam-menu').hasClass('active')) {
				$('.js-slam-menu').slideUp(100);
			} else {
				$('.js-slam-menu').slideDown(100);
			}
			$(this).closest('.mob-menu__catalog').toggleClass('active')
			$('.js-slam-menu').toggleClass('active')
		})



		$(document).on('click', '.js-slam-menu .nav-link .js-nav-toggle', function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			if (!$(this).closest('.nav-item').hasClass('active')) {
				$(this).closest('.nav-item').addClass('active');
			} else {
				$(this).closest('.nav-item').removeClass('active');
			}

		})

		$(document).on('click', '.js-slam-menu .nav-lvl2-link .js-nav-toggle', function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			if (!$(this).closest('.nav-lvl2-item').hasClass('active')) {
				$(this).closest('.nav-lvl2-item').addClass('active');
			} else {
				$(this).closest('.nav-lvl2-item').removeClass('active');
			}

		})

	})();




});

window.reinit.catalogMenu = function () {
	const hoverHanler = (el) => {
		el.addClass('active').siblings().removeClass('active');
		// $('.js-slam-menu .nav-item').removeClass('active');
		// el.addClass('active');
	}

	const hoverHanler2lvl = (el) => {
		$('.js-slam-menu .nav-lvl2-list .nav-lvl2-item').removeClass('active');
		el.addClass('active');
	}
	const hoverHanler3lvl = (el) => {
		$('.js-slam-menu .nav-lvl3-item').removeClass('active');
		el.addClass('active');
	}

	let pageX = 0;
	let currentItem = null;


	$(document).on('mousemove', '.js-slam-menu .nav-list', function (ev) {
		if (pageX == 0) {
			currentItem = $(ev.target).closest('.nav-item');
			pageX = ev.pageX;
		}
		setTimeout(() => {
			pageX = ev.pageX;
		}, 100)
		if (ev.pageX > pageX + 10) {
			return;
		} else {
			if (currentItem[0] == $(ev.target).closest('.nav-item')[0]) return;
			hoverHanler($(ev.target).closest('.nav-item'));
			currentItem = $(ev.target).closest('.nav-item');
		}
	})

	if ($(window).width() <= 1366 && $(window).width() > 768) {
		document.addEventListener('touchend', function (ev) {
			if ($(ev.target).closest('.js-slam-menu .nav-item.has-nav').length != 0) {
				if ($(ev.target).closest('.js-slam-menu .nav-item').hasClass('touch-ev')) {
					return;
				}
				$('.slam-menu .nav-item').removeClass('active');
				$('.slam-menu .nav-item').removeClass('touch-ev');
				$(ev.target).closest('.js-slam-menu .nav-item').addClass('active');
				$(ev.target).closest('.js-slam-menu .nav-item').addClass('touch-ev');
				ev.stopPropagation();
				ev.preventDefault();
			}
		}, { passive: false });
	}

	if ($(window).width() < 1023) {
		$(document).on('click', '.nav-link', function (ev) {
			if ($(ev.target).hasClass('js-nav-toggle')) {
				ev.preventDefault();
				if (!$(this).hasClass('active')) {
					$(this).addClass('active');
					$(this).closest('.nav-item').addClass('active');
				} else {
					$(this).closest('.nav-item').removeClass('active');
					$(this).removeClass('active');
				}
				return;
			}
			if (!$(this).hasClass('active') && $(this).closest('.nav-item').find('.nav-lvl2').length) {
				ev.preventDefault();
			}
			$('.slam-menu .nav-item').removeClass('active');
			$('.slam-menu .nav-link').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.nav-item').addClass('active');
		})

		$(document).on('click', '.nav-lvl2-link', function (ev) {
			if ($(ev.target).hasClass('js-nav-toggle')) {
				ev.preventDefault();
				if (!$(this).hasClass('active')) {
					$(this).addClass('active');
					$(this).closest('.nav-lvl2-item').addClass('active');
				} else {
					$(this).closest('.nav-lvl2-item').removeClass('active');
					$(this).removeClass('active');
				}
				return;
			}
			if (!$(this).hasClass('active') && $(this).closest('.nav-lvl2-item').find('.nav-lvl3').length) {
				ev.preventDefault();
			}
			$(this).closest('.nav-lvl2-item').addClass('active');
			$(this).addClass('active');
		})
	}

}
