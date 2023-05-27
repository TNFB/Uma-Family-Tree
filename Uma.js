const { createClient } = require("@supabase/supabase-js");
const { Jument } = require("./Jument");
require('dotenv').config()

const supabaseUrl = 'https://exllcbuluziffkuzcejq.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const client = createClient(supabaseUrl, supabaseKey)

const main = async () => {
    const cheval = new Jument(null,"0000334378");
    await save(cheval);
    getPedigree(cheval);
}

/**
 * 
 * @param {Jument} jument 
 */
const getPedigree = async (jument) => {
    if(jument.idPere && !await exist(jument.idPere)){
        const pere = new Jument(null,jument.idPere);
        console.log(pere);
        const resultPere = await save(pere);
        if(resultPere){
            await getPedigree(pere);
        }
    }

    if(jument.idMere && !await exist(jument.idMere)){
        const mere = new Jument(null,jument.idMere);
        console.log(mere);
       const resultMere = await save(mere);
        if(resultMere){
            await getPedigree(mere);
        }
    }
}

/**
 * 
 * @param {Jument} jument 
 */
const save = async (jument) => {
    const {_,error} = await client.from("Juments").insert([jument]);
    if(error) return null;
    else return 1;
}

const exist = async (id) => {
    const res = await client.from("Juments").select("*").eq("id",id)
    return res.data.length != 0;
}

main();




// const Juments = {
//     tableau: [],
//     tableau2: [],
//     tableau3: [],
//     tableau4: [],
//     ajouterJument : function(nom) {
//         let ID = recupIDNom(nom)[0]
//         let nomFormat = recupIDNom(nom)[1]
//         let pere = recupPereMere(ID)[0]
//         let mere = recupPereMere(ID)[1]
//         this.tableau.push([ID, nomFormat, pere, mere])
//     },
//     ajouterJumentID : function(ID) {
//         let nomFormat = recupNomViaID(ID)[0]
//         let pere = recupPereMere(ID)[0]
//         let mere = recupPereMere(ID)[1]
//         this.tableau.push([ID, nomFormat, pere, mere])
//     },
//     ajouterPere : function(num) {
//         let ID = num[2]
//         let nomFormat = recupNomViaID(ID)[0]
//         let pere = recupPereMere(ID)[0]
//         let mere = recupPereMere(ID)[1]
//         this.tableau2.push([ID, nomFormat, pere, mere])
//     },
//     ajouterMere : function(num) {
//         let ID = num[3]
//         let nomFormat = recupNomViaID(ID)[0]
//         let pere = recupPereMere(ID)[0]
//         let mere = recupPereMere(ID)[1]
//         this.tableau2.push([ID, nomFormat, pere, mere])
//     },
//     ajouterGrandPere : function(num) {
//         let ID = num[2]
//         let nomFormat = recupNomViaID(ID)[0]
//         let pere = recupPereMere(ID)[0]
//         let mere = recupPereMere(ID)[1]
//         this.tableau3.push([ID, nomFormat, pere, mere])
//     },
//     ajouterGrandMere : function(num) {
//         let ID = num[3]
//         let nomFormat = recupNomViaID(ID)[0]
//         let pere = recupPereMere(ID)[0]
//         let mere = recupPereMere(ID)[1]
//         this.tableau3.push([ID, nomFormat, pere, mere])
//     },
//     ajouterArriereGrandPere : function(num) {
//         let ID = num[2]
//         let nomFormat = recupNomViaID(ID)[0]
//         let pere = recupPereMere(ID)[0]
//         let mere = recupPereMere(ID)[1]
//         this.tableau4.push([ID, nomFormat, pere, mere])
//     },
//     ajouterArriereGrandMere : function(num) {
//         let ID = num[3]
//         let nomFormat = recupNomViaID(ID)[0]
//         let pere = recupPereMere(ID)[0]
//         let mere = recupPereMere(ID)[1]
//         this.tableau4.push([ID, nomFormat, pere, mere])
//     },
//     ajouterParents : function(num) {
//         this.ajouterPere(num)
//         this.ajouterMere(num)
//     },
//     ajouterGrandParents : function(num) {
//         this.ajouterGrandPere(num)
//         this.ajouterGrandMere(num)
//     },
//     ajouterArrieresGrandParents : function(num) {
//         this.ajouterArriereGrandPere(num)
//         this.ajouterArriereGrandMere(num)
//     }
// }


// Juments.ajouterJument("Oguri Cap")
// Juments.ajouterJument("Tokai Teio")
// Juments.ajouterJument("Mejiro McQueen")
// Juments.ajouterJument("Symboli Rudolf")
// Juments.ajouterJument("Nice Nature")

// console.log(Juments.tableau)

// Juments.tableau.forEach(element => {
//     Juments.ajouterParents(element)
// });

// console.log(Juments.tableau2)

// Juments.tableau2.forEach(element => {
//     Juments.ajouterGrandParents(element)
// });

// console.log(Juments.tableau3)

// Juments.tableau3.forEach(element => {
//     Juments.ajouterArrieresGrandParents(element)
// });

// console.log(Juments.tableau4)