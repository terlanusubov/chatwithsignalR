const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
$(document).ready(function () {
    var chat = new Chat();

    chat.startConnection(() => {

        chat.joinChat(() => {

            //Sidebar-daki elementlere click olunduqda sohbet mesajlari gorsensin
            $(".participants").on("click", "li.msg-item", function (e) { 
                //her klikde input temizlensin
                if (!$(e.currentTarget).hasClass("active")) {
                    $("#message").val("");
                }

                var securtyStamp = $(this).data("id");
                $(`.chat[data-id="${securtyStamp}"`).empty();

                //mesajlarin gorsenmesi ucun div active olunsun
                $(`.chat[data-id="${securtyStamp}"`).addClass("active");

                chat.getConversationMessages(securtyStamp);
            });

    
            //sehife acilan anda aktiv sohbetin mesajlarini getir
            $(".msg-item.active").trigger("click");

            //Mesaj gonder button-a click olunduqda mesaji gonderilmesi
            $("#btn-send-message").click(function () {
                SendMessage();
            });

            $("#send-message").submit(function (e) {
                e.preventDefault();
                SendMessage();
            });

            chat.receiveMessage();

            chat.makeConversation();
           
        });

    });


    $("#message").keyup((e) => {
        if ($(e.target).val()) {
            $("#btn-send-file").hide();
            $("#btn-send-message").show();
        }
        else {
            $("#btn-send-file").show();
            $("#btn-send-message").hide();
        }
    });

    function SendMessage(e) {
        var text = $("#message").val();
        var securityStamp = $(".chat.active").data('id');

        if (text && securityStamp) {
            chat.sendMessage(text, securityStamp);
            $("#message").val("");
        }
    }

});

