angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($uibModal, $log, $http, $document) {
    var api = {
        list: 'https://c28p8ozu4k.execute-api.us-west-1.amazonaws.com/dev/dispatch_agents',
        create: 'https://c28p8ozu4k.execute-api.us-west-1.amazonaws.com/dev/dispatch_agents'
    }
    var user_access_token = 'e677cb31c8914abcaee9959798383b1e';
    var $ctrl = this;
    $ctrl.bot = {};

    $http({
            method: "GET",
            url: api.list,
            headers: {
                'Access-Token': user_access_token,
                'Content-Type': 'application/json; charset=utf-8;'
            }
        })
    .then(function (response) {
        $ctrl.bots = response.data;
    });

    $ctrl.deleteItem = function(index){
        $ctrl.bots.splice(index, 1);
        toastr.success("Agent deleted successfully");
    };

    $ctrl.openPopup = function () {
        $ctrl.bot = {};
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'md',
            resolve: {
                bot: function () {
                    return $ctrl.bot;
                },
                edit: function () {
                    return $ctrl.edit;
                }
            }
        });

        modalInstance.result.then(function (bot) {
                $http({
                        method: "POST",
                        url: api.create,
                        headers: {
                            'Access-Token': user_access_token,
                            'Content-Type': 'application/json; charset=utf-8;'
                        }
                    })
                    .then(function (response) {
                        $http({
                                method: "GET",
                                url: api.list,
                                headers: {
                                    'Access-Token': user_access_token,
                                    'Content-Type': 'application/json; charset=utf-8;'
                                }
                            })
                            .then(function (response) {
                                $ctrl.bots = response.data;
                            });
                        $ctrl.bot = {}
                        toastr.success("Agent save successfully");
                    });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $ctrl.editPopup = function (index) {
        $ctrl.edit = true
        $ctrl.bot = $ctrl.bots[index];
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'md',
            resolve: {
                bot: function () {
                    return $ctrl.bot;
                },
                edit: function () {
                    return $ctrl.edit;
                }
            }
        });

        modalInstance.result.then(function (bot) {
            $ctrl.bots[index] = bot;
            $ctrl.bot = {}
            $ctrl.edit = false
            toastr.success("Agent save successfully");
        }, function () {
            $ctrl.edit = false
            $log.info('Modal dismissed at: ' + new Date());
        });
    };



});

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, bot, edit) {
    var $ctrl = this;
    $ctrl.bot = bot;
    $ctrl.edit = edit || false;

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.bot);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});