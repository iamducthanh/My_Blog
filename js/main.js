/* ===================================================================
 * Hola - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

    "use strict";

    var cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: ''   // mailchimp url
    },

        $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Preloader
     * -------------------------------------------------- */
    var ssPreloader = function () {

        $("html").addClass('ss-preload');

        $WIN.on('load', function () {

            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function () {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });

            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


    /* pretty print
     * -------------------------------------------------- */
    var ssPrettyPrint = function () {
        $('pre').addClass('prettyprint');
        $(document).ready(function () {
            prettyPrint();
        });
    };


    /* Move header
     * -------------------------------------------------- */
    var ssMoveHeader = function () {

        var hero = $('.page-hero'),
            hdr = $('header'),
            triggerHeight = hero.outerHeight() - 170;


        $WIN.on('scroll', function () {

            var loc = $WIN.scrollTop();

            if (loc > triggerHeight) {
                hdr.addClass('sticky');
            } else {
                hdr.removeClass('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.addClass('offset');
            } else {
                hdr.removeClass('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.addClass('scrolling');
            } else {
                hdr.removeClass('scrolling');
            }

        });

        // $WIN.on('resize', function() {
        //     if ($WIN.width() <= 768) {
        //             hdr.removeClass('sticky offset scrolling');
        //     }
        // });

    };


    /* Mobile Menu
     * ---------------------------------------------------- */
    var ssMobileMenu = function () {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function (event) {
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function () {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function () {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle();
            }
        });

    };


    /* Masonry
     * ---------------------------------------------------- */
    var ssMasonryFolio = function () {

        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };


    /* photoswipe
     * ----------------------------------------------------- */
    var ssPhotoswipe = function () {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // get items
        $folioItems.each(function (i) {

            var $folio = $(this),
                $thumbLink = $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

            var item = {
                src: $href,
                w: $width,
                h: $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function (i) {

            $(this).on('click', function (e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });

    };


    /* slick slider
     * ------------------------------------------------------ */
    var ssSlickSlider = function () {

        $('.testimonials__slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: "<div class=\'slick-prev\'><i class=\'im im-arrow-left\' aria-hidden=\'true\'></i></div>",
            nextArrow: "<div class=\'slick-next\'><i class=\'im im-arrow-right\' aria-hidden=\'true\'></i></div>",
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    };


    /* Highlight the current section in the navigation bar
     * ------------------------------------------------------ */
    var ssWaypoints = function () {

        var sections = $(".target-section"),
            navigation_links = $(".header-nav li a");

        sections.waypoint({

            handler: function (direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-nav li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });

    };


    /* Stat Counter
     * ------------------------------------------------------ */
    var ssStatCount = function () {

        var statSection = $(".s-stats"),
            stats = $(".stats__count");

        statSection.waypoint({

            handler: function (direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });

                }

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };


    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var ssSmoothScroll = function () {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing', function () {
                window.location.hash = target;
            });

        });
    };


    /* Placeholder Plugin Settings
     * ------------------------------------------------------ */
    var ssPlaceholder = function () {
        $('input, textarea, select').placeholder();
    };


    /* Alert Boxes
     * ------------------------------------------------------ */
    var ssAlertBoxes = function () {

        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });

    };


    /* Contact Form
     * ------------------------------------------------------ */
    var ssContactForm = function () {

        /* local validation */
        $('#contactForm').validate({

            /* submit via ajax */
            submitHandler: function (form) {

                var sLoader = $('.submit-loader');

                $.ajax({

                    type: "POST",
                    url: "inc/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function () {

                        sLoader.slideDown("slow");

                    },
                    success: function (msg) {

                        // Message was sent
                        if (msg == 'OK') {
                            sLoader.slideUp("slow");
                            $('.message-warning').fadeOut();
                            $('#contactForm').fadeOut();
                            $('.message-success').fadeIn();
                        }
                        // There was an error
                        else {
                            sLoader.slideUp("slow");
                            $('.message-warning').html(msg);
                            $('.message-warning').slideDown("slow");
                        }

                    },
                    error: function () {

                        sLoader.slideUp("slow");
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");

                    }

                });
            }

        });
    };


    /* Back to Top
     * ------------------------------------------------------ */
    var ssBackToTop = function () {

        var pxShow = 500,   // height on which the button will show
            fadeInTime = 400,   // how slow/fast you want the button to show
            fadeOutTime = 400,   // how slow/fast you want the button to hide
            scrollSpeed = 300,   // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
            goTopButton = $(".go-top")

        // Show or hide the sticky footer button
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssPrettyPrint();
        ssMoveHeader();
        ssMobileMenu();
        ssMasonryFolio();
        ssPhotoswipe();
        ssSlickSlider();
        ssWaypoints();
        ssStatCount();
        ssSmoothScroll();
        ssPlaceholder();
        ssAlertBoxes();
        ssContactForm();
        ssBackToTop();

    })();


})(jQuery);

