# Fiche de projet - The File Manager

## Pitch

    The File Manager est un gestionnaire de fichiers pour parcourir vos fichiers.
    Il permet de créer des dossiers et de stocker des fichiers.
    Les fichiers et les dossiers peuvent être rangés dans des collections prédéfinies ou créées par l'utilisateur.
    Une collection "récents" est prédéfinie et mise en avant dès l'arrivée sur l'accueil.
    Il est possible d'épingler jusqu'à 5 fichiers ou dossiers.
    Il est possible de marquer des collections comme favorites.

## Membres du groupe

- Théo Girard
- Esteban Tassi
- Julien Dupuis
- Louis Schill

## Stack technique

- SQLite
- JavaScript
- Node.js (Express)
- HTML
- CSS (Tailwind)
- SeaweedFS
- Drizzle ORM
- Docker

## Entités

- files
- directory
- collections
- versions

## Relations

- Files n -> 1 Directory
- Versions n -> 1 Files
- Files n -> n Collections
- Directory n -> n Collections
- Versions n -> 1 Directory


## Entités gérables

### Files
- id
- name
- extension
- date
 
### Directory
- id
- name
- date

## La mise en avant
- Épinglé : cela peut être un fichier ou un dossier, avec un maximum de 5 éléments à la fois affiché sur la page d'accueil
- Favoris : une collection, sans nombre limite de fichiers ou dossiers, affichée sur la page d'accueil

## Contenu du seed

- 5 fichiers
- 5 dossiers
- 5 collections : "récents" est spéciale et non supprimable et 4 collections classiques
> 2 de ces collections classiques sont en "favoris"  
- 10 versions pour que plusieurs versions soient lié à un même fichier ou dossier
- 2 fichiers et 2 dossiers épinglés


