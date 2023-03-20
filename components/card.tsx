import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Logo, TemplateEntityComponent } from "@/types/template"


export const getTemplateLogo = (type: string) => {
  const logo: Logo = {
    name: '',
    color: ''
  }
  switch (type) {
    case 'hugo':
      logo.name = 'file-icons:hugo'
      logo.color = '#ff4088'
      break;
    case 'nuxtjs':
      logo.name = 'skill-icons:nuxtjs-dark'
      break;
    case 'nextjs':
      logo.name = 'logos:nextjs-icon'
      break;
    default:
      break;
  }
  return logo
}

const Card: React.FC<TemplateEntityComponent> = (props) => {
  const {api, id, attributes} = props
  return (
    <Link href={`/${id}`}  className="bg-white transition ease-in-out hover:-translate-y-px rounded-md shadow-lg hover:shadow-2xl overflow-hidden">
      <div className="relative h-48 w-full">
        <Image 
          className="object-cover" 
          src={api + attributes.image?.data?.attributes.url}
          fill 
          alt=""
        />
      </div>
      <div className="p-4">
        <div className="tracking-wide text-base text-indigo-500 font-semibold mb-1 truncate">{attributes?.name}</div>
        <div className="flex justify-between">
          <span className="inline-flex items-center text-slate-500 text-sm">
            <span className='relative w-5 h-5 mr-1.5 avatar'>
              <Image 
                className="rounded-full" 
                src={api + attributes.author?.data?.attributes.avatar?.data.attributes?.url}
                fill 
                alt="" 
              />
            </span>
            {attributes.author?.data?.attributes.name}
          </span>
          <span className="inline-flex items-center space-x-1 text-slate-400">
            <Icon icon={getTemplateLogo(attributes?.type).name} color={getTemplateLogo(attributes?.type).color} className="h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Card;
