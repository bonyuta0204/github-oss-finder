/** PropType */
import type { Issue } from '@/lib/github/hooks/useIssue'

type IssueCardProps = {
  issue: Issue
}

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <div className="h-36 card card-compact card-bordered bg-base-100 shadow-sm">
      <div className="card-body ">
        <div className="flex">
          <a className="card-title flex-1" href={issue.repository.url}>
            {issue.repository.nameWithOwner}
          </a>
          <div>★ {issue.repository.stargazerCount}</div>
        </div>
        <div className="text-sm">{issue.title}</div>

        <div className="flex gap-2">
          {issue.labels?.map((label) => (
            <a
              className="badge text-white text-xs leading-5"
              style={{ backgroundColor: `#${label.color}` }}
              href={label.url}
            >
              {label.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IssueCard
