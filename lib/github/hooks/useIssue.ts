import { nonNullable } from '@/lib/utils/array'
import { gql } from '@/types/__generated__/gql'
import { useQuery } from '@apollo/client'

const ISSUES_QUERY = gql(/* GraphQL */ `
  query SearchIssues($query: String!) {
    search(query: $query, type: ISSUE, last: 100) {
      nodes {
        ... on Issue {
          id
          title
          titleHTML
          url
          publishedAt
          labels(first: 100) {
            nodes {
              color
              name
              url
            }
          }
          repository {
            id
            name
            nameWithOwner
            description
            descriptionHTML
            forkCount
            stargazerCount
            url
          }
        }
      }
    }
  }
`)

const useIssues = (query: string) => {
  const { data, loading, error } = useQuery(ISSUES_QUERY, {
    variables: { query: query }
  })

  const issues = data?.search?.nodes
    ?.map((issue) => {
      if (issue?.__typename === 'Issue') {
        return {
          id: issue.id,
          title: issue.title,
          url: issue.url,
          publishedAt: issue.publishedAt,
          labels: issue.labels?.nodes
            ?.map((label) =>
              label?.__typename === 'Label'
                ? { name: label.name, color: label.color, url: label.url }
                : undefined
            )
            .filter(nonNullable),
          repository: {
            name: issue.repository.name,
            nameWithOwner: issue.repository.nameWithOwner,
            description: issue.repository.description,
            descriptipnHTML: issue.repository.descriptionHTML,
            forkCount: issue.repository.forkCount,
            stargazerCount: issue.repository.stargazerCount,
            url: issue.repository.url
          }
        }
      }
    })
    .filter(nonNullable)

  return { issues, loading, error }
}

export type Issue = NonNullable<ReturnType<typeof useIssues>['issues']>[number]

export default useIssues
