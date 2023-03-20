import axios from "axios"
import Head from "next/head"
import { Icon } from "@iconify/react"
import Card from "@/components/card"
import { TemplateEntity, TemplateEntityResponseCollection } from "@/types/template"
import { useState } from "react"

export default function Home({
  templates,
  error,
  api,
}: {
  templates: TemplateEntityResponseCollection
  error: string
  api: string
}) {
  const [query, setQuery] = useState('')
  // 无数据
  if (error) return <div>{error}</div>
  // 筛选category
  const obj: {[key: string]: boolean|number} = {};
  const categoryArr = templates.data.reduce((pre: string[], item: TemplateEntity): string[] => {
    obj[item.attributes.category] ? "" : obj[item.attributes.category] = true && pre.push(item.attributes.category);
    return pre;
  },[])
  // 搜索
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const searchFilter = (array: TemplateEntity[]) => {
    return array.filter((item: TemplateEntity) => item.attributes.name.toLowerCase().includes(query.toLowerCase()))
  }
  const filterTemplates = searchFilter(templates?.data)
  return (
    <>
      <Head>
        <title>Template Library</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <nav className="sticky top-0 bg-white z-10">
          <div className="container px-6 md:px-0 mx-auto">
            <div className="pt-6 md:pt-8 flex items-center">
              <h1 className="text-4xl md:text-5xl font-semibold">Starter Library</h1>
              <label className="hidden sm:inline-flex items-center relative ml-10 h-8">
                <Icon icon="tabler:search" className="absolute left-2" />
                <input
                  onChange={handleChange}
                  type="text" 
                  placeholder="Search starter by name" 
                  aria-label="Search starter by name" 
                  className="px-8 h-8 rounded bg-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
                />
              </label>
            </div>
            <div className="pt-4 pb-6">
              <h3>Tag</h3>
              <ul className="flex flex-wrap text-slate-500 space-x-2">
                {categoryArr.map((category) => (
                  <li key={category}><a href={`#${category}`}>{category}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <div className="container px-6 md:px-0 pb-8 mx-auto prose">
        {categoryArr.map(category => (
          <div key={category}>
            <h3 className="pt-12 pb-4 text-xl font-semibold" id={category}>{category}</h3>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterTemplates.map(template => (
                template.attributes.category === category ? <Card key={template.id} api={api} {...template} /> : ''
              ))}
            </section>
          </div>
        ))}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await axios<{ data: TemplateEntity[] }>(
      `${process.env.STRAPI_API}/api/templates?populate[author][populate][0]=avatar&populate=image`
    )
    const templates = res.data
    return { props: { templates, api: process.env.STRAPI_API, } }
  } catch (error) {
    return { props: { error: (error as Error).message } }
  }
}