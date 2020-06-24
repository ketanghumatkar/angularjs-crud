function ListaComprasController($scope) {

    $scope.item = {};

    $scope.itens = [
        {name: 'Leite', owner: 'Ketan Ghumatkar'},
        {name: 'Cerveja', owner: 'Vignesh Shanbhang'}
    ];

    $scope.adicionaItem = function () {
        $scope.itens.push({
            name: $scope.item.name,
            owner: $scope.item.owner
        });
        $scope.item.name = $scope.item.owner = '';
        toastr.success("Agent added successfully");
    };

    $scope.editarItem = function(index){
        $scope.item = $scope.itens[index];
        $scope.edit = true;
    };

    $scope.applyChanges = function(index){
        $scope.item = {};
        $scope.edit = false;
        toastr.success("Item alterado com sucesso.");
    };

    $scope.deleteItem = function(index){
        $scope.itens.splice(index, 1);
        toastr.success("Item removido com sucesso.");
    };
}