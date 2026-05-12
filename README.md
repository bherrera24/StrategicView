# Decisiones de arquitectura de StrategicView

La app está organizada en capas con dependencia en una sola dirección: el JSON crudo entra, los *adapters* lo normalizan, el dominio calcula métricas, tendencias y el resumen ejecutivo, los *selectors* arman el view model y recién ahí los componentes lo renderizan. La interpretación de cada métrica vive en metadata (`direction: higher_is_better / lower_is_better`)


### 1. Capa de adaptación de datos (`NormalizedDataset` + adapter)

Esta capa se encarga de transformar y normalizar los datos que vienen del JSON para que el resto de la aplicación no dependa directamente de la estructura original.

### 2. Métricas configuradas por metadata en lugar de lógica hardcodeada

Cada métrica define si un valor más alto o más bajo representa una mejora (`higher_is_better` / `lower_is_better`). Esto evita tener múltiples `if` específicos por métrica y permite agregar nuevas métricas sin modificar la lógica principal del sistema.

### 3. Funciones de cálculo pequeñas y reutilizables

Los cálculos están separados en funciones puras y específicas, como:

  - tasa de éxito (calculateWinRate)
  - conversiones (calculateConversionRate)
  - comparación semana a semana (calculateWeekOverWeek)

Un ejemplo importante es `calculateConversionRate`, que funciona de manera genérica para cualquier combinación de métricas, evitando crear funciones duplicadas para cada caso.


### 4. ViewModels como puente entre dominio y UI

Los componentes de React no trabajan directamente con datos crudos ni con lógica de negocio. Los viewModels entregan la información ya preparada y lista para renderizar, lo que ayuda a mantener la UI más limpia y enfocada sólo en presentación.

### 5. `useDashboardData` como punto central de orquestación

Este hook coordina el flujo de datos del dashboard. Desde ahí se cargan, transforman, filtran y preparan los datos para la interfaz. Además, centraliza la interacción entre la UI y el dominio.


### Decisiones de stack

Elegí Vite para la velocidad, Zustand para un estado simple y Recharts para las gráficas. Sumé Tailwind para el diseño y ESLint para asegurar la calidad.

## Próxima iteración

- Refactorizar la ui para implementar **Storybook** para tener una librería de componentes separados por niveles (átomos, moléculas y organismos) que puedan contar con documentación y permitan reutilizar y escalar de forma eficiente.
- Agregaría un bff, como una capa fina que sirve a esta ui. Ahí viviría la normalización de datasets (A/B/C/D), los cálculos derivados, el análisis de tendencias y el resumen ejecutivo. El frontend recibiría un view model ya listo y solo tendría la responsabilidad de renderizarlo.
- Ahora uso un umbral del 5% para decidir qué mostrar como alerta y limpiar el ruido visual, ese es mi punto de partida, pero la meta es permitir que ese número se pueda personalizar.