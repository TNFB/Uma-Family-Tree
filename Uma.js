function httpGetSync(Url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", Url, false);
    xmlHttp.send(null);
}

function recupIDNom(nom) {
    let url = "https://www.jbis.jp/navi_search/?keyword=" + nom.split(" ").join("+")
    let page
    let client = httpGetSync(url, function (response) {
    let parser = new DOMParser()
    let doc = parser.parseFromString(response, "text/html")
    page = doc.querySelector('tbody a').outerHTML.match(/([0-9]+)[^>]*>([^(]*)/m).filter((_,i)=>i!=0)})

    return page
}

function recupNomViaID(id) {
    let url = "https://www.jbis.jp/horse/" + id + "/"
    let page
    let client = httpGetSync(url, function (response) {
    let parser = new DOMParser()
    let doc = parser.parseFromString(response, "text/html")
    page = doc.querySelector("#str-contents > div.hdg-l1-02-container > h1").textContent.match(/[^(]*/m).filter((_,i)=>i=1)})

    return page
}

function recupPereMere(id) {
    let url = "https://www.jbis.jp/horse/" + id + "/pedigree/"
    let pere, mere
    let client = httpGetSync(url, function (response) {
    let parser = new DOMParser()
    let doc = parser.parseFromString(response, "text/html")
    pere = doc.querySelector('#str-main > div.box-container-02.box-square-01 > div > table.tbl-pedigree-01.reset-mb-00 > tbody > tr:nth-child(1) > th > a').outerHTML.match(/([0-9]+)[^>]*>([^(]*)/m).filter((_,i)=>i!=0)[0]
    mere = doc.querySelector('#str-main > div.box-container-02.box-square-01 > div > table.tbl-pedigree-01.reset-mb-00 > tbody > tr:nth-child(17) > th > a').outerHTML.match(/([0-9]+)[^>]*>([^(]*)/m).filter((_,i)=>i!=0)[0]})
    return [pere, mere]
}

const Juments = {
    tableau: [],
    tableau2: [],
    tableau3: [],
    tableau4: [],
    ajouterJument : function(nom) {
        let ID = recupIDNom(nom)[0]
        let nomFormat = recupIDNom(nom)[1]
        let pere = recupPereMere(ID)[0]
        let mere = recupPereMere(ID)[1]
        this.tableau.push([ID, nomFormat, pere, mere])
    },
    ajouterJumentID : function(ID) {
        let nomFormat = recupNomViaID(ID)[0]
        let pere = recupPereMere(ID)[0]
        let mere = recupPereMere(ID)[1]
        this.tableau.push([ID, nomFormat, pere, mere])
    },
    ajouterPere : function(num) {
        let ID = num[2]
        let nomFormat = recupNomViaID(ID)[0]
        let pere = recupPereMere(ID)[0]
        let mere = recupPereMere(ID)[1]
        this.tableau2.push([ID, nomFormat, pere, mere])
    },
    ajouterMere : function(num) {
        let ID = num[3]
        let nomFormat = recupNomViaID(ID)[0]
        let pere = recupPereMere(ID)[0]
        let mere = recupPereMere(ID)[1]
        this.tableau2.push([ID, nomFormat, pere, mere])
    },
    ajouterGrandPere : function(num) {
        let ID = num[2]
        let nomFormat = recupNomViaID(ID)[0]
        let pere = recupPereMere(ID)[0]
        let mere = recupPereMere(ID)[1]
        this.tableau3.push([ID, nomFormat, pere, mere])
    },
    ajouterGrandMere : function(num) {
        let ID = num[3]
        let nomFormat = recupNomViaID(ID)[0]
        let pere = recupPereMere(ID)[0]
        let mere = recupPereMere(ID)[1]
        this.tableau3.push([ID, nomFormat, pere, mere])
    },
    ajouterArriereGrandPere : function(num) {
        let ID = num[2]
        let nomFormat = recupNomViaID(ID)[0]
        let pere = recupPereMere(ID)[0]
        let mere = recupPereMere(ID)[1]
        this.tableau4.push([ID, nomFormat, pere, mere])
    },
    ajouterArriereGrandMere : function(num) {
        let ID = num[3]
        let nomFormat = recupNomViaID(ID)[0]
        let pere = recupPereMere(ID)[0]
        let mere = recupPereMere(ID)[1]
        this.tableau4.push([ID, nomFormat, pere, mere])
    },
    ajouterParents : function(num) {
        this.ajouterPere(num)
        this.ajouterMere(num)
    },
    ajouterGrandParents : function(num) {
        this.ajouterGrandPere(num)
        this.ajouterGrandMere(num)
    },
    ajouterArrieresGrandParents : function(num) {
        this.ajouterArriereGrandPere(num)
        this.ajouterArriereGrandMere(num)
    }
}


Juments.ajouterJument("Oguri Cap")
Juments.ajouterJument("Tokai Teio")
Juments.ajouterJument("Mejiro McQueen")
Juments.ajouterJument("Symboli Rudolf")
Juments.ajouterJument("Nice Nature")

console.log(Juments.tableau)

Juments.tableau.forEach(element => {
    Juments.ajouterParents(element)
});

console.log(Juments.tableau2)

Juments.tableau2.forEach(element => {
    Juments.ajouterGrandParents(element)
});

console.log(Juments.tableau3)

Juments.tableau3.forEach(element => {
    Juments.ajouterArrieresGrandParents(element)
});

console.log(Juments.tableau4)