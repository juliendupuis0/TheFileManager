# Fiche de projet - The File Manager

## Pitch

    The File Manager est un gestionnaire de fichiers pour parcourir vos fichiers.
    Il permet de créer des dossiers et de stocker des fichiers.
    Les fichiers et les dossiers peuvent porter des étiquettes prédéfinies ou créées par l'utilisateur.
    Des étiquettes "récents" et "favoris" sont prédéfinis et mis en avant dès l'arrivée sur menu.

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


## Contenu du seed

- 5 fichiers
- 5 dossiers
- 5 collections : "récents" et "favoris" qui sont spéciales et non supprimables et trois collections classiques
- 10 versions pour que plusieurs versions soient lié à un même fichier ou dossier