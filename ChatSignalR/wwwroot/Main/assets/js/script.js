$(document).ready(function () {
    $(".menuToggle").show();
    $('.new-message').hide();
    $("#images").hide();
    $(".reply-input").hide();
    $(".like-icon").hide();
    $('.nice-select').niceSelect();
    $('.search-popup').hide();
    $('.search-desktop').hide();
   
    $(document).on("click", ".click-me", (e) => {
        $(".reply-input").hide();
        if ($(e.target).hasClass("active")) {
            $(e.target).removeClass("active");
            $(e.target).parents(".set").find(".forum-content").slideUp(200);
        } else {
            $(e.target).addClass("active");
            $(e.target).parents(".set").find(".forum-content").slideDown(200);
            $(e.target).parents(".set").siblings().find(".forum-content").slideUp(200);
        }
    });
    $(".forum-img-div:nth-of-type(n+6)").hide();
    $(document).on("click", ".loadMore", function (event) {
        console.log(event.target)
        if ($(event.target).hasClass("active")) {
            $(event.target).removeClass("active");
            $(event.target).parents(".set").find(".forum-img-div:nth-of-type(n+6)").hide();
        }
        else {
            $(event.target).addClass("active");
            $(event.target).parents(".set").find(".forum-img-div:nth-of-type(n)").show();
        }
    });
    $("a.transition").click(function (event) {
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(200, redirectPage);
    });
    $(".new-msg-btn").click(function (event) {
        var newWindowWidth = $(window).width();
        if (newWindowWidth > 767) {
            $(".chat-wrapper").css("height", "503px");
        }
        if (newWindowWidth < 767) {
            $('.old-message').show();
            $('.new-message').hide();
            $('.users-msg-prev').hide();
            $('.type-msg-settings').hide();
        }
        $('.old-message').hide();
        $('.new-message').show();
    });
    $(".img-text").on('click', function (e) {

        var newWindowWidth = $(window).width();
        if (newWindowWidth > 767) {
            $(".chat-wrapper").css("height", "474px");
        }
        if (newWindowWidth < 767) {
            $('.old-message').show();
            $('.new-message').hide();
            $('.users-msg-prev').hide();
            $('.type-msg-settings').hide();
        }
        $('.old-message').show();
        $('.new-message').hide();
    });
    $(".back-to-msgs").click(function (event) {
        $('.type-msg-settings').show();
        $('.users-msg-prev').show();
        $('.new-message').hide();
        $('.old-message').hide();
    });
    $(".close-icon-search").click(function (event) {
        $('.search-popup').hide();
        $('.search-desktop').hide();
    });
    function redirectPage() {
        window.location = linkLocation;
    }
    $("#tabs-container li  a").click(function (event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        //$(".tab-content").not(tab).css("display", "none");
        //$(tab).fadein();
    });
    $('.myCheck').click(function () {
        $(".menu, .side-hide").toggle();
        var visible = $('.menu').is(":hidden");
        if (visible) {
            $('.side-hide').css('display', 'none !important');
        }
    });
    $("#search-desktop").click(function () {
        $('.search-desktop').show();
    });
    $("#search-mobile").click(function () {
        $('.search-popup').show();
    });
    $('.close-icon, .close-icon-layiheler').click(function () {
        $('.myCheck').prop('checked', false);
        $(".menu, .side-hide ").toggle();
        var visible = $('.menu').is(":hidden");
        var inputchik = $('.myCheck').is(":checked");
        if (visible) {
            $('.side-hide').css('display', 'none !important');
        }
    });
    $(document).on("click", (e) => {
        if ($('.myCheck').is(":checked") && !$(e.target).hasClass("myCheck")) {
            let status = true;
            for (let parent of $(e.target).parents()) {
                if ($(parent).hasClass("menu")) {
                    status = false;
                    break;
                }
            }
            if (status && !$(e.target).hasClass("menu")) {
                console.log("bagla");
                $('.myCheck').prop('checked', false);
                $(".menu, .side-hide ").toggle();
                var visible = $('.menu').is(":hidden");
                var inputchik = $('.myCheck').is(":checked");
                if (visible) {
                    $('.side-hide').css('display', 'none !important');
                }
            }
            else {
                console.log("baglama");
            }
        }
    });
    //$(document).mouseup(function (e) {
    //    var container = $(".menu"); // YOUR CONTAINER SELECTOR

    //    if (!container.is(e.target)
    //        && container.has(e.target).length === 0) {
    //        container.hide();
    //        $('.side-hide').show();
    //        $('.myCheck').prop('checked', false);
    //    }
    //});
    //$('.menu').on('focusout', function () {
    //    $('.myCheck').prop('checked', false);
    //    $(".menu, .side-hide ").toggle();
    //    var visible = $('.menu').is(":hidden");
    //    var inputchik = $('.myCheck').is(":checked");
    //    console.log(inputchik);
    //    console.log(visible);
    //    if (visible) {
    //        console.log(visible);
    //        $('.side-hide').css('display', 'none !important');
    //    }
    //});
    //$('.type-msg').keyup(function () {
    //    if ($.trim(this.value).length > 0) { $('.send-icon').show(); $('.file-icon').hide(); $('.microfon-icon').hide(); }
    //    else { $('.send-icon').hide(); $('.file-icon').show(); $('.microfon-icon').show(); }
    //});
    $(".microfon-icon").click(function () {
        $('.mesaj-yaz').hide();
        $('.ses-yaz').show();
    });
    // $("#send-voice").click(function(){
    //   $('.mesaj-yaz').show();
    //   $('.ses-yaz').hide();
    // });
    $(".dropdown_btn-filter").click(function () {
        $(".filter-arrow-down").toggleClass("rotate");
    });
    $('.dropdown_btn-filter').on('focusout', function () {
        $(".filter-arrow-down").removeClass("rotate");
    });
    $(" .settings1").click(function () {
        $(".settings1-arrow").toggleClass("rotate");
    });
    $('.settings1').on('focusout', function () {
        $(".settings1-arrow").removeClass("rotate");
    });
    $(" .settings2").click(function () {
        $(".settings2-arrow").toggleClass("rotate");
    });
    $('.settings2').on('focusout', function () {
        $(".settings2-arrow").removeClass("rotate");
    });
    $(".menu-lang a").click(function () {
        $(".dropdown_btn:first-child").text($(this).text());
        $(".dropdown_btn:first-child").val($(this).text());
    });
    //$(".like").click(function () {
    //    $(this).parents(".comment-details-row").find(".like-icon").toggle();
    //    $(this).parents(".comment-details-row").find(".like").toggleClass("black");
    //});
    $(document).on('click', '.reply', (e) => {
        console.log(e.target)
        $(e.target).parents(".comment-details-row").find(".reply-input").toggle();
    });
    //$(".reply").click(function () {
    //    $(this).parents(".comment-details-row").find(".reply-input").toggle();
    //});
    $(function () {
        $(document).on({
            mouseover: function (event) {
                $(this).find('.far').addClass('star-over');
                $(this).prevAll().find('.far').addClass('star-over');
            },
            mouseleave: function (event) {
                $(this).find('.far').removeClass('star-over');
                $(this).prevAll().find('.far').removeClass('star-over');
            }
        }, '.rate');
        $(".search > div > input").click(function () {
            $(this).addClass("padding");
            if ($('#pseudo').length) {
                $('#pseudo').remove();
            } else {
                var css = '<style id="pseudo">.search > div::after{display: none !important;}</style>';
                document.head.insertAdjacentHTML('beforeEnd', css);
            };
        });
        $('.search > div > input').on('focusout', function () {
            $(this).removeClass("padding");
            if ($('#pseudo').length) {
                $('#pseudo').remove();
            } else {
                var css = '<style id="pseudo">.search > div::after{display: block !important;}</style>';
                document.head.insertAdjacentHTML('beforeEnd', css);
            };
        });
        $(document).on('click', '.rate', function () {
            if (!$(this).find('.star-review').hasClass('rate-active')) {
                $(this).siblings().find('.star-review').addClass('far').removeClass('fas rate-active');
                $(this).find('.star-review').addClass('rate-active fas').removeClass('far star-over');
                $(this).prevAll().find('.star-review').addClass('fas').removeClass('far star-over');
            } else {
                console.log('has');
            }
        });
        window.addEventListener("pageshow", function (event) {
            var historyTraversal = event.persisted ||
                (typeof window.performance != "undefined" &&
                    window.performance.navigation.type === 2);
            if (historyTraversal) {
                window.location.reload();
            }
        });
        $(".selectall").click(function () {
            $(".individual").prop("checked", $(this).prop("checked"));
        });
    });

    $('#drop-area').on('dragover', function () {
        $(this).addClass('file_drag_over');
        return false;
    });
    $('#drop-area').on('dragleave', function () {
        $(this).removeClass('file_drag_over');
        return false;
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            if (isImage(input.files[0])) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                    $('#imagePreview').hide();
                    $('#imagePreview').fadeIn(650);
                }
                reader.readAsDataURL(input.files[0]);
            }
            else {
                input.value = null;
                return null;
            }
        }
    }
    function isImage(file) {
        return file.type == "image/jpg" ||
            file.type == "image/jpeg" ||
            file.type == "image/png" ||
            file.type == "image/jfif" ||
            file.type == "image/gif";
    }
    $("#imageUpload").change(function () {
        var result = readURL(this);
        if ( result == null) {
            $("span[data-valmsg-for='Photo']").text("Şəkil formatı düzgün deyil.");
        };
    });
    var rotate = 0;
    $(".rotate-user-left").click(function () {
        rotate -= 90;
        $(".avatar-preview").css("transform", "rotate(" + rotate + "deg)");
    });
    $(".rotate-user-right").click(function () {
        rotate += 90;
        $(".avatar-preview").css("transform", "rotate(" + rotate + "deg)");
    });




    $(document).on('click', '.send_reply_comment', function (e) {
        e.preventDefault();
        let formReviewCommentId = $(e.target).data("id");
        let comment = $(e.target).prev().val();
        let thisTextarea = $(e.target);

        if (comment != "" || comment != " " || comment != undefined) {
            $.ajax({
                url: "/Form/ReplyComment/?formReviewCommentId=" + formReviewCommentId + "&comment=" + comment,
                dataType: "json",
                type: "post",
                success: function (response) {

                    if (response.status == "200") {
                        let commentdate = response.date;
                        thisTextarea.prev().val("");

                        let element = `
                   <div class="project-details-row">
                                        <div class="user-info">
                                            <div class="circular-img">
                                                <img src="/Uploads/Users/${response.data.appUser.photoName}" alt="user-img">
                                            </div>
                                            <div class="comment-details-row">
                                                <p class="gray bold text-s">${response.data.appUser.name} ${response.data.appUser.surname}</p>
                                                <p class="gray medium text-s">${response.data.text}</p>
                                                <span class="comment-details medium">
                                                    ${response.date}
                                                </span>

                                            <hr class="m-r-l-12">

                                            </div>
                                        </div>
                                  </div>`
                        $(e.target).parents(".reply-input").prev(".reply-append-comment").append(element);
                        //$(".reply-append-comment").append(element);

                    }
                }
            });
        }
    })


    let count = 0;
    $(document).on('click', '.btn-loadMore', function (e) {
        e.preventDefault();

        count += 3;
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/Form/LoadMore/" + count,
            data: {
                count: count
            },
            success: function (res) {
                let countReviewTrue = 0;
                let photos = "";
                let date = "";
                //Form

                if (res.dataCount.forms.length == 0) {
                    $(".load-more-btn").hide();
                }

                if (res.dataCount.forms != null) {
                    for (var form of res.dataCount.forms) {

                        
                        let formReviws = "";
                        for (var reviews of form.reviews) {
                            if ((reviews.status && reviews.formId == form.id)
                                || (userId != null && reviews.appUserId == userId
                                    && reviews.status == false && reviews.formId == form.id)) {


                                //Current User Send Comment
                              

                                //Reply Comment Main Comment
                                let replycommentMaincomment = "";
                                if (res.dataCount.replyFormComment != null) {
                                    for (var replyComment of res.dataCount.replyFormComment) {
                                        if ((replyComment.status && replyComment.formReviewId == reviews.id) ||
                                            (userId != null && replyComment.appUserId == userId && replyComment.status == false &&
                                                replyComment.formReviewId == reviews.id)) {

                                            replycommentMaincomment += `<div class="project-details-row emin">
                                                                <div class="user-info">
                                                                    <div class="circular-img">
                                                                        <img src="/Uploads/Users/${replyComment.appuser.photoName}" alt="user-img">
                                                                    </div>
                                                                    <div class="comment-details-row">
                                                                        <p class="gray bold text-s">${replyComment.appuser.name} ${replyComment.appuser.surname}</p>
                                                                        <p class="gray medium text-s">${replyComment.text}</p>
                                                                        <span class="comment-details medium">
                                                                           date
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>`
                                        }

                                    }
                                }
                                console.log(res.dataCount.formCommentLikes)
                                //console.log(reviews.id)

                                let count = 0;
                                //Form Comment Likes
                                for (var formcommentlikes of res.dataCount.formCommentLikes) {
                                    if (formcommentlikes.formReviewId == reviews.id) {
                                        //console.log(formcommentlikes.formReviewId)
                                        //console.log(reviews.id)
                                        ++count;
                                        //console.log(count)
                                    }
                                }

                                if (new Date().getSeconds() < 60) {
                                    date = new Date().getSeconds() + " " + "saniyə əvvəl"
                                    console.log(date)

                                }
                                else if (new Date().getMinutes() < 60) {
                                    date = new Date().getMinutes() + " " + "dəqiqə əvvəl"
                                    console.log(date)

                                }
                                else if (new Date().getHours() > 1 && new Date().getHours() < 24) {
                                    date = new Date().getHours() + " " + "saat əvvəl"
                                    console.log(date)
                                }
                                else if (new Date().getHours() > 24) {
                                    date = (new Date().getDate() - new Date().getDay(reviews.createdTime)) + " " + "gün əvvəl"
                                    console.log(date)
                                }
                                formReviws +=
                                    `<div class="project-details-row emin">
                                        <div class="user-info">
                                            <div class="circular-img">
                                                <img src="/Uploads/Users/${reviews.appUser.photoName}" alt="user-img">
                                            </div>
                                            <div class="comment-details-row">
                                                <p class="gray bold text-s">${reviews.appUser.name} ${reviews.appUser.surname}</p>
                                                <p class="gray medium text-s">${reviews.text}</p>
                                                <span class="comment-details medium">
                                                    ${date}
                                                </span>
                                                <hr class="m-r-l-12">
                                                <span class="comment-details reply medium">Cavab yaz</span>
                                                <hr class="m-r-l-12">
                                                <form method="post" action="/Form/Like">
                                                    <img class="like-icon mb-1" src="/Uploads/Forms/icon/like.svg" alt="like-icon">


                                                    <span id="like-count-comment_">${count}</span>
                                                    <a href="#" class="comment-details like medium" data-id='${reviews.id}'>Bəyən</a>
                                                </form>                                          

                                            <div style="margin-left:70px;" class="reply-append-comment">

                                                    ${replycommentMaincomment}

                                                </div>

                                <div class="write-comment-row reply-input mt-3">
                                                    <form method="post">
                                                        <input class="form-control mb-3" rows="5" />
                                                        <button data-id="${reviews.id}" class="dark-btn white bold send_reply_comment">Göndər</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                            }
                        }


                        for (var formphotos of form.formPhotos) {
                            photos +=
                                `<div class="forum-img-div">
                                        <img class="forum-img" src="/Uploads/FormTemp/Big/${formphotos.formName}" alt="layihe-img">
                                    </div>`;
                        }

                        var element = `
                            <div class="login_div set py-4 mb-4">
                    <div class="d-flex forum-info">
                        <div class="d-flex img-user-div">
                            <div class="circular-img mx-4">
                                <img class="user" src="/Uploads/Users/${form.appUser.photoName}" alt="user">
                            </div>
                        </div>
                        <div class="forum-info-div">
                            <div class="d-flex-custom justify-content-between px-2">
                                <span class="extra-bold text-xs ">${form.heading}</span>
                                <div class="phone-div demi-bold text-m">
                                    <img class="phone-icon" src="/Uploads/Forms/icon/phone-icon.svg" alt="phone-icon">
                                    <span class="country-code mr-2">+994 ${form.phone}</span>
                                </div>
                            </div>
                            <div class="forum-text-div px-2">
                                <div class="d-flex-custom medium gray text-xs">
                                    <span class="user-name mr-2">${form.appUser.name} ${form.appUser.surname}</span>
                                    <span class="from mr-2">tərəfindən</span>
                                    <span class="forum-date">${form.appUser.createdDate}</span>
                                </div>
                                <p class="medium text-s">
                                   ${form.description}
                                </p>
                            </div>

                            <div class="row-custom mb-1">
                                ${photos}
                            </div>
                            <div class="d-flex-custom justify-content-between align-items-center px-2">
                                <div class="">

                                    <!-- Variable amount more avatars -->
                                    <img src="/Uploads/Forms/icon/all-comments-icon.svg" alt="all-comments-icon">
                                    <a class="black click-me click-for-comments extra-bold text-xs" style="cursor:pointer;">
                                        ${++countReviewTrue} rəy
                                    </a>
                                </div>
                                <a class="black loadMore click-for-comments all-comments extra-bold text-xs" style="cursor:pointer">Hamısını gör</a>
                            </div>
                        </div>
                    </div>
                        <div class="forum-content">
                        <br><br>

                        <div class="append-comment">
                            ${formReviws}
                        </div>

                      <div class="write-comment-row">
                                        <form action="\" method="post">
                                            <p class="gray text-s extra-bold">Şərh yaz</p>
                                            <textarea class="form-control" rows="5"></textarea>

                                            <button data-id="${form.id}" class="dark-btn white bold send-forum">Göndər</button>
                                        </form>
                                    </div>
                            
                        </div>`

                        $('#nextPosts').append(element);
                    }
                }
            }
        })
    })


    $(document).on('click', '.like', function (e) {
        e.preventDefault();
        let id = $(e.target).data('id');
        $.ajax({
            type: "POST",
            url: "/Form/Like/" + id,
            dataType: "json",
            success: function (response) {
                if (response.status == 200) {
                    $(e.target).prev().text(response.like)

                    if (response.isLiked) {
                        $(e.target).parents(".comment-details-row").find(".like-icon").show();
                        $(e.target).text("Bəyəndim")
                        //$(e.target).parents(".comment-details-row").find(e.target).toggleClass("black");
                    } else {
                        $(e.target).parents(".comment-details-row").find(".like-icon").hide();
                        $(e.target).text("Bəyən")
                    }
                }
            }
        })
    })



    $(document).on("click", ".send-forum", function (e) {
        e.preventDefault();
        let formId = $(e.target).data("id");
        let comment = $(e.target).prev().val();
        let thisTextarea = $(e.target);


        if (comment != "" || comment != " " || comment != undefined) {
            $.ajax({
                url: "/Form/FormComment/?formid=" + formId + "&comment=" + comment,
                dataType: "json",
                type: "post",
                success: function (response) {

                    if (response.status == "200") {
                        let commentdate = response.date;
                        thisTextarea.prev().val("");

                        let element = `
                   <div class="project-details-row">
                                        <div class="user-info">
                                            <div class="circular-img">
                                                <img src="/Uploads/Users/${response.data.appUser.photoName}" alt="user-img">
                                            </div>
                                            <div class="comment-details-row">
                                                <p class="gray bold text-s">${response.data.appUser.name} ${response.data.appUser.surname}</p>
                                                <p class="gray medium text-s">${response.data.text}</p>
                                                <span class="comment-details medium">
                                                    ${response.date}
                                                </span>
                                               <hr class="m-r-l-12">
                                            <span class="comment-details reply medium">Cavab yaz</span>
                                            <hr class="m-r-l-12">

                                            <span></span>
                                            <a href="#" class="comment-details like medium" data-id='${response.data.id}'>Bəyən</a>
                                            <div class="write-comment-row reply-input mt-3" style="display: none;">
                                                <input class="form-control mb-3" rows="5" />
                                                <button class="dark-btn white bold">Göndər</button>
                                            </div>
                                            </div>
                                        </div>
                                  </div>`

                        $(".append-comment").append(element);

                    }
                }
            });
        }
    });



});



