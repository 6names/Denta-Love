//@prepros-prepend components/jquery-3.3.1.js
//@prepros-prepend components/jquery-ui.js
//@prepros-prepend components/picturefill.js
//@prepros-prepend components/slick.js
//@prepros-prepend components/tooltipster.bundle.js
//@prepros-prepend components/jquery.inputmask.bundle.js
//@prepros-prepend components/jquery.validate.js
//@prepros-prepend components/messages_ru.min.js
//@prepros-prepend components/jquery.selectBoxIt.js
//@prepros-prepend components/jquery.fancybox.js

$(function () {
    var modalHolder = $("#modal-holder"),
        pageHtml = $("html"),
        pageBody = $("body"),
        scrollBarW = 0;

    function getScrollBarWidth() {
        var inner = document.createElement("p");
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement("div");
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);

        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = "scroll";
        var w2 = inner.offsetWidth;
        if (w1 === w2) w2 = outer.clientWidth;

        document.body.removeChild(outer);

        scrollBarW = (w1 - w2);
    }
    getScrollBarWidth();

    function stopEvents(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function initFunc(parent) {
        // icons sprite
        $("#ui-icons").load("images/ui/ui-icons.html");
        // end of icons sprite

        // hide after load
        var hideItem = $('.hide');
        hideItem.each(function () {
            if (!$(this).is(".visible")) {
                $(this).delay(100).hide();
                $(this).delay(200).addClass('visible');
            }
        });
        // end of hide after load

        // radio & checkbox
        var checkBox = $("input:checkbox"),
            radioBtn = $("input.radio-btn");

        parent.find(checkBox).each(function () {
            $(this).wrap("<span class='checkbox'></span>");
            $(this).change(function () {
                if ($(this).is(":checked")) {
                    $(this).parent().addClass("checked");
                    $(this).parent().parent().addClass("checked");
                } else {
                    $(this).parent().removeClass("checked");
                    $(this).parent().parent().removeClass("checked");
                }
            });

            if ($(this).is(":checked")) {
                $(this).parent().addClass("checked");
                $(this).parent().parent().addClass("checked");
            } else {
                $(this).parent().removeClass("checked");
                $(this).parent().parent().removeClass("checked");
            }
        });

        parent.find(radioBtn).each(function () {
            var groupName = $(this).attr("name") + "-radio";

            $(this).click(function () {
                $('input:radio[name=' + $(this).attr('name') + ']').parent().parent().removeClass('checked');
                $(this).parent().parent().addClass('checked');
            });

            $(this).wrap("<span class='radio " + groupName + "'></span>");
            $(this).change(function () {
                if ($(this).is(":checked")) {
                    $('.' + groupName).removeClass("checked");
                    $(this).parent().addClass("checked");
                } else {
                    $(this).parent().removeClass("checked");
                }
            });
            if ($(this).is(":checked")) {
                $(this).parent().addClass("checked");
            } else {
                $(this).parent().removeClass("checked");
            }
        });
        // end of radio & checkbox

        $("[class*='modal-close']").click(function (e) {
            modalHolder.empty().removeClass("active");
            pageBody.removeClass("modal-open").removeAttr("style");
            stopEvents(e);
        });

        // forms
        $("input[name=phone]").inputmask("+7 (999) 999-99-99", {
            // clearMaskOnLostFocus: false
        });

        $("#modal-request-form").validate({
            errorPlacement: function (error, element) {
            }, /*disable error label*/
            ignore: '', /*do not ignore hidden elements*/
            rules: {
                phone: {
                    required: true
                }
            },
            highlight: function (element) {
                $(element).parent().addClass("error");
                $(element).addClass("error");
            },
            unhighlight: function (element) {
                $(element).parent().removeClass("error");
                $(element).removeClass("error");
            },
            submitHandler: function (form) {
                console.log("Lorem");
                modalHolder.load('modals/confirm-modal.html', function () {
                    pageBody.addClass("modal-open").css("padding-right", scrollBarW);

                    var mod = $('.modal');
                    initFunc(mod);
                    $(this).addClass("active");
                });
            },
            invalidHandler: function (event, validator) {

            }
        });

        $("#request-form").validate({
            errorPlacement: function (error, element) {
            }, /*disable error label*/
            ignore: '', /*do not ignore hidden elements*/
            rules: {
                phone: {
                    required: true
                }
            },
            highlight: function (element) {
                $(element).parent().addClass("error");
                $(element).addClass("error");
            },
            unhighlight: function (element) {
                $(element).parent().removeClass("error");
                $(element).removeClass("error");
            },
            submitHandler: function (form) {
                console.log("Lorem");
                modalHolder.load('modals/confirm-modal.html', function () {
                    pageBody.addClass("modal-open").css("padding-right", scrollBarW);

                    var mod = $('.modal');
                    initFunc(mod);
                    $(this).addClass("active");
                });
            },
            invalidHandler: function (event, validator) {

            }
        });
        // end of forms
    }
    initFunc($(document));

    // modal
    $(".modal-trigger").click(function (e) {
        console.log("ojdoijdowe");
        var target = "modals/" + $(this).attr("data-target") + ".html";
        modalHolder.empty();
        pageBody.addClass("modal-open").css("padding-right", scrollBarW);
        modalHolder.load(target, function () {
            var mod = $(".modal");
            initFunc(mod);
            $(this).addClass("active");
        });
        navClose();
        stopEvents(e);

    });
    // end of modal

    // accordion
    function accordion(trigger, content) {
        trigger.click(function () {

            if ($(this).is(".active")) {
                $(this).removeClass("active");
                $(this).parent().find(content).slideUp("fast");
                $(this).find("span.button-text").toggleClass("hidden");
            } else {
                trigger.removeClass("active");
                content.slideUp("fast");
                $(this).addClass("active");
                $(this).parent().find(content).slideDown("fast");
                $(this).find("span.button-text").toggleClass("hidden");
            }
        });
    }

    function singleAccordion(trigger, content) {
        trigger.click(function () {

            if ($(this).is(".active")) {
                $(this).removeClass("active");
                $(this).parent().find(content).slideUp("fast");
                $(this).find("span.button-text").toggleClass("hidden");
            } else {
                $(this).addClass("active");
                $(this).parent().find(content).slideDown("fast");
                $(this).find("span.button-text").toggleClass("hidden");
            }

            if ($(this).is(".header-feedback-trigger")) {
                navClose();
            }
        });
    }

    function closeFeedback() {
        $(".header-feedback-trigger").each(function () {
            if ($(this).is(".active")) {
                $(".header-feedback-dropdown").slideUp("fast");
                $(this).removeClass("active").find("span.button-text").toggleClass("hidden");
            }
        });
    }

    $(".main").click(function (e) {
        closeFeedback();
        e.stopPropagation();
    });
    // end of accordion

    // sliders
    $(".about-slider-image").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        centerMode: false,
        variableWidth: false,
        fade: false,
        autoplay: false,
        autoplaySpeed: 7000,
        draggable: true,
        swipe: true,
        swipeToSlide: true,
        initialSlide: 0,
        pauseOnHover: true,
        vertical: false,
        focusOnSelect: false,
        accessibility: false,
        touchThreshold: 30
    });

    $(".four-slider").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        centerMode: false,
        variableWidth: false,
        fade: false,
        autoplay: false,
        autoplaySpeed: 7000,
        draggable: true,
        swipe: true,
        swipeToSlide: true,
        initialSlide: 0,
        pauseOnHover: true,
        vertical: false,
        focusOnSelect: false,
        accessibility: false,
        touchThreshold: 30,

        responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 641,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    $(".info-slider").each(function () {
        $(this).slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            centerMode: false,
            variableWidth: false,
            fade: false,
            autoplay: false,
            autoplaySpeed: 7000,
            appendDots: $(this).parent().find(".info-dots"),
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            initialSlide: 0,
            pauseOnHover: true,
            vertical: false,
            focusOnSelect: false,
            accessibility: false,
            touchThreshold: 30
        });
    });
    // end of sliders

    // responsive___________________
    $(window).on("load resize", function () {

        if ($(window).width() + scrollBarW <= 1024) {

        } else {

        }

        if ($(window).width() + scrollBarW <= 768) {

        } else {

        }
    });
    // end of responsive___________

    // fancy
    $('[data-fancybox]').fancybox({
        mobile: {
            clickSlide: function (current) {
                return current.type === 'image' ? 'close' : 'close';
            }
        }
    });
    // end of fancy

    // navigation___________________
    var mobileNavClose = $(".mobile-nav-close"),
        mobileButton = $(".mobile-nav-btn"),
        mobileNav = $(".mobile-nav");

    function navClose() {
        mobileNav.removeClass("active");
        mobileButton.removeClass("active");
        mobileNavClose.removeClass("active");
    }

    function navOpen() {
        mobileNav.addClass("active");
        mobileButton.addClass("active");
        mobileNavClose.addClass("active");
        closeFeedback();
    }

    mobileNavClose.click(function () {
        navClose();
    });

    mobileButton.each(function () {
        $(this).click(function () {
            if ($(this).hasClass("active")) {
                navClose();
            } else {
                navOpen();
            }
        });
    });

    $(window).on("load scroll", function () {
        $(".header").each(function () {
            if ($(window).scrollTop() >= 200) {
                $(this).addClass("fixed");
            } else {
                $(this).removeClass("fixed");
            }
        });
    });

    singleAccordion($(".header-feedback-trigger"), $(".header-feedback-dropdown"));
    // end of navigation___________

    // Browser And Platform Detect_______________
    //noinspection JSUnresolvedVariable
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    iOS && pageHtml.addClass("ios");
    //noinspection JSUndeclaredVariable
    browserDetect = {
        matchGroups: [
            [
                {uaString: "win", className: "win"},
                {uaString: "mac", className: "mac"},
                {uaString: "android", className: "android"},
                {uaString: "linux", className: "linux"}
            ],
            [
                {uaString: "msie", className: "trident"},
                {uaString: "applewebkit", className: "webkit"},
                {uaString: "gecko", className: "gecko"},
                {uaString: "opera", className: "presto"}
            ],
            [
                {uaString: "msie 8.0", className: "ie8"},
                {uaString: "msie 9.0", className: "ie9"},
                {uaString: "msie 10.0", className: "ie10"},
                {uaString: "firefox", className: "firefox"},
                {uaString: "opera", className: "opera"},
                {uaString: "chrome", className: "chrome"},
                {uaString: "safari", className: "safari"},
                {uaString: "unknown", className: "unknown"}
            ]
        ],

        init: function () {
            //noinspection CommaExpressionJS
            return this.detect(), this
        },
        addClass: function (a) {
            //noinspection JSUnusedGlobalSymbols,CommaExpressionJS
            this.pageHolder = document.documentElement, document.documentElement.className += " " + a
        },
        detect: function () {
            for (var a, s = 0; s < this.matchGroups.length; s++) {
                a = this.matchGroups[s];
                for (var e, i = 0; i < a.length; i++) { //noinspection CommaExpressionJS
                    if (e = a[i], "string" === typeof e.uaString) {
                        if (this.uaMatch(e.uaString)) {
                            this.addClass(e.className);
                            break
                        }
                    } else {
                        for (var t = 0, r = !0; t < e.uaString.length; t++) if (!this.uaMatch(e.uaString[t])) {
                            r = !1;
                            break
                        }
                        if (r) {
                            this.addClass(e.className);
                            break
                        }
                    }
                }
            }
        },
        uaMatch: function (a) {
            //noinspection CommaExpressionJS
            return this.ua || (this.ua = navigator.userAgent.toLowerCase()), -1 !== this.ua.indexOf(a)
        }
    }.init();

    // pixel ratio
    //noinspection JSUnresolvedVariable
    var retina = window.devicePixelRatio > 1 ? "retina" : "no-retina";
    pageHtml.addClass(retina);
    // end of pixel ratio

    if (pageHtml.is(".ie8, .ie9")) {
        modalHolder.load("modals/warning-modal.html");
    }
    // end of Browser And Platform Detect_______

    /*modalHolder.load('modals/confirm-modal.html', function () {
        var mod = $('.modal');
        initFunc(mod);
        $(this).addClass("active");
    });*/
});

$(window).on('load', function () {
    $("html").each(function () {
        $(this).addClass("loaded");

        if ($(this).is(".ios") || $(this).is(".android")) {
            $(this).addClass("mobile");
        } else {
            $(this).addClass("desktop");
        }
    });
});