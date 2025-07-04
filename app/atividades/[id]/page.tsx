'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

type Atividade = {
  _id?: string
  titulo: string
  descricao: string
  imagens: string[]
  data: string
}

export default function AtividadeDetalhe() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const router = useRouter()
  const [atividade, setAtividade] = useState<Atividade | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchAtividade() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/atividades/${id}`)
        setAtividade(res.data)
      } catch (error) {
        console.error('Erro ao buscar atividade:', error)
        router.push('/atividades')
      }
    }

    fetchAtividade()
  }, [id, router])

  if (!atividade) {
    return <p className="p-8 text-center text-gray-500">Carregando atividade...</p>
  }

  return (
    <main className="w-[90%] mx-auto p-8">
      <Link href="/" className="text-yellow-500 font-semibold mb-6 inline-block hover:underline">
        ← Voltar para Atividades
      </Link>

      <h1 className="text-4xl font-bold text-yellow-500 mb-4">{atividade.titulo}</h1>
      <p className="text-gray-700 mb-6">{atividade.data}</p>
      <p className="text-gray-800 mb-8 whitespace-pre-line">{atividade.descricao}</p>

      {atividade.imagens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {atividade.imagens.map((img, i) => (
            <div key={i} className="w-full h-64 overflow-hidden rounded-lg shadow-md">
              <img
                src={img}
                alt={`${atividade.titulo} imagem ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic">Nenhuma imagem disponível.</p>
      )}
    </main>
  )
}
