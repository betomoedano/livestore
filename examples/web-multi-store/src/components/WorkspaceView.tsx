import { queryDb } from '@livestore/livestore'
import { Suspense } from 'react'
import { IssueStoreProvider } from '../stores/issue/context.ts'
import { useWorkspaceStore } from '../stores/workspace/context.ts'
import { workspaceEvents, workspaceTables } from '../stores/workspace/schema.ts'
import { IssueView } from './IssueView.tsx'

export function WorkspaceView() {
  const workspaceStore = useWorkspaceStore()

  const workspace = workspaceStore.useQuery(queryDb(workspaceTables.workspaces.select().limit(1)))
  const issues = workspaceStore.useQuery(
    queryDb(
      workspaceTables.issues
        .select('id')
        .where({ workspaceId: workspace?.id ?? '' })
        .orderBy('createdAt', 'desc'),
    ),
  )

  const handleCreateIssue = () => {
    const id = `issue-${Date.now()}`
    workspaceStore.commit(
      workspaceEvents.issueCreated({
        id,
        workspaceId: workspace.id,
        title: `Issue ${issues.length + 1}`,
        createdAt: new Date(),
      }),
    )
  }

  return (
    <div className="container">
      <h2>Workspace Store</h2>
      <div className="store-info">
        <strong>Store ID:</strong> {workspaceStore.storeId}
      </div>

      <div style={{ marginBottom: 20 }}>
        <button onClick={handleCreateIssue}>Create Issue</button>
      </div>

      <h3>Workspace</h3>
      <ul>
        <li>
          {workspace.name} (ID: {workspace.id})
        </li>
      </ul>

      <h3>Recent Issues ({issues.length})</h3>
      <ul>
        <Suspense fallback={<div className="loading">Loading issue stores...</div>}>
          {issues.map((issue) => (
            <IssueStoreProvider key={issue.id} storeId={`issue-${issue.id}`}>
              <IssueView key={issue.id} />
            </IssueStoreProvider>
          ))}
        </Suspense>
      </ul>
    </div>
  )
}
