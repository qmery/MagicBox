
var slickConfig = {
        dots: false,
        slidesToShow: 5,
        infinite: false,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    dots: false,
                    slidesToShow: 4,
                    infinite: false

                }
            },
            {
                breakpoint: 1025,
                settings: {
                    dots: false,
                    slidesToShow: 3,
                    infinite: false
                }
            },
            {
                breakpoint: 769,
                settings: {
                    arrows: false,
                    infinite: false,
                    slidesToShow: 2
                }
            },
            {

                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 2
                }
            },
            {

                breakpoint: 376,
                settings: {
                    arrows: false,
                    slidesToShow: 2
                }
            },
            {

                breakpoint: 325,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            }
        ]
    }

$(window).load(function () {
    // will first fade out the loading animation
    $(".status").fadeOut();
    // will fade out the whole DIV that covers the website.
    $(".preloader").delay(1000).fadeOut("slow");
    $('.carousel').carousel('pause');
});

$(document).ready(function () {

    


    $('.related_video').click(function () {
        $('.mymodal').css('display', 'block');
        $('.video_meta').css('display', 'none');
        $('.meta-social').css('display', 'none');
        $('.tooltip').css('display', 'none');
        $('.video_meta').css('z-index', '108');
    });
    $('.mymodal .fa-times').click(function () {
        $('.mymodal').css('display', 'none');
        $('.video_meta').css('display', 'block');
        $('.meta-social').css('display', 'block');
    });


    $('.video_player .play-button,.video_player .overlay_player').click(function () {
        $('.video_player .overlay_player, .video_meta,.overlay_video,.video_player .top_icon,.meta-social').css('display', 'none');
    });

});

$(document).ready(function () {
    function setHeight() {
        var windowHeight = $(window).innerHeight();
        $('section.video_player').css('height', windowHeight);
        var iframeHeight = $(window).height();
        $('.video_player .video iframe').css('height', iframeHeight);
    };
    setHeight();
    $(window).resize(function () {
        setHeight();
    });
});