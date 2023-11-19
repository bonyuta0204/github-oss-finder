/** Modules for building search query for GitHub Search API */

type IssueQueryParams = {
  labels?: string[] // Optional parameter
  isOpen?: boolean // Optional parameter
}

/**
 * Build a GitHub issue search query string from given search terms.
 *
 * @param {string[]} labels - The labels to filter issues. Optional.
 * @param {boolean} isOpen - Flag to determine if open or closed issues should be searched. Defaults to true.
 * @returns {string} - The constructed query string for GitHub issue search.
 */
export const buildIssueQuery = ({
  labels = [],
  isOpen = true
}: IssueQueryParams) => {
  const labelQuery = labels.map((label) => `label:"${label}"`).join(' ')
  const stateQuery = isOpen ? 'state:open' : 'state:closed'
  return `is:issue ${labelQuery} ${stateQuery}`
}
