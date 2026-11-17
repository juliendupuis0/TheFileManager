*SUJET.md - Fiche projet*

## le pitch


    The File Manager est un gestionnaire de fichiers pour parcourir vos fichiers.
    Il permet de créer des dossiers et de stocker des fichiers.
    Les fichiers et les dossiers peuvent porter des étiquettes prédéfinies ou créées par l'utilisateur.
    Des tags "récents" et "favoris" sont prédéfinis et mis en avant dès l'arrivée sur menu.


## membre du groupe


    - Théo Girard
    - Esteban Tassi
    - Julien Dupuis
    - Louis Schill


## stack technique


    - SQLite
    - JavaScript
    - Node.js (Express)
    - HTML
    - CSS (Tailwind)
    - MinIO


## entités


    - files
    - directory
    - collections
    - versions


## relations


   - Files n -> 1 Directory
   - Versions n -> 1 Files
   - Files n -> n Collections
   - Directory n -> n Collections
   - Versions n -> 1 Directory


## entités gérables


   ### Files
   - id
   - name
   - extension
   - date
    
   ### Directory
   - id
   - name
   - date


## contenu du seed


    - 5 files
    - 5 directories
    - 5 collections, "récents" et "favori" qui sont spéciaux et non supprimable et trois collections classiques
    - 10 versions pour que plusieurs versions soit lié à un même file ou directory



