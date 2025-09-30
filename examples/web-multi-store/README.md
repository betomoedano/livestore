# Multi-Store App

This example demonstrates the `createStoreContext` API for managing multiple LiveStore instances in a React application.

## Patterns

The app showcases four multi-store patterns:

### Independent
**Independent · Different Types · Separate Loading**

Shows completely independent stores of different types loading concurrently with separate Suspense boundaries.

### Multi-Instance
**Independent · Same Type · Shared Loading**

Shows multiple instances of the same store type loading concurrently with a shared Suspense boundary.

### Chained
**Dependent · Different Types · Separate Loading**

Shows nested stores of different types (Workspace → Issue) where the inner store depends on outer store data and loads separately with its own Suspense boundary.

### Recursive
**Dependent · Same Type · Shared Loading**

Shows nested stores of the same type (Issue → Sub-Issue) to demonstrate recursive relationships with a shared Suspense boundary.

## Key Implementation Details

- **Store Contexts**: Each store type (workspace, issue) has its own context created with `createStoreContext`
- **Suspense Integration**: Each provider suspends until the store is ready, using React Suspense boundaries
- **Error Boundaries**: Errors during store initialization are caught by React Error Boundaries
- **Multi-Instance Access**: Components can access specific store instances using `useIssueStore({ storeId: 'instance-id' })`. `useStore()` without an ID accesses the store from the closest provider of the same type.

## File Structure

```
src/
├── stores/
│   ├── workspace/       # Workspace store
│   │   ├── schema.ts    # Schema definition
│   │   ├── worker.ts    # Dedicated Worker of this store
│   │   └── context.tsx  # React context using createStoreContext
│   └── issue/           # Issue store
├── components/
│   ├── IndependentDemo.tsx     # Pattern 1
│   ├── MultiInstancesDemo.tsx  # Pattern 2
│   ├── ChainedDemo.tsx         # Pattern 3
│   ├── RecursiveDemo.tsx       # Pattern 4
│   ├── WorkspaceView.tsx
│   └── IssueView.tsx
├── Root.tsx  # Main app with tab navigation
└── main.tsx  # Entry point
```
