'use client'

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

export default function HomePage() {
  const [atividades, setAtividades] = useState<Atividade[]>([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/atividades`) // Template literal corrigido
      .then(res => setAtividades(res.data))
      .catch(err => {
        console.error('Erro ao buscar atividades:', err)
        setAtividades([])
      })
  }, [])

  return (
    <>
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="text-2xl font-bold text-yellow-500">
            Clube Desbravadores Aguiás do Rei
          </Link>
          <ul className="flex gap-8 text-gray-700 font-semibold">
            <li><Link href="/">Home</Link></li>
            <li><Link href="#atividades">Atividades</Link></li>
            <li><Link href="#adote">Adote</Link></li>
            <li>
              <Link href="/login" className="text-yellow-500 hover:underline">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="h-16" />

      {/* Banner */}
      <section className="bg-yellow-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold max-w-4xl mx-auto mb-4">
          Seja bem-vindo ao Clube de Desbravadores Aguiás do Rei
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          Um espaço para adolescentes crescerem na fé, amizade e aventura.
        </p>
      </section>

      {/* Atividades */}
      <section id="atividades" className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Atividades Recentes</h2>

        {atividades.length === 0 ? (
          <p className="text-center text-gray-600 italic">Nenhuma atividade publicada.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {atividades.map((atividade) => (
              <Link
                href={`/atividades/${atividade._id}`} // Aspas e template literal corrigidos
                key={atividade._id}
                className="block border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                {atividade.imagens?.[0] && (
                  <img
                    src={atividade.imagens[0]}
                    alt={atividade.titulo}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-yellow-500">{atividade.titulo}</h3>
                  <p className="text-gray-700 text-sm mb-4">{atividade.data}</p>
                  <p className="text-gray-800 leading-relaxed">{atividade.descricao}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Adote um Desbravador */}
      <section
        id="adote"
        className="bg-yellow-50 py-16 px-6 text-center max-w-4xl mx-auto rounded-lg border border-yellow-400"
      >
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">Adote um Desbravador</h2>
        <p className="text-yellow-800 mb-8">
          Ajude nossos desbravadores a crescerem com sua doação. Juntos podemos transformar vidas!
        </p>
        <a
          href="https://wa.me/5541998285501"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-yellow-500 text-white font-semibold px-8 py-3 rounded hover:bg-yellow-500 transition"
        >
          Entrar em Contato
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-gray-600 text-sm mt-20">
        © {new Date().getFullYear()} Clube de Desbravadores. Todos os direitos reservados.
      </footer>
    </>
  )
}
