'use client'

import IssueCard from '@/components/IssueCard'
import useIssues from '@/lib/github/hooks/useIssue'
import Select from 'react-select'
import type { ActionMeta, MultiValue } from 'react-select'
import { useMemo, useState } from 'react'
import { buildIssueQuery } from '@/lib/github/search'

type Option = {
  label: string
  value: string
}
const labelOptions = [
  { value: 'good first issue', label: 'Good First Issue' },
  { value: 'help wanted', label: 'Help Wanted' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'bug', label: 'Bug' },
  { value: 'enhancement', label: 'Enhancement' },
  { value: 'invalid', label: 'Invalid' },
  { value: 'question', label: 'Question' },
  { value: 'duplicate', label: 'Duplicate' }
]

export default function Home() {
  const [labels, setLabels] = useState<MultiValue<Option>>([labelOptions[0]])

  const [query, setQuery] = useState<string>(
    buildIssueQuery({ labels: labels.map((label) => label.value) })
  )

  const { issues, error } = useIssues(query)

  const onLabelsChange = (
    selectedOptions: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    setLabels(selectedOptions)
  }

  const onSearchButtonClick = () => {
    setQuery(buildIssueQuery({ labels: labels.map((label) => label.value) }))
  }

  /**
   * Main page for GitHub OSS Founder
   */
  return (
    <div className="flex justify-center">
      <div className="w-8/12 pt-4 flex-col">
        <h2 className="text-xl">GitHub OSS Finder </h2>
        <p>Helps you to find OSS to contribute</p>

        <div className="pt-2 pb-2 flex gap-4">
          <div className="flex-1">
            <Select
              defaultValue={[labelOptions[0]]}
              isMulti
              onChange={onLabelsChange}
              name="labels"
              options={labelOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="flex-1">
            <h3 className="mt-2 mb-2">Tags</h3>
            <input type="text" className="input input-bordered input-sm" />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={onSearchButtonClick}
          >
            Search
          </button>
        </div>
        <div className="divider"></div>
        <h2>Search Result</h2>
        <div className="flex flex-col gap-4">
          {issues?.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
        </div>
      </div>
    </div>
  )
}
