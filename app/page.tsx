'use client'
import { useQuery } from '@apollo/client'
import { gql } from '@/types/__generated__/gql'

export default function Home() {
  const ISSUES_QUERY = gql(/* GraphQL */ `
    query SearchIssues($query: String!) {
      search(query: $query, type: ISSUE, last: 100) {
        nodes {
          ...IssueFragment
        }
      }
    }

    fragment IssueFragment on Issue {
      id
      title
      labels(first: 100) {
        nodes {
          name
        }
      }
      repository {
        name
      }
    }
  `)

  const { data, loading, error } = useQuery(ISSUES_QUERY, {
    variables: { query: `is:issue language:typescript` }
  })

  /**
   * Main page for GitHub OSS Founder
   */
  return (
    <div className="flex justify-center">
      <div className="w-8/12 pt-4 flex-col">
        <h2 className="text-xl">GitHub OSS Finder </h2>
        <p>Helps you to find OSS to contribute</p>

        <div className="pt-2 pb-2 flex">
          <div className="flex-1">
            <h3 className="mt-2 mb-2">Langulage</h3>
            <input type="text" className="input input-bordered input-sm" />
          </div>
          <div className="flex-1">
            <h3 className="mt-2 mb-2">Tags</h3>
            <input type="text" className="input input-bordered input-sm" />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary btn-sm">Search</button>
        </div>
        <div className="divider"></div>
        <h2>Search Result</h2>
        <div className="flex-col">
          <div>
            <label>data</label>
            {data?.search?.nodes?.map((node) => {
              return (
                <div className="border-y border-blue-300">
                  {JSON.stringify(node)}
                </div>
              )
            })}
          </div>
          <div>
            <label>error</label>
            <div>{JSON.stringify(error)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
