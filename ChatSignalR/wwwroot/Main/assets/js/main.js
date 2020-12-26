
skipCount = 0;

$(document).ready(function () {
    $(document).on("click", ".menu-tabs .current", function () {
       
        skipCount = 0;

        var catVal = ($(this).children("input").val())


        $.ajax({
            url: "/AJAX/ProjectToCategory?catVal=" + catVal,
            type: "GET",
            success: function (response) {



                $("#ProjectToCategory").children().remove();

                $("#ProjectToCategory").append(response);
                loadMoreButtonShowOrNot()
            }
        });

    }
    )
});


var position = $(window).scrollTop();

// should start at 0
$(document).ready(function () {
    $(document).on("click", "#projectListLoadMore", function () {

        skipCount += 20;


        var catVal = $("#tabs-container .current input").val();

        $.ajax({
            url: "/AJAX/LoadMoreProjectToCategory?skipCount=" + skipCount + "&catVal=" + catVal,
            type: "GET",
            success: function (response) {

                $("#ProjectToCategory").append(response);
                loadMoreButtonShowOrNot()
            }
        })

    });
});


//$(document).ready(function () {
//    $(window).on("scroll", function () {

//        skipCount += 5;

//        var scroll = $(window).scrollTop();
//        if (scroll > position) {

//            var catVal = $("#tabs-container .current input").val();

//            $.ajax({
//                url: "/AJAX/LoadMoreProjectToCategory?skipCount=" + skipCount + "&catVal=" + catVal,
//                type: "GET",
//                success: function (response) {


//                    $("#ProjectToCategory").append(response);



//                }
//            })
//        }
//        position = scroll;



//    });
//});


