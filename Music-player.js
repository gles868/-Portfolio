
// function doFirst() {
//     barsize = parseInt(window.getComputedStyle(player__timelineBar).width);

// }
$(document).ready(function () {
    barsize = parseInt(window.getComputedStyle(player__timelineBar).width);
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', $('.active-song').attr('data-src'));

    var tl = new TimelineMax();
    tl.to('.player__albumImg', 3, {
        rotation: '360deg',
        repeat: -1,
        ease: Power0.easeNone
    }, '-=0.2');
    tl.pause();

    $('.player__play,.playall,.in-play').click(function () {
        if (audioElement.paused) {
            $('.player').addClass('play');
            $(`.player__play i:nth-child(2)`).css(`display`, `block`);
            $(`.player__play i:nth-child(1)`).css(`display`, `none`);
            audioElement.play();
            TweenMax.to('.player__albumImg', 0.2, {
                scale: 1.1,
                ease: Power0.easeNone
            })
            tl.resume();
        } else {
            $('.player').removeClass('play');
            $(`.player__play i:nth-child(2)`).css(`display`, `none`);
            $(`.player__play i:nth-child(1)`).css(`display`, `block`);
            audioElement.pause();
            TweenMax.to('.player__albumImg', 0.2, {
                scale: 1,
                ease: Power0.easeNone
            })
            tl.pause();
        }
    });


    var playhead = document.getElementById("playhead");
    audioElement.addEventListener("timeupdate", function () {
        var duration = this.duration;
        var currentTime = this.currentTime;

        if (!audioElement.ended) {   //影片還沒跑完時，會一直更新progress
            let size = barsize / duration * currentTime;
            playhead.style.width = `${size}px`;
        } else {  //
            playhead.style.width = `0px`;
            audioElement.currentTime = 0;
        }
    });

    var timelineBar = document.querySelector(`.player__timelineBar`);
    var player = document.querySelector(`.player`);
    timelineBar.addEventListener(`click`, function (e) {
        // alert(barsize);
        let mouseX = e.pageX - player.offsetLeft - 10 - timelineBar.offsetLeft;
        playhead.style.width = `${mouseX}px`;

        let newTime = mouseX / (barsize / audioElement.duration);
        audioElement.currentTime = newTime;
    });

    function updateInfo() {
        $('.player__author').text($('.active-song').attr('data-author'));
        $('.player__song').text($('.active-song').attr('data-song'));
    }
    updateInfo();


    $('.player__next,.play-mu,.play,.all-play').click(function () {
        if ($('.player .player__albumImg.active-song').is(':last-child')) {
            $('.player__albumImg.active-song').removeClass('active-song');
            $('.player .player__albumImg:first-child').addClass('active-song');
            $(`.player__play i:nth-child(2)`).css(`display`, `block`);
            $(`.player__play i:nth-child(1)`).css(`display`, `none`);
            audioElement.addEventListener("timeupdate", function () {
                let mouseX = e.pageX - player.offsetLeft - 10 - timelineBar.offsetLeft;
                playhead.style.width = `${mouseX}px`;

                let newTime = mouseX / (barsize / audioElement.duration);
                audioElement.currentTime = newTime;
            });
        } else {
            $('.player__albumImg.active-song').removeClass('active-song').next().addClass('active-song');
            $(`.player__play i:nth-child(2)`).css(`display`, `block`);
            $(`.player__play i:nth-child(1)`).css(`display`, `none`);
            audioElement.addEventListener("timeupdate", function () {
                var duration = this.duration;
                var currentTime = this.currentTime;
                var percentage = (currentTime / duration) * 100;
                playhead.style.width = percentage + '%';
            });
        }
        updateInfo();
        audioElement.setAttribute('src', $('.active-song').attr('data-src'));
        audioElement.play();
    });

    $('.player__prev').click(function () {
        if ($('.player .player__albumImg.active-song').is(':first-child')) {
            $('.player__albumImg.active-song').removeClass('active-song');
            $('.player .player__albumImg:last-child').addClass('active-song');
            $(`.player__play i:nth-child(2)`).css(`display`, `block`);
            $(`.player__play i:nth-child(1)`).css(`display`, `none`);
            audioElement.addEventListener("timeupdate", function () {
                let mouseX = e.pageX - player.offsetLeft - 10 - timelineBar.offsetLeft;
                playhead.style.width = `${mouseX}px`;

                let newTime = mouseX / (barsize / audioElement.duration);
                audioElement.currentTime = newTime;
            });
        } else {
            $('.player__albumImg.active-song').removeClass('active-song').prev().addClass('active-song');
            $(`.player__play i:nth-child(2)`).css(`display`, `block`);
            $(`.player__play i:nth-child(1)`).css(`display`, `none`);
            audioElement.addEventListener("timeupdate", function () {
                var duration = this.duration;
                var currentTime = this.currentTime;
                var percentage = (currentTime / duration) * 100;
                playhead.style.width = percentage + '%';
            });
        }
        updateInfo();
        audioElement.setAttribute('src', $('.active-song').attr('data-src'));
        audioElement.play();
    });
    // 音量
    var volume = document.querySelector(`.volume`);

    volume.addEventListener(`change`, function (e) {
        audioElement.volume = e.currentTarget.value / 100;
    });

    // 播完自動撥放下一首
    audioElement.onended = function () {
        // audioElement.setAttribute('src', $('.active-song').attr('data-src'));
        // audioElement.play();
        if ($('.player .player__albumImg.active-song').is(':last-child')) {
            $('.player__albumImg.active-song').removeClass('active-song');
            $('.player .player__albumImg:first-child').addClass('active-song');
            $(`.player__play i:nth-child(2)`).css(`display`, `block`);
            $(`.player__play i:nth-child(1)`).css(`display`, `none`);
            audioElement.addEventListener("timeupdate", function () {
                let mouseX = e.pageX - player.offsetLeft - 10 - timelineBar.offsetLeft;
                playhead.style.width = `${mouseX}px`;

                let newTime = mouseX / (barsize / audioElement.duration);
                audioElement.currentTime = newTime;
            });
        } else {
            $('.player__albumImg.active-song').removeClass('active-song').next().addClass('active-song');
            $(`.player__play i:nth-child(2)`).css(`display`, `block`);
            $(`.player__play i:nth-child(1)`).css(`display`, `none`);
            audioElement.addEventListener("timeupdate", function () {
                var duration = this.duration;
                var currentTime = this.currentTime;
                var percentage = (currentTime / duration) * 100;
                playhead.style.width = percentage + '%';
            });
        }
        updateInfo();
        audioElement.setAttribute('src', $('.active-song').attr('data-src'));
        audioElement.play();
    }

    // 空白暫停
    $(window).keypress(function (e) {
        if (e.keyCode == 32) {
            // alert();
            if (audioElement.paused) {
                $('.player').addClass('play');
                $(`.player__play i:nth-child(2)`).css(`display`, `block`);
                $(`.player__play i:nth-child(1)`).css(`display`, `none`);
                audioElement.play();
                TweenMax.to('.player__albumImg', 0.2, {
                    scale: 1.1,
                    ease: Power0.easeNone
                })
                tl.resume();
            } else {
                $('.player').removeClass('play');
                $(`.player__play i:nth-child(2)`).css(`display`, `none`);
                $(`.player__play i:nth-child(1)`).css(`display`, `block`);
                audioElement.pause();
                TweenMax.to('.player__albumImg', 0.2, {
                    scale: 1,
                    ease: Power0.easeNone
                })
                tl.pause();
            }
        }
    });




    // 音量靜音
    $('.volume_up,.volume_mute').on('click', function () {
        if (audioElement.muted == false) {
            audioElement.muted = true;
            $(`.volume_mute`).css(`display`, `block`);
            $(`.volume_up`).css(`display`, `none`);
        }
        else {
            audioElement.muted = false;
            $(`.volume_mute`).css(`display`, `none`);
            $(`.volume_up`).css(`display`, `block`);
        }
    });






});
// window.addEventListener('load', doFirst);
