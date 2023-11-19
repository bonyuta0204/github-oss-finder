/** PropType */
import type { Issue } from '@/lib/github/hooks/useIssue'

type IssueCardProps = {
  issue: Issue
}

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <div className="h-36 card card-compact card-bordered bg-base-100 shadow-sm">
      <div className="card-body ">
        <div className="card-title">{issue.repository}</div>
        <div className="text-sm">{issue.title}</div>
        <div className="flex gap-2">
          {issue.labels?.map((label) => (
            <div className="badge">{label.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IssueCard