$(document).ready(function () {
    //let page = parseInt($(tabId).find(".load-more-btn button").data("page"));
    //page++;

    //var pages = [];

    //let tabId = $(".menu-tabs .current").find("a").attr("href");
    //let catId = $(".menu-tabs .current").data("id");

    //let categories = $(".menu-tabs li");
    //for (var i = 0; i < categories.length; i++) {
    //    pages[i] = 1;
    //}



    //$.ajax({
    //    url: "/blog/fill/?catId=" + catId,
    //    dataType: "json",
    //    type: "post",
    //    success: function (res) {
    //        if (res.status == 200) {
    //            let tabElements = $(tabId).children().find(".tab-element");
    //            tabElements.remove();


    //            for (let element of res.data) {
    //                let photo = "";
    //                for (let p of element.blog.photos) {
    //                    if (p.isMain) {
    //                        photo = p.photo;
    //                        break;
    //                    }
    //                }
    //                let newTabElement = `<div class="col-md-4 col-12 col-index for-margin tab-element content1">
    //                                <div class="img-container">
    //                                    <a href="/blog/index/?blogId=${element.blog.id}"> <img class="people" src="/Admin/Uploads/Blogs/${photo}" alt="people"></a>
    //                                </div>
    //                                <div class="caption-review mt-3">
    //                                    <p class="text-l"><strong>${element.title}</strong> </p>
    //                                </div>
    //                            </div>`;
    //                $(tabId + " .row-custom").append(newTabElement);
    //            }
    //            $(".tab > div").css("display", "none");
    //            $(tabId).fadeIn();

    //        }
    //    }
    //});

    ////blog tab 
    //$(".menu-tabs li").click(function () {
    //    let tabId = $(this).find("a").attr("href");
    //    let catId = $(this).data("id");

    //    let categories = $(".menu-tabs li");
    //    for (var i = 0; i < categories.length; i++) {
    //        pages[i] = 1;
    //    }

    //    $.ajax({
    //        url: "/blog/fill/?catId=" + catId,
    //        dataType: "json",
    //        type: "post",
    //        success: function (res) {
    //            if (res.status == 200) {
    //                let tabElements = $(tabId).children().find(".tab-element");
    //                tabElements.remove();

    //                for (let element of res.data) {
    //                    let photo = "";
    //                    for (let p of element.blog.photos) {
    //                        if (p.isMain) {
    //                            photo = p.photo;
    //                            break;
    //                        }
    //                    }
    //                    let newTabElement = `<div class="col-md-4 col-12 col-index for-margin tab-element content1">
    //                                <div class="img-container">
    //                                    <a href="/blog/index/?blogId=${element.blog.id}"> <img class="people" src="/Admin/Uploads/Blogs/${photo}" alt="people"></a>
    //                                </div>
    //                                <div class="caption-review mt-3">
    //                                    <p class="text-l"><strong>${element.title}</strong> </p>
    //                                </div>
    //                            </div>`;
    //                    $(tabId + " .row-custom").append(newTabElement);
    //                }

    //            }
    //        }
    //    });
    //});

    ////load more blog
    //$(".load-more-btn").click(function (e) {
    //    e.preventDefault();
    //    var btn = this;
    //    let currentTabId = $(this).parents(".tab-content").attr("id");
    //    let categoryId = $(".menu-tabs a[href='#" + currentTabId + "']").parent().data("id");
    //    let categories = $(".menu-tabs li");
    //    let page = 0;
    //    for (var i = 0; i < categories.length; i++) {
    //        if (categories[i].querySelector("a").getAttribute("href") == "#" + currentTabId) {
    //            page = pages[i];
    //            pages[i]++;
    //            break;
    //        }
    //    }

    //    $.ajax({
    //        url: "/blog/loadmore/?categoryId=" + categoryId + "&page=" + (page + 1),
    //        dataType: "json",
    //        type: "post",
    //        success: function (res) {
    //            if (res.status == 200 && res.data.length != 0) {
    //                page++;
    //                for (let element of res.data) {
    //                    let photo = "";
    //                    for (let p of element.blog.photos) {
    //                        if (p.isMain) {
    //                            photo = p.photo;
    //                            break;
    //                        }
    //                    }
    //                    let newTabElement = `<div class="col-md-4 col-12 col-index for-margin tab-element content1">
    //                                <div class="img-container">
    //                                    <a href="/blog/index/?blogId=${element.blog.id}"> <img class="people" src="/Admin/Uploads/Blogs/${photo}" alt="people"></a>
    //                                </div>
    //                                <div class="caption-review mt-3">
    //                                    <p class="text-l"><strong>${element.title}</strong> </p>
    //                                </div>
    //                            </div>`;
    //                    $("#" + currentTabId + " .row-custom").append(newTabElement);
    //                }

    //            }
    //        }

    //    });
    //});


    //project viewcount with ajax
    $(".architect-project").click(function () {
        let projectId = $(this).data("project");
        let architectId = $(this).data("architect");
        if (projectId != undefined && architectId != undefined) {
            $.ajax({
                url: "/Expert/IncreaseViewCount/?projectId=" + projectId + "&architectId=" + architectId,
                dataType: "json",
                type: "post",
                success: function (response) {
                    if (response.status == 200) {
                        $(".architect-view-count").text(response.architectViewCount);
                        $(`#modal_${projectId}`).find(".project-view-count").text(response.projectViewCount);
                    }
                }
            });
        }
        else {
            alert("Xəta! Layihənin baxış sayı artırılmadı! Zəhmət olmasa səhifəni yenileyin");
        }
    });

    //rate project
    $(".stars-review i").click(function () {
        let parent = $(this).parent();
        let projectId = $(this).parents(".modal").data("project");
        let index = $(this).parent().parent().find("label").index(parent);
        if (index != undefined && projectId != undefined) {
            let rate = ++index;
            $.ajax({
                url: "/Expert/RateProject/?projectId=" + projectId + "&rate=" + rate,
                dataType: "json",
                type: "post",
                success: function (response) {
                    if (response.status == 200) {
                        let projectStars = "";
                        for (let i = 1; i <= 5; i++) {
                            if (i <= response.projectRate) {
                                projectStars += `<img class="star-icon-modal" src="/Main/assets/icons/star.svg" alt="icon"> `;
                            }
                            else {
                                projectStars += `<img class="star-icon-modal" src="/Main/assets/icons/empty-star.svg" alt="icon"> `;
                            }
                        }

                        $(`#modal_${projectId}`).find(".review-result").html(projectStars);

                        let architectStars = "";
                        for (let i = 1; i <= 5; i++) {
                            if (i <= response.architectRate) {
                                architectStars += `<img class="star-icon-profile" src="/Main/assets/icons/star.svg" alt="icon"> `;
                            }
                            else {
                                architectStars += `<img class="star-icon-profile" src="/Main/assets/icons/empty-star.svg" alt="icon"> `;
                            }
                        }

                        $(".stars-profile").html(architectStars);

                        let userRateStars = "";
                        $(`#modal_${projectId}`).find(".wrap").remove();
                        $(`#modal_${projectId}`).find(".rate-text").text(response.givenRateText);
                        for (let i = 1; i <= 5; i++) {
                            if (i <= response.givenRate) {
                                userRateStars += `<img class="star-icon-modal" src="/Main/assets/icons/star.svg" alt="icon"> `;
                            }
                            else {
                                userRateStars += `<img class="star-icon-modal" src="/Main/assets/icons/empty-star.svg" alt="icon"> `;
                            }
                        }
                        let userRateWrapper = `<div class="gray review-result demi-bold text-xs">${userRateStars}</div>`;
                        $(`#modal_${projectId}`).find(".rate-text").after(userRateWrapper);
                    }
                }
            });
        }
    });

    //comment project
    $(".send-review").click(function (e) {
        e.preventDefault();
        let projectId = $(this).data("id");
        let text = $(this).prev().val();
        let thisTextarea = $(this);
        let modal = $(this).parents(".modal");

        if (text != "" || text != " " || text != undefined) {
            $.ajax({
                url: "/Expert/WriteComment/?projectId=" + projectId + "&text=" + text,
                dataType: "json",
                type: "post",
                success: function (response) {
                    if (response.status == 200) {
                        thisTextarea.prev().val("");

                        let element = `
                                    <div class="project-details-row user-info">
                                    <div class="user-img-row">
                                        <img src="/Uploads/Users/${response.data.appUser.photoName}" style="width:60px;height:60px;border-radius:100%;" alt="img">
                                    </div>
                                    <div class="comment-details-row">
                                        <p class="gray bold text-m"><strong>${response.data.appUser.name} ${response.data.appUser.surname}</strong></p>
                                        <p class="gray medium text-m"><strong>${response.data.text}</strong> </p>
                                        <span class="comment-details medium">${response.date}</span>
                                    </div>
                                </div>`;
                        $(modal).find(".comments").append(element);
                    }
                }
            });
        }
    });

    
});



