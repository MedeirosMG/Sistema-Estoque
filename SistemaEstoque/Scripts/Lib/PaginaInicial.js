//Controller de inciio do sistema
app.controller('InitSistema', ['$scope', 'ListService', 'httpRequest','$rootScope', function ($scope, ListService, httpRequest, $rootScope) {
    var customAlert = new CustomAlert();

    $scope.listaEstoque = [];
    $scope.listaPaginada = [];
    $scope.listaFiltrada = [];
    $scope.qtdLista = 1;
    $scope.indiceSelecionado = 1;

    $rootScope.$on("atualizaLista", function () {
        $scope.iniciaSistema();
    });

    $scope.iniciaSistema = function () {
        $.ajax({
            url: httpRequest.returnConexao() + '/Material/getMateriais',
            type: 'GET',
            success: function (data) {
                $scope.listaEstoque = data;
                $scope.listaPaginada = ListService.carregaLista($scope.listaEstoque, 1);
                $scope.qtdLista = ListService.tamanhoDaLista($scope.listaEstoque);
                $scope.listaFiltrada = $scope.listaEstoque;

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
            $.each($scope.listaEstoque, function (element, data) {
                if (data.Nome.toLowerCase().indexOf($scope.filtroEstoque.toLowerCase()) != -1) {
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

        $('.panel-collapse.in').collapse('hide');
        $scope.listaPaginada = ListService.carregaLista($scope.listaFiltrada, $scope.indiceSelecionado);
    };

    $scope.alteraEstoque = function () {
        idTemp = event.target.id;
        if (event.target.name.toString() == "retirar") {
            customAlert.getValue("retirar", function (valor) {
                if (valor == -1)
                    customAlert.alertError("Erro!", "Erro ao completar solicitacao.");
                else {
                    $.ajax({
                        url: httpRequest.returnConexao() + '/Material/retirarMaterial',
                        type: "POST",
                        data: JSON.stringify({
                            Id: idTemp,
                            Quantidade: valor
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data, textStatus, jQxhr) {
                            if (data) {
                                customAlert.alertSuccess("Sucesso!", "Material retirado com sucesso");
                                $scope.iniciaSistema();

                                $scope.filtroEstoque = "";
                                $scope.indiceSelecionado = 1;
                                $('.panel-collapse.in').collapse('hide');
                                $scope.$apply();
                            }
                            else
                                customAlert.alertError("Erro!", "Quantidade de material nao disponivel.");
                        },
                        error: function (data) {
                            customAlert.alertError("Erro!", "Erro ao retirar produto.");
                        }
                    });
                }

            });
        } else if (event.target.name.toString() == "incluir") {
            customAlert.getValue("incluir", function (valor) {
                if (valor == -1)
                    customAlert.alertError("Erro!", "Erro ao completar solicitacao.");
                else {
                    $.ajax({
                        url: httpRequest.returnConexao() + '/Material/incluirMaterial',
                        type: "POST",
                        data: JSON.stringify({
                            Id: idTemp,
                            Quantidade: valor
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data, textStatus, jQxhr) {
                            if (data) {
                                customAlert.alertSuccess("Sucesso!", "Material incluido com sucesso");
                                $scope.iniciaSistema();

                                $scope.filtroEstoque = "";
                                $scope.indiceSelecionado = 1;
                                $('.panel-collapse.in').collapse('hide');
                                $scope.$apply();
                            }
                            else
                                customAlert.alertError("Erro!", "Erro ao incluir material");
                        },
                        error: function (data) {
                            customAlert.alertError("Erro!", "Erro ao retirar produto.");
                        }
                    });
                }
            });
        }
        
    };

}]);