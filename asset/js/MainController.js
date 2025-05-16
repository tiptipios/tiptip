mainApp
    .controller("MainController", [
        "$scope",
        "$filter",
        "MainService",
        "$timeout",
        "$uibModal",
        function ($scope, $filter, MainService, $timeout, $uibModal) {
            HoldOn.open(optionsHoldOn);

            $timeout(function () {
                $("body").removeClass("hideClass");
                HoldOn.close();
                $scope.executeNotification();
                $scope.executeLightcase();
            });

            $scope.executeLightcase = function () {
                $("a[data-rel^=lightcase]").lightcase();
            };

            $scope.executeNotification = function () {
                if (
                    $scope.notification.visible &&
                    $scope.notification.content &&
                    $scope.notification.time
                ) {
                    let now = Date.now();
                    let milisecond = $scope.notification.time;
                    let setupTime = localStorage.getItem("NOTIFICATION");
                    if (setupTime !== null && now - setupTime > milisecond) {
                        localStorage.removeItem("NOTIFICATION");
                    }
                    $scope.openNotificationModal();
                }
            };

            $scope.openNotificationModal = function () {
                if (!localStorage.getItem("NOTIFICATION")) {
                    $("#notificationModal").modal("show");
                }
            };

            $scope.closeNotificationModal = function () {
                localStorage.setItem("NOTIFICATION", Date.now());
                $("#notificationModal").modal("hide");
            };

            /**
             * Format date
             * @author Thanh Tuan <tuannt@acro.vn>
             * @param  {String} date The date
             * @return {Void}
             */
            $scope.formatDate = function (date) {
                var dateOut = new Date(date);
                return dateOut;
            };

            if ($("#header").length) {
                const swiper = new Swiper("#header .swiper", {
                    slidesPerView: 1.1,
                    slidesPerGroup: 1,
                    spaceBetween: 5,
                    centeredSlides: false,
                    direction: "horizontal",
                    loop: true,
                    freeMode: false,
                    autoplay: true,
                    speed: 1000,
                });
            }

            if ($("#related-tip").length) {
                const swiper = new Swiper("#related-tip .swiper", {
                    slidesPerView: 1.2,
                    slidesPerGroup: 1,
                    spaceBetween: 5,
                    centeredSlides: true,
                    direction: "horizontal",
                    loop: true,
                    freeMode: false,
                    autoplay: false,
                    speed: 1000,
                });
            }

            if ($("#user-manual").length) {
                const swiper = new Swiper("#user-manual .swiper", {
                    slidesPerView: 1.1,
                    slidesPerGroup: 1,
                    spaceBetween: 5,
                    centeredSlides: false,
                    direction: "horizontal",
                    loop: false,
                    freeMode: false,
                    autoplay: false,
                    speed: 1000,
                });
            }

            if ($("#slider").length) {
                setTimeout(() => {
                    const swiper = new Swiper("#slider .swiper", {
                        slidesPerView: 1.1,
                        slidesPerGroup: 1,
                        spaceBetween: 5,
                        centeredSlides: false,
                        direction: "horizontal",
                        loop: true,
                        freeMode: false,
                        autoplay: false,
                        speed: 1000,
                    });
                });
            }

            $scope.addForm = function (validate) {
                // Get unique option
                var unique = true;
                var type = $scope.formItem.type;

                // Validate
                $scope.submittedForm = true;
                if (!validate) return;

                // Loading
                HoldOn.open(optionsHoldOn);

                MainService.createFormProvider($scope.formItem).then(function (
                    data
                ) {
                    // Reset error data
                    $scope.errors = {};

                    // Close loading
                    HoldOn.close();

                    if (data.status == -1) {
                        $scope.errors = data.errors;
                    } else if (data.status == 1) {
                        // Format data
                        $scope.formItem = {};
                        $scope.formItem.type = type;
                        $scope.formItem.unique = unique;

                        // Notification
                        Notify(data.msg, 5000);

                        // Format validate
                        $scope.submittedForm = false;
                    }
                });
            };

            // Video
            if ($("#player").length) {
                let videoSrc = $("#player").attr("data-src");
                $scope.player = videojs("player", {
                    fluid: true,
                    muted: false,
                    autoplay: false,
                    controls: true,
                    responsive: true,
                    playsinline: true,
                    techOrder: ["youtube"],
                    sources: [
                        {
                            type: "video/youtube",
                            src: videoSrc,
                        },
                    ],
                });
                // $scope.player.pause();
            }

            $scope.isShowMoreContent = false;
            $scope.showMoreContent = function () {
                $(".full-detail").toggleClass("hidden");
                $scope.isShowMoreContent = !$scope.isShowMoreContent;
            };

            $scope.$watch("searchText", function (newVal, oldVal) {
                if (newVal && newVal.length >= 3) {
                    MainService.getAppsProvider({
                        searchText: $scope.searchText,
                    }).then(function (data) {
                        $scope.searchedApps = data.items;
                        console.log($scope.searchedApps, "$scope.searchedApps");
                    });
                }
            });

            $scope.openLoginModal = function () {
                $("#loginModal").modal("show");
            };

            $scope.closeLoginModal = function () {
                $scope.item = {};
                $scope.errors = [];
                $scope.submitted = false;
                $("#loginModal").modal("hide");
            };

            $scope.openRegisterModal = function () {
                $scope.closeLoginModal();
                $("#registerModal").modal("show");
            };

            $scope.closeRegisterModal = function () {
                $scope.item = {};
                $scope.errors = [];
                $scope.submitted = false;
                $("#registerModal").modal("hide");
            };

            $scope.openPaymentHistoryModal = function () {
                $("#paymentHistoryModal").modal("show");
            };

            $scope.closePaymentHistoryModal = function () {
                $("#paymentHistoryModal").modal("hide");
            };

            $scope.payment = { step: 1 };
            $scope.openPaymentModal = function () {
                $("#paymentModal").modal("show");
            };

            $scope.closePaymentModal = function () {
                $scope.payment = { step: 1 };
                $("#paymentModal").modal("hide");
            };

            $scope.registerAccount = function (validate) {
                // Validate
                $scope.submitted = true;
                if (!validate) return;

                HoldOn.open(optionsHoldOn);
                MainService.registerAccount($scope.item).then(function (data) {
                    HoldOn.close();
                    if (data.status == -1) {
                        $scope.errors = data.errors;
                        Notify("ÄĂ£ xáº£y ra lá»—i, má»i thá»­ láº¡i");
                    } else {
                        $scope.closeRegisterModal();
                        Notify("Táº¡o má»›i tĂ i khoáº£n thĂ nh cĂ´ng");
                        $timeout(function () {
                            window.location.href = "";
                        }, 1000);
                    }
                });
            };

            $scope.loginAccount = function (validate) {
                // Validate
                $scope.submitted = true;
                if (!validate) return;

                HoldOn.open(optionsHoldOn);
                MainService.loginAccount($scope.item).then(function (data) {
                    HoldOn.close();
                    if (data.status == -1) {
                        Notify("Sai thĂ´ng tin tĂ i khoáº£n hoáº·c máº­t kháº©u");
                    } else {
                        Notify("ÄÄƒng nháº­p thĂ nh cĂ´ng");
                        window.location.href = "";
                    }
                });
            };

            $scope.downloadApp = function () {
                MainService.checkLogin({}).then(function (data) {
                    if (data.status === 0) {
                        Notify("Báº¡n cáº§n Ä‘Äƒng nháº­p trÆ°á»›c khi táº£i");
                        $scope.openLoginModal();
                    } else {
                        $scope.openDownloadAppModal();
                    }
                });
            };

            $scope.buyVip = function () {
                MainService.checkUDID({}).then(function (data) {
                    // Bá» qua bÆ°á»›c check UDID
                    $scope.closeDownloadAppModal();
                    $scope.openPaymentModal();
                    // if (data.status === 0) {
                    //     Notify(
                    //         "Báº¡n cáº§n xĂ¡c minh thiáº¿t bá»‹ trÆ°á»›c khi mua tĂ i khoáº£n VIP"
                    //     );
                    // } else {
                    //     $scope.closeDownloadAppModal();
                    //     $scope.openPaymentModal();
                    // }
                });
            };

            $scope.verificationDevice = function () {
                window.open("/storage/config/device.mobileconfig");
            };

            $scope.downloadFile = function (link) {
                MainService.checkDownload(link).then(function (data) {
                    if (data.status === 0) {
                        Notify("Báº¡n cáº§n Ä‘Äƒng nháº­p trÆ°á»›c khi táº£i, náº¿u chÆ°a cĂ³ TĂ€I KHOáº¢N hĂ£y ÄÄ‚NG KĂ");
                    }
                    if (data.status === -1) {
                        Notify("Báº¡n cáº§n xĂ¡c minh thiáº¿t bá»‹ trÆ°á»›c khi táº£i");
                    }
                    if (data.status === -2) {
                        Notify(
                            "Báº¡n cáº§n mua VIP Ä‘á»ƒ táº£i game nĂ y"
                        );
                    }
                    if (data.status === -3) {
                        Notify(
                            "HĂ£y xĂ¡c minh thiáº¿t bá»‹ trÆ°á»›c khi táº£i. Nháº¥n nĂºt XĂC MINH THIáº¾T Bá» á»Ÿ bĂªn dÆ°á»›i vĂ  cĂ i Ä‘áº·t cáº¥u hĂ¬nh Ä‘á»ƒ xĂ¡c minh"
                        );
                    }
                    if (data.status === 1) {
                        console.log(data, '12312');
                        window.location.href = data.link;
                    }
                });
            };

            $scope.openDownloadAppModal = function () {
                $("#downloadAppModal").modal("show");
            };

            $scope.closeDownloadAppModal = function () {
                $("#downloadAppModal").modal("hide");
            };
        },
    ])
    .filter("range", function () {
        return function (input, total) {
            total = parseInt(total);
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            return input;
        };
    })
    .directive("fileread", [
        function () {
            return {
                scope: {
                    fileread: "=",
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileread = loadEvent.target.result;
                                $(".file-name").text(
                                    changeEvent.target.files[0].name
                                );
                            });
                        };
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                },
            };
        },
    ]);
