
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Lock, User, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logoError, setLogoError] = useState(false);

  // Safely access environment variables
  // We use a fallback object {} in case (import.meta as any).env is undefined
  const metaEnv = (import.meta as any).env || {};
  const envUser = metaEnv.VITE_APP_USER;
  const envPass = metaEnv.VITE_APP_PASSWORD;
  
  // Verifica se estamos rodando sem configuração (Modo Dev)
  const isDevMode = !envUser || !envPass;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Fallback para teste caso não esteja configurado no .env
    const validUser = envUser || 'admin';
    const validPass = envPass || 'admin';

    if (username === validUser && password === validPass) {
      onLogin();
    } else {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-100 animate-fade-in">
        <div className="bg-[#2596be] p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
          
          {/* Área da Logo */}
          <div className="w-full flex justify-center mb-2">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="Logo da Empresa" 
                className="max-h-24 max-w-[80%] object-contain transition-opacity duration-300"
                onError={() => setLogoError(true)}
              />
            ) : (
              // Fallback visual caso a logo.png não exista na pasta public
              <div className="flex flex-col items-center justify-center text-white/50 border-2 border-dashed border-white/20 rounded-lg p-6 w-48 h-24 bg-white/5">
                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-xs font-mono">/public/logo.png</span>
              </div>
            )}
          </div>

        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center border border-red-100 flex items-center justify-center">
              <span className="font-medium">{error}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Usuário</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#2596be] transition-colors" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all placeholder-gray-300"
                placeholder="Digite seu usuário"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Senha</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#2596be] transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all placeholder-gray-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" className="w-full justify-center py-3 text-base font-semibold shadow-md hover:shadow-lg transform transition-all active:scale-95">
            Entrar
          </Button>

          {/* Helper para quando não houver .env configurado */}
          {isDevMode && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <p className="font-semibold mb-1">Ambiente de Desenvolvimento</p>
                  <p>Variáveis de ambiente não detectadas.</p>
                  <div className="mt-1 font-mono bg-blue-100/50 p-1 rounded">
                    User: <strong>admin</strong><br/>
                    Pass: <strong>admin</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
