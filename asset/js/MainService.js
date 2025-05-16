var mainApp = angular
    .module("mainApp", ["ngResource", "ngSanitize", "ui.bootstrap"])
    .constant("CSRF_TOKEN", $("meta[name=csrf-token]").attr("content"));
mainApp
    .factory("MainResource", [
        "$resource",
        function ($resource) {
            return $resource(
                window.baseUrl + "/:prefix/:route/:method/:id",
                { method: "@method", id: "@id" },
                {
                    add: { method: "post" },
                    save: { method: "post" },
                    update: { method: "put" },
                    delete: { method: "delete" },
                }
            );
        },
    ])
    .service("MainService", [
        "MainResource",
        "$q",
        function (MainResource, $q) {
            var that = this;

            /**
             * Add item to form
             * @author Thanh Tuan <thanhtuancr2011@gmail.com>
             * @return {Void}
             */
            this.createFormProvider = function (data) {
                var defer = $q.defer();
                var temp = new MainResource(data);

                temp.$save(
                    { prefix: "api", route: "form" },
                    function success(data) {
                        defer.resolve(data);
                    },
                    function error(reponse) {
                        defer.resolve(reponse.data);
                    }
                );
                return defer.promise;
            };

            /**
             * Check user
             * @author Thanh Tuan <thanhtuancr2011@gmail.com>
             * @return {Void}
             */
            this.checkLogin = function (data) {
                var defer = $q.defer();
                var temp = new MainResource(data);

                temp.$save(
                    { prefix: "api", route: "account", method: "check-login" },
                    function success(data) {
                        defer.resolve(data);
                    },
                    function error(reponse) {
                        defer.resolve(reponse.data);
                    }
                );
                return defer.promise;
            };

            /**
             * Check user
             * @author Thanh Tuan <thanhtuancr2011@gmail.com>
             * @return {Void}
             */
            this.checkUDID = function (data) {
                var defer = $q.defer();
                var temp = new MainResource(data);

                temp.$save(
                    { prefix: "api", route: "account", method: "check-udid" },
                    function success(data) {
                        defer.resolve(data);
                    },
                    function error(reponse) {
                        defer.resolve(reponse.data);
                    }
                );
                return defer.promise;
            };

            /**
             * Add item
             * @author Thanh Tuan <thanhtuancr2011@gmail.com>
             * @return {Void}
             */
            this.registerAccount = function (data) {
                var defer = $q.defer();
                var temp = new MainResource(data);

                temp.$save(
                    { prefix: "api", route: "user", method: "create-customer" },
                    function success(data) {
                        defer.resolve(data);
                    },
                    function error(reponse) {
                        defer.resolve(reponse.data);
                    }
                );
                return defer.promise;
            };

            /**
             * Add item
             * @author Thanh Tuan <thanhtuancr2011@gmail.com>
             * @return {Void}
             */
            this.checkDownload = function (data) {
                var defer = $q.defer();
                var temp = new MainResource(data);

                temp.$save(
                    {
                        prefix: "api",
                        route: "account",
                        method: "check-download",
                    },
                    function success(data) {
                        defer.resolve(data);
                    },
                    function error(reponse) {
                        defer.resolve(reponse.data);
                    }
                );
                return defer.promise;
            };

            /**
             * Add item
             * @author Thanh Tuan <thanhtuancr2011@gmail.com>
             * @return {Void}
             */
            this.loginAccount = function (data) {
                var defer = $q.defer();
                var temp = new MainResource(data);

                temp.$save(
                    { prefix: "api", route: "account", method: "login" },
                    function success(data) {
                        defer.resolve(data);
                    },
                    function error(reponse) {
                        defer.resolve(reponse.data);
                    }
                );
                return defer.promise;
            };

            /**
             * Get apps
             * @author Thanh Tuan <thanhtuancr2011@gmail.com>
             * @return {Void}
             */
            this.getAppsProvider = function (data) {
                var defer = $q.defer();
                var temp = new MainResource(data);

                temp.$save(
                    { prefix: "api", route: "get-app" },
                    function success(data) {
                        defer.resolve(data);
                    },
                    function error(reponse) {
                        defer.resolve(reponse.data);
                    }
                );
                return defer.promise;
            };
        },
    ]);
