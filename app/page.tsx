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
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/atividades`)
      .then(res => setAtividades(res.data))
      .catch(err => {
        console.error('Erro ao buscar atividades:', err)
        setAtividades([])
      })
  }, [])

  return (
    <main className="overflow-x-hidden">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center py-3 px-4 sm:px-6 gap-2">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-yellow-500 text-center">
            Clube Desbravadores Águias do Reis
          </Link>
          <ul className="flex flex-wrap justify-center gap-4 text-sm sm:text-base text-gray-700 font-semibold">
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

      {/* Espaço abaixo do header */}
      <div className="h-20" />

      {/* Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-40 px-4 text-center text-white"
        style={{
          backgroundImage: "url('/img/clube.jpg')"
        }}
      >
        {/* Camada de escurecimento para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Conteúdo visível */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Bem-vindo ao Clube de Desbravadores Águias do Rei
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Um espaço para adolescentes crescerem na fé, amizade e aventura.
          </p>
        </div>
      </section>

      {/* Atividades */}
      <section id="atividades" className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Atividades Recentes
        </h2>

        {atividades.length === 0 ? (
          <p className="text-center text-gray-600 italic">Nenhuma atividade publicada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {atividades.map((atividade) => (
              <Link
                href={`/atividades/${atividade._id}`}
                key={atividade._id}
                className="block border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
              >
                {atividade.imagens?.[0] && (
                  <img
                    src={atividade.imagens[0]}
                    alt={atividade.titulo}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="font-semibold text-lg text-yellow-500 mb-1 break-words">
                    {atividade.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{atividade.data}</p>
                  <p className="text-gray-800 text-sm break-words">
                    {atividade.descricao}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Adote um Desbravador */}
      <section
        id="adote"
        className="bg-yellow-50 py-12 px-4 sm:px-6 text-center max-w-3xl mx-auto rounded-lg border border-yellow-400 mt-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4">
          Adote um Desbravador
        </h2>
        <p className="text-yellow-800 mb-6 text-sm sm:text-base leading-relaxed">
          Ajude nossos desbravadores a crescerem com sua doação. Juntos podemos transformar vidas!
        </p>
        <a
          href="https://wa.me/5541998285501"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-yellow-500 text-white font-semibold px-6 py-3 rounded hover:bg-yellow-600 transition"
        >
          Entrar em Contato
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-gray-600 text-sm mt-20">
        © {new Date().getFullYear()} Clube de Desbravadores. Todos os direitos reservados.
      </footer>
    </main>
  )
}
