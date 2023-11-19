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
          labels(first: 100) {
            nodes {
              name
            }
          }
          repository {
            id
            name
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
    ?.map((node) => {
      if (node?.__typename === 'Issue') {
        return {
          id: node.id,
          title: node.title,
          labels: node.labels?.nodes
            ?.map((label) =>
              label?.__typename === 'Label' ? { name: label.name } : undefined
            )
            .filter(nonNullable),
          repository: node.repository.name
        }
      }
    })
    .filter(nonNullable)

  return { issues, loading, error }
}

export default useIssues
