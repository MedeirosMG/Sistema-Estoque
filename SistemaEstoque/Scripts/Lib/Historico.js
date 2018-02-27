//Controller de inciio do sistema
app.controller('Historico', ['$scope', 'ListService', 'httpRequest', function ($scope, ListService, httpRequest) {
    var customAlert = new CustomAlert();
    $scope.listaHistorico = [];
    $scope.listaPaginada = [];
    $scope.listaFiltrada = [];
    $scope.qtdLista = 1;
    $scope.indiceSelecionado = 1;

    $scope.formatarData = function (list) {
        var listTemp = [];

        $.each(list, function (index, data) {
            var obj = data;

            var newDate = data.Data.replace("/Date(", "");
            var newDate = newDate.replace(")/", "");

            dateTemp = new Date(parseInt(newDate));
            dateTemp = moment(dateTemp).format("DD/MM/YYYY");

            obj.Data = dateTemp;

            listTemp.push(obj);
        });
        
        return listTemp;
    };


    $scope.iniciaHistorico = function () {
        $.ajax({
            url: httpRequest.returnConexao() + '/Historico/getListHistorico',
            type: 'GET',
            success: function (data) {
                $scope.listaHistorico = $scope.formatarData(data);
                $scope.listaPaginada = ListService.carregaLista($scope.listaHistorico, 1);
                $scope.qtdLista = ListService.tamanhoDaLista($scope.listaHistorico);
                $scope.listaFiltrada = $scope.listaHistorico;

                $scope.$apply();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                customAlert.alertError("Erro!", "Erro interno.");
            }
        });
    };

    $scope.aplicaFiltro = function () {
        if (typeof $scope.filtroEstoque != "undefined") {
            $scope.listaFiltrada = [];
            $.each($scope.listaHistorico, function (element, data) {
                if (data.Material.toLowerCase().indexOf($scope.filtroEstoque.toLowerCase()) != -1) {
                    $scope.listaFiltrada.push(data);
                }
            });

            $scope.qtdLista = ListService.tamanhoDaLista($scope.listaFiltrada);
            $scope.indiceSelecionado = 1;
            $scope.listaPaginada = ListService.carregaLista($scope.listaFiltrada, $scope.indiceSelecionado);
        }
    };

    $scope.$watch("filtroEstoque", function () {
        $scope.aplicaFiltro();
    });

    $scope.alterarPagina = function () {
        if (event.target.id == "anterior") {
            if ($scope.indiceSelecionado != 1)
                $scope.indiceSelecionado--;
        }
        else if (event.target.id == "proximo") {
            if ($scope.indiceSelecionado != $scope.qtdLista)
                $scope.indiceSelecionado++;
        }
        else
            $scope.indiceSelecionado = event.target.id;

        $scope.listaPaginada = ListService.carregaLista($scope.listaFiltrada, $scope.indiceSelecionado);
    };
}]);