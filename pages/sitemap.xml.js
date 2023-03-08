// To communicate which URLs belong to your site and facilitate crawling

const SITE_URL = `https://letulip-nextjs-blog.vercel.app/`
const EXTERNAL_DATA_URL = `${SITE_URL}/posts`

function generateSiteMap(posts) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
        <loc>${SITE_URL}</loc>
      </url>
      <url>
        <loc>${SITE_URL}/about</loc>
      </url>
      ${posts
        .map(({ id }) => {
          return `
        <url>
          <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
        </url>
      `;
        })
        .join('')}
    </urlset>
  `
}

export default function SiteMap() {
  
}

export async function getServerSideProps({ res }) {
  const request = await fetch(EXTERNAL_DATA_URL)
  const posts = await request.json()

  const sitemap = generateSiteMap(posts)
  
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}