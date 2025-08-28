"use client"

import { useActionState, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/custom/input"
import { Button } from "@/components/custom/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loginAction, type LoginState } from "@/app/actions/auth/login"
import { enterGatewayAction } from "@/app/actions/auth/enterGateway"
import { MdPerson, MdLock } from 'react-icons/md'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, {
    success: false,
    message: ''
  })
  const [selectedTurma, setSelectedTurma] = useState<string>("")
  const [redirectUrl, setRedirectUrl] = useState<string>("")

  const handleEnterGateway = async () => {
    if (!state.selection?.selectionId || !selectedTurma) return
    const r = await enterGatewayAction({ selectionId: state.selection.selectionId, turmaId: selectedTurma })
    if (r.success) window.location.href = '/admin'
  }

  const handleGoToApp = async () => {
    if (!state.selection?.selectionId || !selectedTurma) return
    try {
      const res = await fetch('/api/auth/select', { 
        method: 'POST', 
        headers: { 'content-type': 'application/json' }, 
        body: JSON.stringify({ selectionId: state.selection.selectionId, turmaId: selectedTurma }) 
      })
      if (res.ok) {
        const { redirectUrl } = await res.json()
        if (redirectUrl) window.location.href = redirectUrl
      }
    } catch {}
  }

  const hasSelection = Boolean(state.selection?.requireSelection)
  const hasRedirect = Boolean(state.success && state.message)

  const handleEnterGatewayFromRedirect = async () => {
    if (!hasRedirect) return
    try {
      const u = new URL(state.message as string)
      const code = u.searchParams.get('code')
      if (!code) return
      const ex = await fetch('/api/admin/exchange', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code }) })
      if (ex.ok) window.location.href = '/admin'
    } catch {}
  }

     return (
           <div className="min-h-screen flex flex-col bg-blue-50 p-4 pt-12">
       <div className="flex-1 flex items-center justify-center">
              <Card className="w-full max-w-6xl bg-white shadow-xl border-0 rounded-2xl relative">
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 "> 
                     <img 
                       src="/incaas-coolors.svg" 
                       alt="Incaas Design" 
                       className="w-full h-full animate-spin-reverse opacity-70"
                     />
                   </div>
         
                   <div className="flex flex-col lg:flex-row pt-5 lg:pt-0">
              <div className="flex-1 pt-8 lg:pt-12 px-8 lg:px-12 pb-4 lg:pb-12 flex flex-col justify-center">
            <div className="text-center space-y-6">
              <div className="flex justify-center items-center space-x-3 lg:space-x-4 mb-6 lg:mb-8">
                <img src="/login-icon-1.svg" alt="Icon 1" className="w-10 h-10 lg:w-12 lg:h-12" />
                <img src="/login-icon-2.svg" alt="Icon 2" className="w-10 h-10 lg:w-12 lg:h-12" />
                <img src="/login-icon-3.svg" alt="Icon 3" className="w-10 h-10 lg:w-12 lg:h-12" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">Hub Incaas de Inovação</h1>
                  <p className="text-sm lg:text-lg text-gray-700 leading-relaxed max-w-md mx-auto">
                 O Hub de Inovação Incaas é um ecossistema inteligente dedicado a impulsionar a transformação digital de empresas, instituições públicas e privadas, por meio da integração entre tecnologia, conhecimento e estratégia de inovação.
               </p>
            </div>
          </div>
          
            <div className="flex-1 pt-0 lg:pt-12 px-8 lg:px-12 pb-8 lg:pb-12 lg:border-l lg:border-gray-100 border-t border-gray-100 lg:border-t-0">
            <div className="space-y-6">
              {!hasSelection && !hasRedirect && (
                <form action={formAction} className="space-y-5">
                  {state.message && !state.success && (
                    <Alert variant="destructive">
                      <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                  )}
                  <Input 
                    id="identifier" 
                    name="identifier" 
                    type="email" 
                    label="Email" 
                    placeholder="email@email.com"
                    disabled={isPending} 
                    required 
                    icon={<MdPerson className="h-5 w-5 text-gray-400" />}
                  />
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    label="Senha:" 
                    placeholder="••••••••••••"
                    disabled={isPending} 
                    required 
                    icon={<MdLock className="h-5 w-5 text-gray-400" />}
                  />
                  <div className="flex items-center justify-between pt-2">
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Esqueci a senha
                    </a>
                  </div>
                  <Button type="submit" className="w-full h-12 lg:h-14 text-base lg:text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-8" disabled={isPending}>
                    {isPending ? "Entrando..." : "Acessar"}
                  </Button>
                </form>
              )}

              {!hasSelection && hasRedirect && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Escolha como prosseguir</p>
                  <div className="flex gap-3">
                    <Button className="flex-1 h-12" onClick={() => { if (state.message) window.location.href = state.message }}>
                      Ir para app destino
                    </Button>
                    <Button className="flex-1 h-12" variant="secondary" onClick={handleEnterGatewayFromRedirect}>
                      Entrar no gateway
                    </Button>
                  </div>
                </div>
              )}

              {hasSelection && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Selecione uma turma para continuar</p>
                  <div className="space-y-3 max-h-56 overflow-auto border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    {state.selection?.options?.map((opt) => (
                      <label key={String((opt as any).id)} className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <input 
                          type="radio" 
                          name="turma" 
                          value={String((opt as any).id)} 
                          onChange={(e) => setSelectedTurma(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">{(opt as any).name || (opt as any).slug || String((opt as any).id)}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleEnterGateway} disabled={!selectedTurma} className="flex-1 h-12">
                      Entrar no gateway
                    </Button>
                    <Button variant="secondary" disabled={!selectedTurma} className="flex-1 h-12" onClick={handleGoToApp}>
                      Ir para app destino
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
              </div>
                </Card>
              </div>
        
         <div className="mt-8 text-center">
           <p className="text-sm text-gray-500 font-medium select-none">
             © 2025 Incaas Ltda. Todos os direitos reservados.
           </p>
         </div>
      </div>
    )
  }


