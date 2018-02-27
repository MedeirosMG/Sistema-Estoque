app.controller('excluirMateriais', ['$scope', 'ListService', '$rootScope', 'httpRequest', function ($scope, ListService, $rootScope, httpRequest) {
    var customAlert = new CustomAlert();
    $scope.listaMateriais = [];

    $rootScope.$on("inicializaExcluir", function () {
        $.ajax({
            url: httpRequest.returnConexao() + '/Material/getMateriais',
            type: 'GET',
            success: function (data) {
                $scope.listaMateriais = data;
                if (data.length == 0) {
                    $("#selectExcluir").val("0").trigger("change");
                    $("#selectExcluir").prop("disabled", true);

                    $("#semitem").show();
                } else {
                    $("#selectExcluir").prop("disabled", false);
                    $("#semitem").hide();
                }

                $scope.$apply();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                customAlert.alertError("Erro!", "Erro interno.");
            }
        });
    });

    $scope.deletarMaterial = function () {
        if ($scope.materialSelecionado != "undefined") {
            $.ajax({
                url: httpRequest.returnConexao() + '/Material/deletarMaterial',
                type: "POST",
                data: JSON.stringify({ Id: $scope.materialSelecionado }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data, textStatus, jQxhr) {
                    if (data) {
                        $rootScope.$emit("inicializaExcluir");
                        customAlert.alertSuccess("Sucesso", "Material removido com sucesso!");
                        $rootScope.$emit("atualizaLista");
                    }
                    else
                        customAlert.alertError("Erro!", "Erro ao excluir material.");
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    customAlert.alertError("Erro!", "Erro ao adicionar produto.");
                }
            });
        }
    };
    
}]);

app.controller('incluirMaterial', ['$scope', 'ListService', 'httpRequest','$rootScope', function ($scope, ListService, httpRequest, $rootScope) {
    var customAlert = new CustomAlert();
    $scope.produto = {
        Id: 0,
        nome: null,
        Quantidade: 0
    };


    $rootScope.$on("novoMaterial", function () {
        $.ajax({
            url: httpRequest.returnConexao() + '/Material/getModelProduto',
            type: 'GET',
            success: function (data) {
                $scope.produto = data;
                $scope.$apply();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                customAlert.alertError("Erro!", "Erro interno.");
            }
        });
    });

    $scope.insereInformacoes = function () {
        $.ajax({
            url: httpRequest.returnConexao() + '/Material/insereProduto',
            type: "POST",
            data: JSON.stringify($scope.produto),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jQxhr) {
                if (data) {
                    $rootScope.$emit("novoMaterial");
                    customAlert.alertSuccess("Sucesso!", "Material inserido com sucesso!");
                    $rootScope.$emit("atualizaLista");
                }
                else
                    customAlert.alertError("Erro", "Erro ao inserir material!");
            },
            error: function (jqXhr, textStatus, errorThrown) {
                customAlert.alertError("Erro!", "Erro ao adicionar produto.");
            }
        });
    };
}]);