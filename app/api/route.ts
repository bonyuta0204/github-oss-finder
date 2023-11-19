import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

const token = process.env.GITHUB_TOKEN

export async function GET(request: Request) {
  const res = await fetch('https://api.github.com/graphql', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  return res
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()

  return Response.json(data)
}
