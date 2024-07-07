import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.post('/api/v1/user/signup', (c)=>{ // c vairable stands for context
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  // what is signup rout suppose to do
  await prisma.user.create 
  return c.text('HELLO')
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// 

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiODQyMTZhYTgtYzUwYy00MzY1LWFlN2MtY2FjYjYxNTBiZjBkIiwidGVuYW50X2lkIjoiZWRiMThjODRmODA5NmE0ZWRmMDg2NzE2Y2JlMDM0MDVhYTNlNGExM2UzZjgxYzkyY2RiNzY3YzM4MWZkNGU3MiIsImludGVybmFsX3NlY3JldCI6IjA2MzI2ZjA4LWZjMGEtNDBiNC04MTg3LWYxMGFmZWE0MDE1MiJ9.YEMLy8xXj2aGYDf84LXjBprJiUHKfsk0BgTqRiD_Dpc"

export default app
