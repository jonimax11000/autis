# WebComponent

## Estructura

```bash
proyecto/frontend/js/
├── components
│   ├── CardComponent.js
│   ├── dashboardCard.js
│   ├── derechaCardindividual.js
│   ├── derechaCard.js
│   ├── empleatsCard.js
│   ├── estadisticasCard.js
│   ├── historialCard.js
│   ├── horasProjectosMiembroCardindividual.js
│   ├── horasProjectosMiembroCard.js
│   ├── miembroCard.js
│   ├── projectsCard.js
│   ├── tareasCard.js
│   ├── TimeEntrie.js
│   └── TimeEntries.js
├── libcomponents
│   └── base_component.js
└── listas
    ├── DashboardList.js
    ├── historialList.js
    ├── miembrosList.js
    ├── projectsList.js
    ├── tareasList.js
    └── TimeEntriesList.js
```

```mermaid
graph LR

%% Agrupación por tipo
subgraph index.js
  indexFrontend
end

subgraph Componentes Base
  cardComponent --> baseComponent
end

subgraph Componentes UI
  derechaCard --> cardComponent
  derechaInd --> cardComponent
  empleatsCard --> cardComponent
  estadisticasCard --> cardComponent
  historialCard --> cardComponent
  horasMiembroInd --> cardComponent
  projectsCard --> cardComponent
  tareasCard --> cardComponent
  timeEntrie --> cardComponent
end

subgraph Componentes Compuestos
  estadisticasCard --> derechaCard
  estadisticasCard --> derechaInd
  estadisticasCard --> horasMiembroInd
  dashboardCard --> timeEntries
  timeEntries --> timeEntrie
  miembroCard --> timeEntries
end

subgraph Listas
  dashboardList --> dashboardCard
  historialList --> historialCard
  miembrosList --> miembroCard
  projectsList --> projectsCard
  tareasList --> tareasCard
  timeEntriesList --> timeEntries
end



indexFrontend --> empleatsCard
indexFrontend --> projectsList
indexFrontend --> tareasList
indexFrontend --> dashboardList
indexFrontend --> historialList
indexFrontend --> estadisticasCard

empleatsCard --> indexFrontend
horasMiembroInd --> indexFrontend
projectsCard --> indexFrontend
tareasCard --> indexFrontend



```

```mermaid
graph TD

conn[conexiones/conection.js]
connAPI[conexiones/conectionAPI.js]
connBBDD[conexiones/conectionBBDD.js]
openRepo[repository/openProjectRepository.js]
indexBackend[backend/index.js]

connAPI --> conn
connBBDD --> conn
openRepo --> conn
indexBackend --> connAPI
indexBackend --> connBBDD
indexBackend --> openRepo
```
