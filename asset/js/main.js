var Notify = function (message, delay) {
    setTimeout(function () {
        $.notify(
            {
                // options
                icon: "",
                title: '<span style="color: #08aba7">ThĂ´ng bĂ¡o: <br /></span>',
                message: message,
                url: "javascript:void(0)",
                target: "_blank",
            },
            {
                // settings
                element: "body",
                position: null,
                type: "info custom-notify",
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "right",
                },
                offset: {
                    x: 30,
                    y: 10,
                },
                spacing: 10,
                z_index: 1060,
                delay: angular.isDefined(delay) ? delay : 50000,
                timer: 1000,
                url_target: "_blank",
                mouse_over: null,
                animate: {
                    enter: "animated fadeInRight",
                    exit: "animated fadeOutRight",
                },
                onShow: null,
                onShown: null,
                onClose: null,
                onClosed: null,
                icon_type: "class",
            }
        );
    }, 500);
};

// Show loading
var optionsHoldOn = {
    theme: "sk-circle",
    message: "Loading...",
    backgroundColor: "#000",
    textColor: "#fff",
};
