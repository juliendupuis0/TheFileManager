# The File Manager

## Présentation

    The File Manager est un gestionnaire de fichiers pour parcourir vos fichiers.
    Il permet de créer des dossiers et de stocker des fichiers.
    Les fichiers et les dossiers peuvent être rangés dans des collections prédéfinies ou créées par l'utilisateur.
    Une collection "récents" est prédéfinie et mise en avant dès l'arrivée sur l'accueil.
    Il est possible d'épingler jusqu'à 5 fichiers ou dossiers et de marquer des collections comme favorites.

## Stack technique

- SQLite
- JavaScript
- Node.js (Express)
- HTML
- CSS (Tailwind)
- SeaweedFS
- Drizzle ORM
- Docker


## Prérequis


## Lancement


## Comptes de test


## Correspondance avec le sujet

| Exigence | Page / URL / Fichier |
|----------|----------------------|
| D1       |                      |
| D2       |                      |
| D3       |                      |
| D4       |                      |
| F1       |                      |
| F2       |                      |
| F3       |                      |
| F4       |                      |
| F5       |                      |
| F6       |                      |
| F7       |                      |
| F8       |                      |
| F9       |                      |
| F10      |                      |
| F11      |                      |
| F12      |                      |
| F13      |                      |
| F14      |                      |
| N1       |                      |
| N2       |                      |
| N3       |                      |
| N4       |                      |

| Élément        | Valeur              |
|----------------|---------------------|
| Entité A       |  File               |
| Entité B       |  Directory          |
| Relation 1-N 1 |  Versions -> File   |
| Relation 1-N 2 |  File -> directory  |
| Relation N-N   |  File -> Collection |
| Seed | 5 fichiers (2 épinglés), 5 dossiers (2 épinglés), 5 collections ("récents" + 4 classiques dont 2 favorites), 10 versions |

## Contenu de la seed 
- 5 fichiers
- 5 dossiers
- 5 collections : "récents" est spéciale et non supprimable et 4 collections classiques
> 2 de ces collections classiques sont en "favoris"
- 10 versions pour que plusieurs versions soient lié à un même fichier ou dossier
- 2 fichiers et 2 dossiers épinglés