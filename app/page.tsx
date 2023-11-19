'use client'

import useIssues from '@/lib/github/hooks/useIssue'

export default function Home() {
  const { issues, error } = useIssues('is:issue label:"help wanted"')
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
            {issues?.map((issue) => {
              return (
                <div>
                  <div>title: {issue.title}</div>
                  <div>
                    label:{' '}
                    {issue.labels?.map((label) => {
                      return <div>{label.name}</div>
                    })}
                  </div>
                  <div>{issue.repository}</div>
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
