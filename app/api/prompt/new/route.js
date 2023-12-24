import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json()
  console.log(
    '🚀 ~ file: route.js:6 ~ POST ~ userId, prompt, tag:',
    userId,
    prompt,
    tag
  )

  try {
    await connectToDB()
    const newPrompt = await new Prompt({ creator: userId, prompt, tag })
    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt), {
      status: 201
    })
  } catch (error) {
    console.log('🚀 ~ file: route.js:15 ~ POST ~ error:', error)
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}