# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

Technical assessment for PALVI. Goal: help a Head of Sales quickly understand where to focus attention today using daily B2B SaaS metrics. Supports datasets A/B/C/D.

Core transformation:
```
Raw JSON → Domain Layer → Business Intelligence → Executive Insights → UI
```

## Architecture

Three strict layers with one-directional dependency flow:

```
UI → View Models → Selectors/Use Cases → Domain Calculators → Dataset Adapters → Raw JSON
```

### Data Layer (`src/data/`, `src/domain/metrics/adapters/`)
- Load and normalize raw JSON datasets
- Type and adapt raw fields — no business logic

### Domain Layer (`src/domain/metrics/`) — most important
- All derived metrics, trend analysis, anomaly detection, funnel calculations, executive summaries
- Examples: `calculateWinRate()`, `calculateWeekOverWeek()`, `buildExecutiveSummary()`, `analyzeMetricTrend()`
- Must be pure functions, fully testable without UI

### Presentation Layer (`src/components/`)
- Components receive prepared view models only
- Never calculate metrics or interpret domain rules
- Never access raw dataset directly

## Domain Rules

The `direction` field on each metric drives all interpretation:
- `higher_is_better`: increase = good
- `lower_is_better`: increase = bad

Never hardcode metric-name assumptions. All insight generation and status indicators must read `direction`.

Null values are valid — never crash on missing data, always provide safe fallbacks.

## State Management

Zustand or lightweight React Context only. Store: selected dataset, active filters, date ranges. No Redux.

## Folder Structure

```
src/
├── components/
│   ├── dashboard/
│   ├── charts/
│   ├── summary/
│   └── shared/
├── domain/
│   └── metrics/
│       ├── adapters/
│       ├── analyzers/
│       ├── calculators/
│       ├── selectors/
│       └── types.ts
├── hooks/
├── stores/
├── data/
├── pages/
└── utils/
```

## Coding Rules

- TypeScript strict mode
- Pure functions in domain layer
- Composition over inheritance
- Explicit, descriptive naming — one responsibility per module (`calculateWinRate.ts`, not `utils.ts`)
- Extend via strategy maps / analyzer registries, not if/else chains keyed on metric names
- No giant components that fetch + analyze + render

## Must-Have Features

- Dataset switching (A/B/C/D)
- Executive summary
- Derived business metrics
- Funnel visualization
- Trend analysis
- Semantic status indicators respecting `direction`
- Null/empty state handling
- Responsive layout
