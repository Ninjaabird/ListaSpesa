"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortCase = exports.Page = exports.LoginData = exports.Item = exports.Utils = void 0;
var http_1 = require("@angular/common/http");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.SortItems = function (items, caso) {
        items = items.sort(function (a, b) {
            return Utils.Sorter(a, b, caso);
        });
        items.forEach(function (item) {
            caso == SortCase.Lidl ? item.ordine = item.ordineLidl : item.ordine = item.ordineAldi;
        });
        return items;
    };
    Utils.Sorter = function (a, b, caso) {
        var i;
        var j;
        if (caso == SortCase.Aldi) {
            i = a.ordineAldi;
            j = b.ordineAldi;
        }
        else if (caso == SortCase.Lidl) {
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
    Utils.CorrectItem = function (item) {
        if (item.nome == undefined || item.nome == null)
            item.nome = "";
        if (item.offertaAldi == undefined || item.offertaAldi == null)
            item.offertaAldi = false;
        if (item.offertaLidl == undefined || item.offertaLidl == null)
            item.offertaLidl = false;
        if (item.ordineAldi == undefined || item.ordineAldi == null)
            item.ordineAldi = 0;
        if (item.ordineLidl == undefined || item.ordineLidl == null)
            item.ordineLidl = 0;
        if (item.prezzo == undefined || item.prezzo == null)
            item.prezzo = 0;
        if (item.quantita == undefined || item.quantita == null)
            item.quantita = 0;
    };
    Utils.option = {
        headers: new http_1.HttpHeaders({
            'Content-Type': 'application/json',
        }),
        responseType: 'text',
        observe: 'response'
    };
    Utils.requestType = ['', "Basic", "Autocomplete"];
    return Utils;
}());
exports.Utils = Utils;
var Item = /** @class */ (function () {
    function Item() {
        this.offertaLidl = false;
        this.offertaAldi = false;
    }
    Item.prototype.Clone = function () {
        var item = new Item();
        item.id = this.id;
        item.nome = this.nome;
        item.quantita = this.quantita;
        item.prezzo = this.prezzo;
        item.offertaLidl = this.offertaLidl;
        item.offertaAldi = this.offertaAldi;
        item.ordine = this.ordine;
        item.ordineLidl = this.ordineLidl;
        item.ordineAldi = this.ordineAldi;
        return item;
    };
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
var SortCase;
(function (SortCase) {
    SortCase[SortCase["Lidl"] = 0] = "Lidl";
    SortCase[SortCase["Aldi"] = 1] = "Aldi";
})(SortCase = exports.SortCase || (exports.SortCase = {}));
//# sourceMappingURL=utils.js.map