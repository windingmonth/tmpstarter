export interface UploadFile {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: JSON | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string | null
  provider_metadata: JSON
  createdAt: string
  updatedAt: string
}

export interface UploadFileEntity {
  id: number
  attributes: UploadFile
}

export interface UploadFileEntityResponse {
  data: UploadFileEntity
}

export interface AuthorEntity {
  id: number
  attributes: UploadFile
}

export interface AuthorEntityResponse {
  data: AuthorEntity
}

export interface Template {
  name: string
  type: string
  category: string
  description: string
  repository: string
  demoUrl: string
  content: string
  author: AuthorEntityResponse
  image: UploadFileEntityResponse
}
export interface TemplateEntity {
  id: number
  attributes: Template
}

export interface TemplateEntityComponent extends TemplateEntity {
  api: string
}
export interface TemplateEntityResponse {
  data: TemplateEntity
}

export interface TemplateEntityResponseCollection {
  data: TemplateEntity[]
}
export interface Logo {
  name: string
  color?: string
}