//$(".").click(function () {
//    $(this).parents(".modal").find(".send-review").focus();
//});


$(document).ready(function () {
    var a = $("#architect-birthday-day").val()

    $(".architect-birthday-day option").each(function () {
        if ($(this).val() == a) {
            $(this).attr('selected', 'true');
        }
    })
});

$(document).ready(function () {
    var a = $("#architect-birthday-month").val()

    $(".architect-birthday-month option").each(function () {
        if ($(this).val() == a) {
            $(this).attr('selected', 'true');
        }
    })
});

$(document).ready(function () {
    var a = $("#architect-birthday-year").val()

    $(".architect-birthday-year option").each(function () {
        if ($(this).val() == a) {
            $(this).attr('selected', 'true');
        }
    })
});


$(document).ready(function () {
    loadMoreButtonShowOrNot();
});

function loadMoreButtonShowOrNot() {
    var projectsCount = $("#ProjectCount").val();

    var projectsOnPageCount = $(".projects-page-count").length;


    
    if (projectsCount != undefined) {
        if (projectsOnPageCount >= projectsCount) {
            $("#projectListLoadMore").addClass("d-none")
        }
        else {
            $("#projectListLoadMore").removeClass("d-none")
        }
    }
    else {
        $("#projectListLoadMore").addClass("d-none")
    }
       
    
   
}
function ura() {

    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();



    if (file) {
        reader.readAsDataURL(file);
    }
    $(".mmmok").val(file.name) 
}
  

