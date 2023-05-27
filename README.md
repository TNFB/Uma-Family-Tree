# Uma-Family-Tree

# Configuration
Ajoutez une variable d'environnement
```conf
SUPABASE_KEY = KEY
```
possedant la clé API pour Supabase 
Soit directement dans vos variables d'environnement 
soit via dotenv (package npm) en créant un fichier .env

Ensuite installez les packages requis:
```sh
npm i
```

# Initialisation

Rentrer le nom ou l'id du cheval de départ à l'intérieur de la fonction "main"
au niveau de la création du premier cheval
soit 
```js
const cheval = new Jument("nom");
```
soit 
```js
const cheval = new Jument(null,"id")
```

# Démarage

Entrez ceci dans le terminal de commande
```sh
node ./Uma.js
```
