;(function(jQuery, window, document, undefined) {
	var jQuerywin = jQuery(window);
	var jQuerydoc = jQuery(document);

	var slTimeout;

	var interval;

	var images = []


	var tabletBreakpoint 		= 1199;
	var lastSliderChange 		= 0;
	var sliderOffset 			= 0;
	var jQuerysliderTiles			= null;
	var sliderTiles				= null;
	var isSliding 				= false;

	var lastScrollTop = 0;
	var scrolledY = 0;

	//Animate Sections
	var jQueryanimated = jQuery('.animated');

	var winHeight = jQuerywin.height();
	var winWidth = jQuerywin.width();
	var winScroll = jQuerywin.scrollTop();

	function animateElements() {
		winScroll = jQuerywin.scrollTop();

		if ( jQueryanimated.length === 0 ) {
			return;
		}
	};


	function animate(winST) {
	jQuery('.animate').each(function(){
		var jQuerythis = jQuery(this);

		if (winST + (jQuerywin.outerHeight() / 1.3) > jQuerythis.offset().top) {
			jQuerythis.addClass('animated');
		} else if (winST + (jQuerywin.outerHeight() / 2) < jQuerythis.offset().top) {
			jQuerythis.removeClass('animated');
		}
		});
	}


	var jQueryanimated1 = jQuery('.start-animation');

	function animateElements1() {
		winScroll = jQuerywin.scrollTop();

		if ( jQueryanimated1.length === 0 ) {
			return;
		}
	};


	function animate1(winST) {
	jQuery('.animate').each(function(){
		var jQuerythis = jQuery(this);

		if ( jQuery(window).width() > 767 ) {
			if (winST + (jQuerywin.outerHeight() / 1.3) > jQuerythis.offset().top) {
				jQuerythis.addClass('start-animation');
			} else if (winST + (jQuerywin.outerHeight() / 2) < jQuerythis.offset().top) {
				jQuerythis.removeClass('start-animation');
			}
		} else {
			if (winST + (jQuerywin.outerHeight() / 1.4) > jQuerythis.offset().top) {
				jQuerythis.addClass('start-animation');
			} else if (winST + (jQuerywin.outerHeight() / 2) < jQuerythis.offset().top) {
				jQuerythis.removeClass('start-animation');
			}
		}

		});
	}

	var jQueryanimatedFade = jQuery('.animated-fade');

	function animateElementsFade() {
		winScroll = jQuerywin.scrollTop();

		if ( jQueryanimatedFade.length === 0 ) {
			return;
		}
	};


	function animateFade(winST) {
	jQuery('.animate-fade').each(function(){
		var jQuerythis = jQuery(this);

		if (winST + (jQuerywin.outerHeight() / 1.3) > jQuerythis.offset().top) {
			jQuerythis.addClass('animated-fade');
		} else if (winST + (jQuerywin.outerHeight() / 2) < jQuerythis.offset().top) {
			jQuerythis.removeClass('animated-fade');
		}
		});
	}


	



	var cookieNameTemp = document.cookie;

	var svgs = [];
	var reloadFlag = '?version=';
	var activeSVGidx = 0;
	var jQuerysvgIcons;
	var intervalTemp;

	function animateSVG(idx) {
		var randomNumber = Math.floor(Math.random() * 1000000)
		var newURL = svgs[idx] + reloadFlag + randomNumber;

		jQuerysvgIcons.find('img').eq(idx).attr('src', newURL).addClass('next');

		activeSVGidx++;

		if (activeSVGidx >= svgs.length) {
			activeSVGidx = 0;
		}
	}

	function accordionInit() {
		//Hide the inactive sections
		$('.accordion__section').not('.accordion__section--current').find('.accordion__body').hide()

		//Handle the show/hide logic
		$('.accordion .accordion__section.has-dd').on('click', '.accordion__head', function (event) {
			event.preventDefault();

			$(this).next().stop().slideToggle()
				.parent().toggleClass('accordion__section--current')
			
		});
	}


	jQuery(window).on('load', function() {
		jQuery('.slider-steps .slick-dots li').on('click', function(e) {
			e.preventDefault();

			var jQuerythis = jQuery(this)

			jQuerythis.addClass('active').siblings().removeClass('active')

			jQuery('.slider-steps .steps__image-icons img:nth-child(' + ( jQuerythis.index() + 1 ) + ')').addClass('active').siblings().removeClass('active')
			jQuery('.slider-steps .steps__content h4:nth-child(' + ( jQuerythis.index() + 1 ) + ')').addClass('active').siblings().removeClass('active')

			clearInterval( intervalTemp )

			activeSVGidx = jQuerythis.index()
			
			animateSVG(activeSVGidx);
			
			intervalTemp = setInterval(function() {
				animateSVG(activeSVGidx);
			}, 4000);	
		})

		if ( jQuery(window).width() < 768 ) {
			jQuery('.step-clickable .step__image').add('.step-clickable .step__content h4').on('click', function() {
				jQuery('.btn-search').toggleClass('active')
				jQuery('.popup-search').toggleClass('visible-popup')
			})
		}

	})


	jQuery(window).on('load scroll', function() {

		//Slider Steps
		if ( jQuery('.slider-steps').length ) {
			if ( jQuery('.slider-steps').offset().top - 400 <= jQuerywin.scrollTop() && jQuery('.slider-steps').offset().top + jQuery('.slider-steps').outerHeight() >= jQuerywin.scrollTop() ) {

				if ( !jQuery('.slider-steps').hasClass('animate-slider') ) {

					jQuery('.slider-steps').addClass('animate-slider')
					
					jQuerysvgIcons.find('img').on('load', function() {
						jQuery(this).addClass('active').removeClass('next').siblings().removeClass('active');

						jQuery('.steps h4:nth-child(' + (jQuery(this).index() + 1) + ')').addClass('active').siblings().removeClass('active')
						jQuery('.slider-steps .slick-dots li:nth-child(' + (jQuery(this).index() + 1) + ')').addClass('active').siblings().removeClass('active')

						if (activeSVGidx == 1) {
							jQuery('.slider-steps').removeClass('animate-slider-first');
						}						

						if (activeSVGidx == 0) {
							setTimeout(function() {
								jQuery('.slider-steps').addClass('animate-slider-first')

								setTimeout(function() {
									animateSVG(activeSVGidx);

									intervalTemp = setInterval(function() {
										animateSVG(activeSVGidx);
									}, 4000);
								}, 400);

							}, 4000);

							clearInterval(intervalTemp);
						}
					});

					animateSVG(activeSVGidx);

					intervalTemp = setInterval(function() {
						animateSVG(activeSVGidx);
					}, 4000);
				}
			} else {
			}
				
		}

	});


	jQuerydoc.ready(function() {
		//Check for form validation error
		var locationHrefLength = window.location.href.split('#').length - 1

		if ( window.location.href.split('#')[locationHrefLength] === "form" ) {
			$('body').addClass('body-form-error')

			if ( $('.form-contact').length ) {
				$('body, html').animate({
					scrollTop : $('.form-contact').offset().top
				})
			}
		}

		//WIdget Form Prospectus
		jQuery('.widget-form .widget__head-inner').on('click', function(e) {
			e.preventDefault();

			$(this)
				.closest('.widget-form')
				.toggleClass('active')
				.find('.widget__body')
				.slideToggle()
		})

		jQuery('.intro-aside form').on('submit', function(e) {

			e.preventDefault();
			jQuery('body').addClass('form-submitted');

			var $target = jQuery(this).closest('.intro-aside').next();

			jQuery('body, html').animate({
				scrollTop: $($target).offset().top
			},1000)
		})



		jQuery('.btn-question').on('click', function(e) {
			e.preventDefault();
		})

		$('.accordion .accordion__head').each(function() {
			var $this = $(this);

			if ($this.next('.accordion__body').length ) {
				$this.closest('.accordion__section').addClass('has-dd');
			}
		})

		if ($(window).width() < 1024) {
			$('#qualifications-menu').detach().clone().appendTo('#qualifications-container');

			accordionInit();
		}

		jQuery('.field-def').each(function() {
			var $this = jQuery(this)

			$this.keypress(function(e) {
			    if (e.which !== 0 && e.charCode !== 0) { // only characters
			        var c = String.fromCharCode(e.keyCode|e.charCode);
			        $span = $this.siblings('span').first();
			        $span.text($this.val() + c) ; // the hidden span takes 
			                                        // the value of the input
			        $inputSize = $span.width() ; 
			        jQuery(this).css("width", $inputSize) ; // apply width of the span to the input
			     }
			}) ;

		})
		





		jQuerysvgIcons = jQuery('.steps__image-icons');
		
		jQuerysvgIcons.find('img').each(function() {
			svgs.push(jQuery(this).attr('src'));
		});

		//Incrementor
		jQuery('.incrementor').each(function() {
			var jQuerythis     = jQuery(this);
			var jQuerycontrols = jQuerythis.find('[data-number]');
			var jQueryfield    = jQuery(jQuerycontrols.data('target'));

			jQuerycontrols.on('click', function(e){
				var currNumber = Number(jQueryfield.val());

				e.preventDefault();

				var newVal = parseInt(jQueryfield.val()) + parseInt(jQuery(this).data('number'));
				if (newVal < 10) {
					jQueryfield.val( '0' + newVal);
				} else {
					jQueryfield.val(newVal);
				}
			});
		})

		//Close popup
		jQuerydoc.on('click', '.btn-close-popup', function(e) {
			e.preventDefault();

			 jQuery.magnificPopup.close();
		})

		//Scrollto
		jQuery('.nav-teritary a').on('click', function(e) {
			e.preventDefault();
			var jQuerythis = jQuery(this)

			jQuery('html, body').animate({
				scrollTop: jQuery( jQuerythis.attr('href') ).offset().top
			})
		})

		//Button Big
		jQuerydoc.on('click', '.btn--big', function(e) {
			if ( jQuery(this).closest('.container').find('.services').length ) {
				e.preventDefault();

				jQuery('html, body').animate({
					scrollTop: jQuery('.services').offset().top
				})
			}
		})

		//Button Burger
		jQuery('.btn-burger').on('click', function(e) {
			e.preventDefault();

			jQuery(this).toggleClass('active')
		})

		//Cookie
		if (sessionStorage.getItem('popup') !== 'true') {
			jQuery('.cookie').css('display', 'block')
			sessionStorage.setItem('popup','true');
		}

		//Magnific
		jQuery('.js-popup-iframe').magnificPopup({
			type: 'iframe',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			callbacks: {
			  beforeOpen: function() {
			      var jQuerytriggerEl = jQuery(this.st.el),
			          newClass = jQuerytriggerEl.data("modal-class");
			          if (newClass) {
			            this.st.mainClass = this.st.mainClass + ' ' + newClass;
			          }
			  }
			}
		})

		jQuery('.js-popup-ajax').magnificPopup({
			type: 'ajax',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			callbacks: {
				beforeOpen: function() {
					var jQuerytriggerEl1 = jQuery(this.container)
					var jQuerytriggerEl = jQuery(this.st.el)

					var newClass = jQuerytriggerEl.data("modal-class");
					if (newClass) {
						this.st.mainClass = this.st.mainClass + ' ' + newClass;
					}
				},
				ajaxContentAdded: function() {
					jQuery('.mfp-white').scrollLock()
				}
			}
		})

		//Scrollock
		jQuery('.popup').scrollLock()
		jQuery('.popup--menu').scrollLock()

		if ( jQuery('.popup').hasClass('popup-search') ) {
			jQuery('.popup-search').mCustomScrollbar();
		}

		if ( jQuery('.popup').hasClass('popup-lang') ) {
			jQuery('.popup-lang').mCustomScrollbar();
		}

		if ( jQuery('.popup').hasClass('popup--menu') ) {
			jQuery('.popup--menu').mCustomScrollbar();
		}

		//Tabs
		jQuery('.tabs .tabs__nav a').on('click', function(event) {
			var jQuerytabLink = jQuery(this);
			var jQuerytargetTab = jQuery(jQuerytabLink.attr('href'));

			jQuerytabLink
				.parent()
				.add(jQuerytargetTab)
				.addClass('active')
				.siblings()
				.removeClass('active');

				event.preventDefault();
		});

		//JS Toggle
		jQuery('.js-toggle').on('click', function(e) {
			e.preventDefault();
            jQuery('.popup-toggle').removeClass("visible-popup")
			jQuery( jQuery(this).data('target') ).toggleClass('visible-popup')
        });
        
        jQuery('.btn-close').on('click', function(e) {
			e.preventDefault();
            jQuery('.popup-toggle').removeClass("visible-popup")
        });
        
        jQuery('.menuoverlay').on('click', function(e) {
			e.preventDefault();
            jQuery('.popup-toggle').removeClass("visible-popup")
        });
        

        
		//Close Popup By pressing Esc
		jQuerywin.on('keydown', function(e) {

			if ( e.keyCode === 27 && jQuery('.popup').hasClass('visible-popup') ) {
				jQuery('.popup').removeClass('visible-popup')
				jQuery('.btn-search').removeClass('active')
				jQuery('.btn-lang').removeClass('active')
			}
		})

		//Close Cookie
		jQuery('.cookie .cookie__btn').on('click', function(e) {
			e.preventDefault();

			jQuery(this).closest('.cookie').slideUp()
		})

		//Button Remove
		jQuery('.btn-remove').on('click', function(e) {
			e.preventDefault();

			if ( jQuery(this).closest('.orders').length ) {
				var basketURL = jQuery(this).closest('.orders').data('url') 

				if ( jQuery(this).closest('.orders').find('.order').length - 1 <= 0 ) {
					history.pushState( '', window.location.hash, basketURL);
					location.reload();
				}
			}


			jQuery(this).parent().remove()



		})

		//Autocomplete
		var choices = ['33 Cherry Tree Walk, Stretford, Manchester, M32 9AT', '33 Cherry Tree Drive, Sale, Manchester, M32 5BG', '33 Cher Road, Chorlton, Manchester, M21 8TW', '33 Cherry Hill, Flixton, Manchester, M14 2WS', 'BASIC', 'C', 'C++', 'CSS', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'PowerShell', 'Python', 'Ruby', 'Scala', 'SQL', 'TeX', 'XML'];

		jQuery('.field-autocomplete').autoComplete({
			minChars: 1,
			source: function source(term, suggest) {
				term = term.toLowerCase();



				var suggestions = [];

				for (var i = 0; i < choices.length; i++) {
					if (~choices[i].toLowerCase().indexOf(term))
						suggestions.push(choices[i]);
				}

				suggest(suggestions);
			}
		});

		for (var i = 0; i < choices.length; i++) {
			jQuery('.autocomplete-suggestions ').append( '<div class="autocomplete-suggestion" data-val="' + choices[i] + '" >' + choices[i] + '</div>' )
		}

		if ( jQuery('.autocomplete-suggestions').length ) {
			setTimeout(function() {

				jQuery('.autocomplete-suggestions').css({
					top: jQuery('.field-autocomplete').offset().top + jQuery('.field-autocomplete').outerHeight(),
		            left: jQuery('.field-autocomplete').offset().left,
		            width: jQuery('.field-autocomplete').outerWidth()
				})
			}, 200);
		}

		//Button Search
		jQuery('.btn-search').on('click', function(e) {
			e.preventDefault();
			jQuery('.btn-search').toggleClass('active')
			jQuery('.popup-search').toggleClass('visible-popup')
		})

		//Search Field
		jQuery('.search .search__field').on('keyup', function() {
			var jQuerythis = jQuery(this)

			if ( jQuerythis.val().length > 0 ) {
				jQuerythis.closest('.section-search').find('.results').slideDown()
				jQuerythis.closest('.section-search').find('.search').addClass('active')
			} else {
				jQuerythis.closest('.section-search').find('.results').slideUp()
				jQuerythis.closest('.section-search').find('.search').removeClass('active')
			}
		})

		//Button Clear Field
		jQuery('.search .search__btn-clear').on('click', function(e) {
			jQuery(this).closest('.search').removeClass('active')
			jQuery(this).closest('.section-search').find('.results').slideUp()
		})

		//Button Search
		jQuery('.btn-lang').on('click', function(e) {
			e.preventDefault();
			jQuery('.btn-lang').toggleClass('active')
			jQuery('.popup-lang').toggleClass('visible-popup')
		})

		//Reset field Value
		jQuery('.field-container .ico-cross').on('click', function(e) {
			e.preventDefault();

			jQuery(this).closest('.field-container').removeClass('error-container').find('input').val('')

		})

		//Link Ajax
		jQuerydoc.on('click', '.link-ajax', function(e) {
			e.preventDefault();

			var jQuerythis = jQuery(this)

			jQuery.ajax({
				method : 'GET',
				type   : 'HTML',
				url    : jQuerythis.attr('href'),
				async  : false,
				success: function(response) {
					var jQueryresponse = jQuery(response).find('.container');

					jQuery('body').addClass('animating')
					jQuery('body').addClass('animate-header')

					jQuery('.wrapper').removeClass('wrapper--primary');
					jQuery('.widget-message').addClass('hidden');
					
					jQuery('.nav-bg').removeClass('animate-nav-bg')

					jQuery('.container')
						.empty()
						.append( jQueryresponse.html() )

					jQuerythis.closest('.popup--menu').find('.nav-bg').css('background', jQuery('.intro').css('background-color'))


					if ( jQueryresponse.find('.slider-testimonials').length ) {
						jQuery('.slider-testimonials .slider__slides').slick({
							dots: true,
							autoplay: true,
							autoplaySpeed: 5000
						});
					}

					//TextBlind
					if ( jQuery('.textblind').length ) {
						var words;

						jQuery('.textblind').each(function () {
							var jQuerythis = jQuery(this);
							var jQueryicon = jQuerythis.find('i')

							if (jQueryicon.length) {
								jQueryiconClone = jQueryicon.clone();

								jQueryicon.remove();
							}

							var spanText = jQuery(this).find('span').text();

							words = spanText.split(" ");


							var smallInserted = jQuerythis.html().split(" ").join(" </small><small>");
							var wrapped = '<small>'.concat(smallInserted, '</small>');

							jQuerythis.html(wrapped);
							var refPos = jQuerythis.find('small:first-child').position().top;
							var newPos;

							jQuerythis.find('small').each(function (index) {
								newPos = jQuery(this).position().top;

								if (index == 0) {
									return;
								}

								if (newPos == refPos) {
									jQuery(this).prepend(jQuery(this).prev().text() + " ");
									jQuery(this).prev().remove();
								}

								refPos = newPos;
							});

							jQuerythis.each(function () {
								var jQueryel = jQuery(this),
								    jQuerysmall = jQueryel.children('small'),
								    className = 'blind';

								jQuerysmall.wrap('<small class=' + className + '></small>');

								if (words.length) {
									for (var i = 0; i < words.length; i++) {
										jQuery(this).find('small:contains(' + words[i] + ')').each(function () {
											var newText = jQuery(this).html().replace(words[i], '<span>' + words[i] + '</span>');
											jQuery(this).html(newText);
										});
									}
								}
							});
						});
					}

					setTimeout(function() {
						jQuery('body').addClass('animate-header')
						jQuery('body').addClass('animate-container')
					}, 500);


					setTimeout(function() {
						jQuery('.popup').removeClass('visible-popup')
						history.replaceState( '', window.location.hash, jQuerythis.attr('href'));
					}, 2900);

					setTimeout(function() {
						jQuery('body').removeClass('animating')
						jQuery('.nav-bg').addClass('animate-nav-bg')
					}, 3300);

					setTimeout(function() {
						jQuery('.intro .textblind').addClass('start-animation');
						jQuery('.intro .animate-fade').addClass('animated-fade');
					}, 1700);

					setTimeout(function() {
						jQuery('body').removeClass('animate-header')
						jQuery('body').removeClass('animate-container')

						jQuery('.btn-burger').removeClass('active')

					}, 1400);

				}
			});
		})

		jQuery('.widget-price .widget__link').on('click', function(e) {
			e.preventDefault();

			jQuery('html, body').animate({
				scrollTop: jQuery('.js-aside').offset().top
			})
		})



	});

	var jQueryiconClone;
	var lastScrollTop = 0;

	jQuerywin.on('load', function() {
		//Widget Chat Animation
		if ( jQuery('.widget-chat').length ) {
			setTimeout(function() {
				jQuery('.widget-chat').addClass('widget-animated')
			}, 500);

			setTimeout(function() {
				jQuery('.widget-chat').addClass('hide-message')
			}, 3500);
		}

		//Form Validation
		if( jQuery('.form-validate').length ) {



			jQuery('.form-validate').each(function() {
				var validator = new Validator({
					container 		 : this,
					fieldContainer   : 'form__controls',
					preventSubmit    : true,
					validateFieldsOn : 'blur',
					submitButton     : '.js-btn-submit'
				});
			})

			jQuery('.form-validate .form__field').each(function() {
				var jQuerythis = jQuery(this)

				jQuerythis.on('blur', function() {
					if ( $this.hasClass('error') ) {
						$this
							.closest('.form-validate')
							.addClass('not-valid')
					} else {
						$this
							.closest('.form-validate')
							.removeClass('not-valid')
					}
				})
			})


		}



		jQuery('.slider-steps .slider__slide').each(function() {
			var jQuerythis = jQuery(this)

			images.push( jQuerythis.find('.step__image-inner img').attr('src') )
		})

		if ( jQuery('.popup-search').length ) {
			jQuery('.wrapper > .header').clone(true).insertBefore('.popup-search .popup__inner')
		}

		if ( jQuery('.popup-lang').length ) {
			jQuery('.wrapper > .header').clone(true).insertBefore('.popup-lang .popup__inner')
			jQuery('.wrapper > .footer').clone(true).insertAfter('.popup-lang .popup__inner')
		}

		if ( jQuery('.popup--menu').length ) {
			jQuery('.wrapper > .footer').clone(true).insertAfter('.popup--menu .popup__inner')
		}

		//Animate Elements
		animateElements();
		animate(scrolledY);

		animateElements1();
		animate1(scrolledY);

		animateElementsFade()
		animateFade(scrollY)

		//Animate Intro
		setTimeout(function() {
			jQuery('.intro-animate').addClass('intro-animated')
		}, 200);

		//TextBlind
		if ( jQuery('.textblind').length ) {
			var words;

			jQuery('.textblind').each(function () {
				var jQuerythis = jQuery(this);
				var jQueryicon = jQuerythis.find('i')

				if (jQueryicon.length) {
					jQueryiconClone = jQueryicon.clone();

					jQueryicon.remove();
				}

				var spanText = jQuery(this).find('span').text();

				words = spanText.split(" ");


				var smallInserted = jQuerythis.html().split(" ").join(" </small><small>");
				var wrapped = '<small>'.concat(smallInserted, '</small>');

				jQuerythis.html(wrapped);
				var refPos = jQuerythis.find('small:first-child').position().top;
				var newPos;

				jQuerythis.find('small').each(function (index) {
					newPos = jQuery(this).position().top;

					if (index == 0) {
						return;
					}

					if (newPos == refPos) {
						jQuery(this).prepend(jQuery(this).prev().text() + " ");
						jQuery(this).prev().remove();
					}

					refPos = newPos;
				});

				jQuerythis.each(function () {
					var jQueryel = jQuery(this),
					    jQuerysmall = jQueryel.children('small'),
					    className = 'blind';

					jQuerysmall.wrap('<small class=' + className + '></small>');

					if (words.length) {
						for (var i = 0; i < words.length; i++) {
							jQuery(this).find('small:contains(' + words[i] + ')').each(function () {
								var newText = jQuery(this).html().replace(words[i], '<span>' + words[i] + '</span>');
								jQuery(this).html(newText);
							});
						}
					}
				});
			});

			setTimeout(function () {
				if (jQueryiconClone) {
					jQuery('.textblind .blind:last-child :last-child').append(jQueryiconClone);
				}

				jQuery('.intro .textblind').addClass('start-animation');
			}, 900);
		}


		jQuery('.slider-testimonials .slider__slides').slick({
			dots: true,
			autoplay: true,
			autoplaySpeed: 5000
		});

	}).on('load scroll', function() {
		scrolledY = jQuerywin.scrollTop();

		animate(scrolledY);
		animate1(scrolledY);
		animateFade(scrolledY);

		if ( $('.js-aside').length ) {
			$('.widget-price').toggleClass('active', scrollY > $('.js-aside').offset().top + $('.js-aside').outerHeight() )
		}


	}).on('scroll resize', function(e) {
		jQuery('.js-section-alt').each(function () {
				var jQuerythis = jQuery(this);
				var jQueryholder = jQuerythis.find('.js-aside');
				var stickCondition = scrolledY >= jQuerythis.offset().top + jQueryholder.outerHeight() + 300 && scrolledY < jQuerythis.offset().top + jQuerythis.outerHeight() - jQueryholder.outerHeight();


				var bottomCondition = scrolledY >= jQuerythis.offset().top + jQuerythis.outerHeight() - jQueryholder.outerHeight() - 50;

				


				if (stickCondition) {
					jQuerythis.addClass('stick');
				} else if ( scrolledY <= jQuerythis.offset().top ) {
					jQuerythis.removeClass('stick');
					jQuerythis.removeClass('fade-bottom');
				}

				if (bottomCondition) {
					jQuerythis.addClass('bottom');
				} else {
					jQuerythis.removeClass('bottom');
				}

				var fadeCondition = scrolledY >= jQuerythis.offset().top + jQueryholder.outerHeight() + 200;

				if ( fadeCondition ) {
					jQuerythis.addClass('fade');
				} else {
					jQuerythis.removeClass('fade');
				}

				var fadeConditionBottom = scrolledY <= jQuerythis.offset().top + jQueryholder.outerHeight() + 800;
				
				var removeFade = scrolledY <= jQuerythis.offset().top + jQueryholder.outerHeight() + 300;


				if ( scrolledY <= jQuerythis.offset().top ) {
					jQuerythis.addClass('fixed-top');
				} else {
					jQuerythis.removeClass('fixed-top');
				}

				lastScrollTop = scrolledY;
			});
	})
      

})(jQuery, window, document);
