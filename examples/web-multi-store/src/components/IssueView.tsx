import { queryDb } from '@livestore/livestore'
import { IssueStoreProvider, useIssueStore } from '../stores/issue/context.ts'
import { issueEvents, issueTables } from '../stores/issue/schema.ts'

export function IssueView() {
  // When no `storeId` is provided, use the store instance of the closest issue store provider
  const issueStore = useIssueStore()
  const issue = issueStore.useQuery(queryDb(issueTables.issue.select().limit(1)))

  // TODO: Handle the case where parentIssueId is null (i.e., no parent issue)
  const parentIssueStore = useIssueStore({ storeId: `issue-${issue.parentIssueId}` })
  const parentIssue = parentIssueStore.useQuery(queryDb(issueTables.issue.select().limit(1)))

  const handleChangeStatus = (status: 'todo' | 'in-progress' | 'done') => {
    issueStore.commit(
      issueEvents.issueStatusChanged({
        id: issue.id,
        status,
      }),
    )
  }

  if (!issue) {
    return <div>Issue not found</div>
  }

  return (
    <div className="container">
      <h3>Issue: {issue.title}</h3>
      <div className="store-info">
        <strong>Store ID:</strong> {issueStore.storeId}
        <br />
        <strong>Issue ID:</strong> {issue.id}
        <br />
        <strong>Parent Issue ID:</strong> {parentIssue ? `${parentIssue.title} (ID: ${parentIssue.id})` : 'None'}
      </div>

      <p>
        <strong>Status:</strong> {issue.status}
        <br />
        <button onClick={() => handleChangeStatus('todo')}>To Do</button>
        <button onClick={() => handleChangeStatus('in-progress')}>In Progress</button>
        <button onClick={() => handleChangeStatus('done')}>Done</button>
      </p>

      <h4>Child Issues ({issue.childIssueIds.length})</h4>
      <ul>
        {issue.childIssueIds.map((id) => (
          <IssueStoreProvider key={id} storeId={`issue-${id}`}>
            <IssueView key={id} />
          </IssueStoreProvider>
        ))}
      </ul>
    </div>
  )
}
