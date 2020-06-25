angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
    var $ctrl = this;

    $ctrl.bot = {};

    $ctrl.bots = [
        {
            first_name: 'Leite',
            owner: 'Ketan Ghumatkar',
            description: 'Leite description'
        },
        {
            first_name: 'Cerveja',
            owner: 'Vignesh Shanbhang',
            description: 'Cerveja description'
        }
    ];

    $ctrl.deleteItem = function(index){
        $ctrl.bots.splice(index, 1);
        toastr.success("Agent deleted successfully");
    };

    $ctrl.openPopup = function () {
        $ctrl.bot = {
            owner: 'Vignesh Shanbhang'
        }
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
            $ctrl.bots.push(bot)
            $ctrl.bot = {}
            toastr.success("Agent save successfully");
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