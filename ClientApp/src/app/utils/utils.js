"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = exports.LoginData = exports.Item = exports.Utils = void 0;
var http_1 = require("@angular/common/http");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.SortItems = function (items, caso) {
        items = items.sort(function (a, b) {
            return Utils.Sorter(a, b, caso);
        });
        items.forEach(function (item) {
            caso == 1 ? item.ordine = item.ordineLidl : item.ordine = item.ordineAldi;
        });
        return items;
    };
    Utils.Sorter = function (a, b, caso) {
        var i;
        var j;
        //aldi
        if (caso == 2) {
            i = a.ordineAldi;
            j = b.ordineAldi;
        }
        //lidl
        else if (caso == 1) {
            i = a.ordineLidl;
            j = b.ordineLidl;
        }
        if (i == j) {
            if (a.nome.toUpperCase() != b.nome.toUpperCase()) {
                return a.nome.toUpperCase() > b.nome.toUpperCase() ? 1 : a.nome.toUpperCase() < b.nome.toUpperCase() ? -1 : 0;
            }
        }
        else {
            return i > j ? 1 : i < j ? -1 : 0;
        }
    };
    Utils.option = {
        headers: new http_1.HttpHeaders({
            'Content-Type': 'application/json',
        }),
        responseType: 'text',
        observe: 'response'
    };
    return Utils;
}());
exports.Utils = Utils;
var Item = /** @class */ (function () {
    function Item() {
        this.offertaLidl = false;
        this.offertaAldi = false;
    }
    return Item;
}());
exports.Item = Item;
var LoginData = /** @class */ (function () {
    function LoginData() {
    }
    return LoginData;
}());
exports.LoginData = LoginData;
var Page;
(function (Page) {
    Page[Page["Lista"] = 0] = "Lista";
    Page[Page["ListaBase"] = 1] = "ListaBase";
    Page[Page["ListaAutocomplete"] = 2] = "ListaAutocomplete";
})(Page = exports.Page || (exports.Page = {}));
//# sourceMappingURL=utils.js.map