import axios from "axios"
import { Icon } from "@iconify/react"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import ErrorPage from "next/error"
import type {
  TemplateEntityResponseCollection,
  TemplateEntityResponse,
  Template,
} from "@/types/template"

function PageLeft({
  name,
  description,
  type,
  author,
  category,
  repository,
}: Template) {
  return (
    <>
      <h1 className='my-8 text-5xl font-bold'>{name}</h1>
      <div className='mb-4 text-gray-500'>{description}</div>
      <div className='mt-6'>
        <div className='flex justify-between py-2 border-t text-gray-500 text-sm'>
          <span className='font-semibold text-sm'>Type</span>
          <span>{type}</span>
        </div>
        <div className='flex justify-between py-2 border-t text-gray-500 text-sm'>
          <span className='font-semibold text-sm'>Category</span>
          <span>{category}</span>
        </div>
        <div className='flex justify-between py-2 border-t text-gray-500 text-sm'>
          <span className='font-semibold text-sm'>Author</span>
          <span>{author.data.attributes.name}</span>
        </div>
      </div>
      <div className='mt-6 grid grid-cols-2 gap-6 text-sm'>
        <a
          href='#'
          className='p-2 rounded text-center text-white border border-black bg-black hover:bg-white hover:text-gray-800'
        >
          Deploy
        </a>
        <a
          href={repository}
          className='p-2 rounded text-center text-gray-500 border hover:text-gray-800 hover:border-black'
        >
          View Repo
        </a>
      </div>
    </>
  )
}

export default function Page({
  template,
  api,
}: {
  template: Template
  api: string
}) {
  const router = useRouter()

  if (!router.isFallback && !template) {
    return <ErrorPage statusCode={404} />
  }

  const { name, description, content, image, demoUrl } = template
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='container mx-auto'>
          <div className='min-h-screen lg:grid lg:grid-cols-8 lg:divide-x'>
            <div className='p-6 lg:pr-12 lg:col-span-3 hidden lg:block'>
              <div className='lg:sticky lg:top-6'>
                <Link href='/'>
                  <small className='text-gray-500'>← Back to Templates</small>
                </Link>
                <PageLeft {...template} />
              </div>
            </div>
            <div className='p-6 lg:pl-12 lg:col-span-5'>
              <Link href='/' className='lg:hidden'>
                <small className='text-gray-500'>← Back to Templates</small>
              </Link>
              <div className='h-[400px] relative mt-4 lg:mt-0 shadow-2xl shadow-purple-300/20'>
                <Image
                  src={api + image.data.attributes.url}
                  className='object-cover'
                  fill
                  alt=''
                />
                <Link
                  href={demoUrl}
                  className='h-10 p-3 flex items-center absolute left-3 bottom-3 text-sm bg-white rounded shadow-2xl shadow-purple-300/50  transition-colors hover:bg-gray-100'
                >
                  <Icon icon='ri:share-box-fill' className='text-lg' />
                  <span className='ml-2'>View Demo</span>
                </Link>
              </div>
              <div className='lg:hidden'>
                <PageLeft {...template} />
              </div>
              <div className='mt-9'>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  try {
    const res = await axios<TemplateEntityResponseCollection>({
      url: `${process.env.STRAPI_API}/api/templates`,
    })

    const paths = res.data.data.map((template) => ({
      params: { id: template.id + "" },
    }))
    return {
      paths,
      fallback: false,
    }
  } catch (error) {
    return { paths: [], fallback: false }
  }
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  const res = await axios<TemplateEntityResponse>({
    url: `${process.env.STRAPI_API}/api/templates/${params.id}?populate=*`,
  })

  return {
    props: {
      template: res.data.data.attributes,
      api: process.env.STRAPI_API,
    },
  }
}
