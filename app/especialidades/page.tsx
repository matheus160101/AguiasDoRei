'use client'

import Link from 'next/link'

type Especialidade = {
  nome: string
  slug: string
  descricao?: string
  imagem: string
}

export default function EspecialidadesPage() {
  const especialidades: Especialidade[] = [
    { nome: 'ADRA', slug: 'adra', descricao: 'Aprender sobre ações humanitárias e voluntariado com a ADRA.', imagem: '/images/especialidades/adra.jpg' },
    { nome: 'Artes e Habilidades Manuais', slug: 'artes-e-habilidades-manuais', descricao: 'Desenvolver criatividade, trabalhos manuais e artesanato.', imagem: '/images/especialidades/habilidadesmanuais.jpg' },
    { nome: 'Atividades Agrícolas', slug: 'atividades-agricolas', descricao: 'Aprender técnicas de cultivo, cuidado com plantas e agricultura.', imagem: '/images/especialidades/agriculas.jpg' },
    { nome: 'Atividades Missionárias e Comunitárias', slug: 'atividades-missionarias-comunitarias', descricao: 'Participar de projetos missionários e de ajuda à comunidade.', imagem: '/images/especialidades/missionario.jpg' },
    { nome: 'Atividades Profissionais', slug: 'atividades-profissionais', descricao: 'Explorar habilidades para o mundo do trabalho e ofícios.', imagem: '/images/especialidades/profissionais.jpg' },
    { nome: 'Atividades Recreativas', slug: 'atividades-recreativas', descricao: 'Praticar esportes, jogos e atividades lúdicas.', imagem: '/images/especialidades/creatividade.jpg' },
    { nome: 'Ciência e Saúde', slug: 'ciencia-e-saude', descricao: 'Aprender conceitos de saúde, higiene, ciência e prevenção.', imagem: '/images/especialidades/saude.jpg' },
    { nome: 'Estudos da Natureza', slug: 'estudos-da-natureza', descricao: 'Conhecer plantas, animais e preservação ambiental.', imagem: '/images/especialidades/natureza.jpg' },
    { nome: 'Habilidades Domésticas', slug: 'habilidades-domesticas', descricao: 'Desenvolver competências para cuidados com casa e organização.', imagem: '/images/especialidades/domestico.jpg' },
    { nome: 'Mestrados de Especialidades', slug: 'mestrados-de-especialidades', descricao: 'Aprofundar conhecimentos avançados em várias especialidades.', imagem: '/images/especialidades/mestrados.jpg' },
  ]

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 text-center mb-8">
        Especialidades do Clube de Desbravadores
      </h1>

      <section className="mb-12 text-center">
        <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          As especialidades são áreas de conhecimento e habilidades que os desbravadores podem desenvolver.
          Cada especialidade incentiva aprendizado, disciplina, cooperação e crescimento pessoal.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {especialidades.map((esp) => (
          <div
            key={esp.slug}
            className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white"
          >
            <Link href={`/especialidades/${esp.slug}`} className="block">
              <div className="flex items-center justify-center w-full h-40">
                <img
                  src={esp.imagem}
                  alt={esp.nome}
                  className="w-70 h-40"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-yellow-500 mb-2">{esp.nome}</h2>
                {esp.descricao && <p className="text-gray-700 text-sm">{esp.descricao}</p>}
              </div>
            </Link>
          </div>
        ))}
      </section>
    </main>
  )
}
