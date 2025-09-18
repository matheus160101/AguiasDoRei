'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/login`, {
        email,
        senha,
      })

      // Salva no localStorage
      localStorage.setItem('token', res.data.token || 'dummy-token') // se backend não tiver JWT, pode usar um dummy token
      localStorage.setItem('nome', res.data.nome || email)
      localStorage.setItem('role', 'admin') // define role como admin

      router.push('/admin')
    } catch (err: any) {
      setErro(err.response?.data || 'Erro ao fazer login')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-500">
          Login de Administrador
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500"
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500"
            required
          />
          {erro && <p className="text-red-600 text-sm font-medium">{erro}</p>}
          <button
            type="submit"
            className="bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Página restrita a administradores
        </p>
      </div>
    </main>
  )
}
