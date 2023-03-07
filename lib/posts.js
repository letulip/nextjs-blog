import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

// fetch data from file systemx
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((filename) => {
    const id = filename.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data,
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.data < b.data) {
      return 1
    } else {
      return -1
    }
  })
}


// fetch data from external source
// export async function getSortedPostsData() {
//   const res = await fetch('https://swapi.dev/api/people/')
//   console.log(res.json())
//   return res.json()
// }