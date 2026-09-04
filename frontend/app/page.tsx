import {Suspense} from 'react'
import {PortableText} from '@portabletext/react'

import {AllPosts} from '@/app/components/Posts'
import HomePage from '@/html/HomePage'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {dataAttr} from '@/sanity/lib/utils'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const description = settings?.description ? (
    <div
      data-sanity={dataAttr({
        id: settings._id,
        type: 'settings',
        path: 'description',
      }).toString()}
    >
      <PortableText value={settings.description} />
    </div>
  ) : undefined

  return (
    <HomePage
      description={description}
      posts={
        <Suspense>
          <AllPosts />
        </Suspense>
      }
    />
  )
}
