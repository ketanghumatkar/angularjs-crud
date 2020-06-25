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

    $ctrl.editarItem = function(index){
        $ctrl.item = $ctrl.bots[index];
        $ctrl.edit = true;
    };

    $ctrl.applyChanges = function(index){
        $ctrl.item = {};
        $ctrl.edit = false;
        toastr.success("Item alterado com sucesso.");
    };

    $ctrl.deleteItem = function(index){
        $ctrl.bots.splice(index, 1);
        toastr.success("Item removido com sucesso.");
    };

    $ctrl.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                bot: function () {
                    return $ctrl.bot;
                }
            }
        });

        modalInstance.result.then(function (bot) {
            console.log(bot)
            $ctrl.bots.push(bot)
            $ctrl.bot = {}
            toastr.success("Agent added successfully");
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, bot) {
    var $ctrl = this;
    $ctrl.bot = bot;

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.bot);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});