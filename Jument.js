const { httpGetSync } = require("./Utils");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.Jument = class Jument{
    id;
    name;
    sexe;
    idPere;
    idMere;

    constructor(name,id,sexe){
        if(name && id){
            this.name = name;
            this.id = id;
        }else if(name && !id){
            this.name = name;
            this.id = this.recupId();
        }else if(id && !name){
            this.id = id;
            this.name = this.recupName();
        }else{
            throw "Need at least name or id";
        }
        this.setParent();
        this.sexe = sexe;
    }

    recupId() {
        return Jument.recupIDByName(this.name);
    }
    recupName() {
        return Jument.recupNameById(this.id);
    }

    setParent() {
        [this.idPere,this.idMere] = Jument.getParentById(this.id);
    }

    addEnfant(...idsEnfants){
        this.idsEnfants.push(idsEnfants);
    }

    static recupIDByName(name) {
        const url = "https://www.jbis.jp/navi_search/?keyword=" + name.split(" ").join("+")
        let id;
        httpGetSync(url, (response) => {
            const page = new JSDOM(response)
            const document = page.window.document;
            id = document.querySelector('tbody a').href.match(/[0-9]+/i).pop();
        })
        return id;
    }

    static getParentById(id) {
        const url = "https://www.jbis.jp/horse/" + id + "/pedigree/"
        let parents;
        httpGetSync(url, function (response) {
            const page = new JSDOM(response)
            const document = page.window.document;
            parents = Array.from(document.querySelectorAll(".tbl-pedigree-01 th > a")).map(e => e.href.match(/[0-9]+/i).pop());
        })
        return parents
    }

    static recupNameById(id) {
        const url = "https://www.jbis.jp/horse/" + id + "/"
        let name;
        httpGetSync(url, function (response) {
            const page = new JSDOM(response)
            const document = page.window.document;
            name = document.querySelector("h1").textContent.match(/[^(]+/i).pop();
        })
    
        return name;
    }

} 
