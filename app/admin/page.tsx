'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { X } from 'lucide-react'
import axios from 'axios'

type Atividade = {
  _id?: string
  titulo: string
  descricao: string
  imagens: string[]
  data: string
}

export default function AdminPage() {
  const [atividades, setAtividades] = useState<Atividade[]>([])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [imagens, setImagens] = useState<File[]>([])
  const router = useRouter()

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin') === 'true'
    if (!isAdmin) {
      router.push('/login')
    } else {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/atividades`)
        .then(res => setAtividades(res.data))
        .catch(err => console.error(err))
    }
  }, [router])

  function removerImagem(index: number) {
    setImagens(prev => prev.filter((_, i) => i !== index))
  }

  async function handlePostar(e: React.FormEvent) {
    e.preventDefault()

    try {
      // 1. Envia imagens para /upload e obtém URLs
      const imagensUrls: string[] = []

      for (const img of imagens) {
        const formData = new FormData()
        formData.append('imagem', img)

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        imagensUrls.push(res.data.url)
      }

      // 2. Envia atividade com URLs
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/atividades`, {
        titulo,
        descricao,
        imagens: imagensUrls
      })

      alert('Atividade publicada com sucesso!')
      setTitulo('')
      setDescricao('')
      setImagens([])

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/atividades`)
      setAtividades(res.data)
    } catch (err) {
      console.error(err)
      alert('Erro ao publicar atividade.')
    }
  }

  async function deletar(id: string | undefined) {
    if (!id) return
    if (confirm('Deseja realmente apagar esta atividade?')) {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/atividades/${id}`)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/atividades`)
      setAtividades(res.data)
    }
  }

  function sair() {
    localStorage.removeItem('admin')
    router.push('/')
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Painel Administrativo</h1>
      <button
        onClick={sair}
        className="mb-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Sair
      </button>

      <form onSubmit={handlePostar} className="mb-6 p-4 border rounded-lg bg-gray-50 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-2 rounded"
          rows={3}
          required
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImagens(Array.from(e.target.files || []))}
          className="border p-2 rounded"
        />
        {imagens.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {imagens.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Imagem ${idx + 1}`}
                  className="rounded-md w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removerImagem(idx)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-80"
                  title="Remover imagem"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2"
        >
          Publicar
        </button>
      </form>

      <section className="grid md:grid-cols-2 gap-6">
        {atividades.length === 0 ? (
          <p className="col-span-2 text-center text-gray-500">Nenhuma atividade publicada.</p>
        ) : (
          atividades.map((atividade, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{atividade.titulo}</h2>
                <p className="text-sm text-gray-500 mb-2">{atividade.data}</p>
                {atividade.imagens.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {atividade.imagens.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Imagem ${i + 1}`}
                        className="rounded-md w-full h-32 object-cover"
                      />
                    ))}
                  </div>
                )}
                <p className="text-gray-700">{atividade.descricao}</p>
                <button
                  onClick={() => deletar(atividade._id)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Deletar
                </button>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </main>
  )
}
