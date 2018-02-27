//custom alerts
var CustomAlert = function () {

    this.delayModalClose = function (delayMillis, _modalName) {
        //1000 = 1 second
        setTimeout(function () {
            $("#" + _modalName).modal("hide");
            //your code to be executed after 1 second
        }, delayMillis);
    }


    this.alertWarning = function (_msg) {
        $.alert({
            alignMiddle: false,
            offsetTop: 120,
            backgroundDismiss: true,
            //title: $v2.translate("Attention"),
            title: "Atenção",
            titleClass: 'msg-warning',
            content: _msg,
            icon: 'fa fa-exclamation-triangle',
            closeIcon: true,
            draggable: false,
            type: 'orange',
            buttons: {
                Ok: {
                    text: 'Ok',
                    btnClass: 'btn-orange'
                }
            }
        });
    }

    this.alertSuccess = function (_title, _msg) {
        $.alert({
            alignMiddle: false,
            offsetTop: 120,
            title: _title,
            titleClass: 'msg-success',
            content: _msg,
            icon: 'fa fa-check',
            closeIcon: true,
            type: 'green',
            backgroundDismiss: false,
            backgroundDismissAnimation: 'glow-green',
            buttons: {
                Ok: {
                    text: 'Ok',
                    btnClass: 'btn-green'
                }
            }
        });
    }

    this.alertError = function (_title, _msg) {
        $.alert({
            alignMiddle: false,
            offsetTop: 120,
            backgroundDismiss: false,
            backgroundDismissAnimation: 'glow',
            //title: $v2.translate("Error"),
            title: _title,
            titleClass: 'msg-error',
            content: _msg,
            icon: 'fa fa-times',
            closeIcon: true,
            draggable: false,
            type: 'red',
            buttons: {
                Ok: {
                    text: 'Ok',
                    btnClass: 'btn-red'
                }
            }
        });
    }

    this.confirmError = function (_title, _msg, _function, _parameter) {
        $.confirm({
            alignMiddle: false,
            offsetTop: 120,
            backgroundDismiss: false,
            backgroundDismissAnimation: 'glow',
            //title: $v2.translate("Error"),
            title: _title,
            titleClass: 'msg-error',
            content: _msg,
            icon: 'fa fa-times',
            closeIcon: true,
            draggable: false,
            type: 'red',
            buttons: {
                ok: function () {
                    _function(_parameter);
                },
                cancel: function () {
                }
            }
        });
    }

    this.confirmWarning = function (_title, _msg, _function, _parameter) {
        $.confirm({
            alignMiddle: false,
            offsetTop: 120,
            backgroundDismiss: true,
            //title: $v2.translate("Attention"),
            title: _title,
            titleClass: 'msg-warning',
            content: _msg,
            icon: 'fa fa-exclamation-triangle',
            closeIcon: true,
            draggable: false,
            type: 'orange',
            buttons: {
                ok: function () {
                    _function(_parameter);
                },
                cancel: function () {
                }
            }
        });
    }

    this.confirmSuccess = function (_title, _msg, _function, _parameter) {
        $.confirm({
            alignMiddle: false,
            offsetTop: 120,
            title: _title,
            titleClass: 'msg-success',
            content: _msg,
            icon: 'fa fa-check',
            closeIcon: true,
            type: 'green',
            backgroundDismiss: false,
            backgroundDismissAnimation: 'glow-green',
            buttons: {
                ok: function () {
                    _function(_parameter);
                },
                cancel: function () {
                }
            }
        });
    }

    this.getValue = function (tipo, _function) {
        $.confirm({
            title: 'Digite a quantidade a ' + tipo,
            content: '' +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            '<input type="text" placeholder="Quantidade" class="quantidade form-control" required />' +
            '</div>' +
            '</form>',
            buttons: {
                cancel: {
                    text: 'Cancelar',
                    btnClass: 'btn-red',
                    action: function () {
                        _function(-2);
                    }
                },
                formSubmit: {
                    text: 'Confirmar',
                    btnClass: 'btn-green',
                    action: function () {
                        var value = this.$content.find('.quantidade').val();
                        if (value == "")
                            _function(-1);
                        else
                            _function(value);
                    }
                }
            }
        });
    }
}