function scrv(scrollContent) {
    if (scrollContent == "gioithieuplay") {
        document.getElementById("gioithieu").scrollIntoView({
            block: "start",
            behavior: "smooth",
        });
        audio();
    }
    document.getElementById(scrollContent).scrollIntoView({
        block: "start",
        behavior: "smooth",
    });
}


p = 0;
function loopstart() {
    for (i = 0; i < audioControl.length; i++) {
        if (!audioControl[i].paused) {
            if (p < 1) {
                context = new AudioContext();
                depzai = context.createAnalyser();
                source = context.createMediaElementSource(audioControl[i]);
                source.connect(depzai);
                depzai.connect(context.destination);
                p = 1;
            }
            loop("audioControl[" + i + "]");

            // return;
        }
    }
}

// var audioControl = document.getElementsByClassName("audioControl");
// var audioo = document.getElementsByClassName("boxMusic");
function nextpre(play) {
    for (i = 1; i <= audioControl.length; i++) {
        if (play == "next") {
            if (audioControl[i - 1].duration > 0 && !audioControl[i - 1].paused) {
                if (i == audioControl.length) {
                    audioControl[i - 1].pause();
                    audioControl[0].play();
                    // console.log('next to 0');
                    // console.log(audioControl[i]);
                    audioo[i - 1].style.bottom = "-8%";
                    audioo[i - 1].style.opacity = "0";
                    audioo[0].style.bottom = "9%";
                    audioo[0].style.opacity = "1";
                    loopstart();
                } else {
                    audioControl[i - 1].pause();
                    audioControl[i].play();
                    // console.log('next to +1');
                    // console.log(audioControl[i]);
                    audioo[i - 1].style.bottom = "-8%";
                    audioo[i - 1].style.opacity = "0";
                    audioo[i].style.bottom = "9%";
                    audioo[i].style.opacity = "1";
                    loopstart();
                }
                break;
            }
        } else {
            if (audioControl[i - 1].duration > 0 && !audioControl[i - 1].paused) {
                if (i == 1) {
                    audioControl[0].pause();
                    audioControl[audioControl.length - 1].play();
                    // console.log('pre to final');
                    // console.log(audioControl[i]);
                    audioo[0].style.bottom = "-8%";
                    audioo[0].style.opacity = "0";
                    audioo[audioControl.length - 1].style.bottom = "9%";
                    audioo[audioControl.length - 1].style.opacity = "1";
                    loopstart();
                } else {
                    audioControl[i - 1].pause();
                    audioControl[i - 2].play();
                    // console.log('pre to -1');
                    // console.log(audioControl[i]);
                    audioo[i - 1].style.bottom = "-8%";
                    audioo[i - 1].style.opacity = "0";
                    audioo[i - 2].style.bottom = "9%";
                    audioo[i - 2].style.opacity = "1";
                    loopstart();
                }
                break;
            }
        }
    }
    var audio111 = document.getElementsByClassName('audioControl');

    audio111[0].addEventListener('ended', function () {
        console.log('done');
    });
}

