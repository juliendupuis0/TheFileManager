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

Node.js
Docker
Docker Compose

## Lancement du projet

### 1. Configuration de l'environnement

Copiez le fichier `.env.example` pour créer votre fichier de configuration :

```bash
cp .env.example .env
```

Modifiez les variables d'environnement dans `.env` si nécessaire, notamment les clés d'accès.

### 2. Démarrage du serveur S3

Lancez le service S3 via Docker Compose, assurez-vous que docker est démarré :

```bash
docker compose up -d
```

### 3. Installation des dépendances

Installez les dépendances du projet :

```bash
npm install
```

### 4. Création de la base de données

Générez la base de donnée avec drizzle :

```bash
npx drizzle-kit migrate
```

### 5. Démarrage du serveur

Choisissez le mode de démarrage souhaité :

**Mode développement** — avec rechargement automatique :

```bash
npm run dev
```

**Mode production** :

```bash
npm start
```

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