// AOS.init();
// var x = 0;
function audio() {
    if (x != 0) {
        // document.getElementById('audio').pause();
        for (i = 0; i < audioControl.length; i++) {
            audioControl[i].pause();
            audioo[i].style.bottom = "-8%";
            audioo[i].style.opacity = "0";
        }
        // document.getElementById('myVideo').style.zIndex = "-10";
        // document.getElementById('myVideo').pause();
        document.getElementById("play").style.display = "unset";
        document.getElementById("img").style.backgroundColor =
            "rgba(0, 0, 0, 0.377)";
        document.getElementById("img").style.boxShadow = "unset";
        document.getElementById("img").style.zIndex = "unset";
        document.getElementById("img").style.height = "360px";
        document.getElementById("img").style.width = "360px";
        document.getElementById("imgin").style.height = "360px";
        document.getElementById("img").style.marginRight = "30px";
        document.getElementById("zIn").style.display = "unset";
        document.getElementById("boxMusic").style.bottom = "-8%";
        document.getElementById("boxMusic").style.opacity = "0";
        document.getElementById("img").classList.remove("rotate");
        document.getElementById("bgGif").style.background = "";
        // document.getElementById('bgGif').style.backgroundSize = "unset";
        document.getElementById("bgGif").style.backgroundAttachment = "unset";
        // document.getElementById("bgGif").style.backgroundColor = "none";
        x = 0;
    } else {
        document.getElementById("audio").play();
        // document.getElementById('myVideo').style.zIndex = "10000";
        // document.getElementById('myVideo').play();
        document.getElementById("play").style.display = "none";
        document.getElementById("img").style.backgroundColor =
            "rgba(255, 255, 255, 0.493)";
        document.getElementById("img").style.boxShadow =
            "0px 0px 5px white, 0px 0px 20px white, 0px 0px 50px white,0px 0px 100px white, 0px 0px 150px white";
        document.getElementById("img").style.zIndex = "11000";
        document.getElementById("img").style.height = "400px";
        document.getElementById("img").style.width = "400px";
        document.getElementById("imgin").style.height = "400px";
        document.getElementById("img").style.marginRight = "0px";
        document.getElementById("zIn").style.display = "none";
        document.getElementById("boxMusic").style.bottom = "9%";
        document.getElementById("boxMusic").style.opacity = "1";
        document.getElementById("img").classList.add("rotate");
        document.getElementById("bgGif").style.background =
            "url('gif/source.gif') center center";
        document.getElementById("bgGif").style.backgroundAttachment = "fixed";
        x = 1;

        loopstart();
    }

}

var y = 0;
function turnlight(z) {
    if (document.getElementById(z).style.opacity == "1") {
        document.getElementById(z).style.opacity = "0";
    } else {
        document.getElementById(z).style.opacity = "1";
    }
    if (
        document.getElementById("c1").style.opacity == "1" &&
        document.getElementById("c2").style.opacity == "1"
    ) {
        document.getElementById("gioithieu").style.backgroundColor =
            "rgba(255, 172, 172, 0.356)";
        // switchLight();
    } else {
        document.getElementById("gioithieu").style.backgroundColor =
            "rgba(37, 35, 35, 0.24)";
    }
}

function switchLight() {
    document.getElementById("click").play();
    if (
        (document.getElementById("c1").style.opacity == "1") |
        (document.getElementById("c2").style.opacity == "1")
    ) {
        document.getElementById("c1").style.opacity = "0";
        document.getElementById("c2").style.opacity = "0";
        document.getElementById("bass").pause();
    } else {
        document.getElementById("c1").style.opacity = "1";
        document.getElementById("c2").style.opacity = "1";
        document.getElementById("bass").play();
    }

    if (
        document.getElementById("c1").style.opacity == "1" &&
        document.getElementById("c2").style.opacity == "1"
    ) {
        document.getElementById("gioithieu").style.backgroundColor =
            "rgba(255, 172, 172, 0.356)";
    } else {
        document.getElementById("gioithieu").style.backgroundColor =
            "rgba(37, 35, 35, 0.24)";
    }
}
var avgCheck = 0;
function loop(x) {
    if (avgCheck > 20) {
        document.getElementById("img").style.boxShadow = "unset";
        document.getElementById("BgColor").style.backgroundColor = "unset";
        avgCheck = 0;
        return false;
    } else {
        window.requestAnimationFrame(loop);
        fbc = new Uint8Array(depzai.frequencyBinCount);
        depzai.getByteFrequencyData(fbc);
        avg = fbc.reduce((a, b) => a + b, 0) / fbc.length;

        document.getElementById("img").style.height = (avg + 240) * 1.5 + "px";
        document.getElementById("img").style.width = (avg + 240) * 1.5 + "px";
        document.getElementById("imgin").style.height =
            (avg + 240) * 1.5 + 20 + "px";
        document.getElementById("img").style.boxShadow =
            "0px 0px 5px white, 0px 0px 20px white, 0px 0px " +
            (avg + 50) +
            "px white,0px 0px " +
            (avg + 150) +
            "px white, 0px 0px " +
            (avg + 150) +
            "px white";
        document.getElementById("BgColor").style.backgroundColor = "rgb(" + avg * 1.7 + "," + avg * 2 + "," + avg * 3 + ")";

        if (avg == 0) {
            avgCheck++;
        }
        // console.log(avgCheck);
        console.log(avg);
    }
}

  // document.getElementById('img').onclick()= () =>{
