
import React, { useState, useEffect } from 'react';
import { Layout, Database, Building2, LogOut } from 'lucide-react';
import { Tenant, Empresa, DbType } from './types';
import { TenantList } from './components/TenantList';
import { EmpresaList } from './components/EmpresaList';
import { Login } from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'tenants' | 'empresas'>('tenants');

  const now = () => new Date().toISOString();

  // Função para gerar ID curto alfanumérico maiúsculo de 7 caracteres (Ex: 52IJF07)
  const generateShortId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Função para obter o prefixo da ENV com base no tipo de banco
  const getDbPrefix = (type: DbType) => {
    switch(type) {
      case 'postgres': return 'PG_DB';
      case 'mysql': return 'MYSQL_DB';
      case 'mongodb': return 'MONGO_DB';
      case 'sqlite': return 'SQLITE_DB';
      case 'firebird': return 'FB_DB';
      default: return 'DB';
    }
  };

  // Dados iniciais com datas
  const [tenants, setTenants] = useState<Tenant[]>([
    { 
      id: '52IJF07', 
      dbType: 'postgres', 
      dbEnvKey: 'PG_DB_52IJF07',
      createdAt: '2023-10-15T10:00:00.000Z',
      updatedAt: '2023-10-15T10:00:00.000Z'
    },
    { 
      id: 'FJ52G62', 
      dbType: 'mongodb', 
      dbEnvKey: 'MONGO_DB_FJ52G62',
      createdAt: '2023-11-20T14:30:00.000Z',
      updatedAt: '2023-11-22T09:15:00.000Z'
    },
  ]);

  const [empresas, setEmpresas] = useState<Empresa[]>([
    { 
      id: '12345678000199', 
      nome: 'Acme Corp', 
      tenantId: '52IJF07',
      createdAt: '2023-10-16T11:20:00.000Z',
      updatedAt: '2023-10-16T11:20:00.000Z'
    },
    { 
      id: '98765432000155', 
      nome: 'Globex Inc', 
      tenantId: 'FJ52G62',
      createdAt: '2023-12-01T08:00:00.000Z',
      updatedAt: '2023-12-05T16:45:00.000Z'
    },
  ]);

  // Verificar sessão ao carregar
  useEffect(() => {
    const session = localStorage.getItem('auth_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth_session', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth_session');
  };

  // --- Actions ---

  // Tenant: ID curto gerado automaticamente e EnvKey derivada
  const addTenant = (data: { dbType: DbType }) => {
    const newId = generateShortId();
    // Garante unicidade do ID (embora colisão seja rara com 7 chars, é boa prática)
    // Se colidir, chamaríamos recursivamente, mas simplificaremos aqui.
    
    const prefix = getDbPrefix(data.dbType);
    const newEnvKey = `${prefix}_${newId}`;

    const newTenant: Tenant = { 
      id: newId,
      dbType: data.dbType,
      dbEnvKey: newEnvKey,
      createdAt: now(),
      updatedAt: now()
    };
    setTenants([...tenants, newTenant]);
  };

  const updateTenant = (updated: Tenant) => {
    // Nota: Se mudar o tipo de banco, deveríamos atualizar a env key? 
    // Geralmente IDs e Keys são imutáveis, mas aqui vamos permitir editar o objeto mantendo ID.
    const tenantWithNewDate = { ...updated, updatedAt: now() };
    setTenants(tenants.map(t => t.id === updated.id ? tenantWithNewDate : t));
  };

  const deleteTenant = (id: string) => {
    if (empresas.some(e => e.tenantId === id)) {
      alert('Não é possível excluir este tenant pois existem empresas vinculadas a ele.');
      return;
    }
    if (confirm('Tem certeza que deseja excluir este tenant?')) {
      setTenants(tenants.filter(t => t.id !== id));
    }
  };

  // Empresa: ID manual
  const addEmpresa = (data: Omit<Empresa, 'createdAt' | 'updatedAt'>) => {
    if (empresas.some(e => e.id === data.id)) {
      alert('Já existe uma empresa com este ID.');
      return;
    }
    const newEmpresa: Empresa = { 
      ...data, 
      createdAt: now(),
      updatedAt: now()
    };
    setEmpresas([...empresas, newEmpresa]);
  };

  const updateEmpresa = (updated: Empresa) => {
    const empresaWithNewDate = { ...updated, updatedAt: now() };
    setEmpresas(empresas.map(e => e.id === updated.id ? empresaWithNewDate : e));
  };

  const deleteEmpresa = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      setEmpresas(empresas.filter(e => e.id !== id));
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-fade-in">
      {/* Header */}
      <header className="bg-[#00314c] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Layout className="h-8 w-8 text-[#2596be]" />
              <span className="font-bold text-xl tracking-tight">Admin Multi-Tenant</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300 hidden sm:block">
                v1.1.0
              </div>
              <div className="h-4 w-px bg-gray-600 hidden sm:block"></div>
              <button 
                onClick={handleLogout}
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md"
                title="Sair"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('tenants')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all outline-none
                ${activeTab === 'tenants' 
                  ? 'border-[#2596be] text-[#2596be]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <Database className={`
                -ml-0.5 mr-2 h-5 w-5 transition-colors
                ${activeTab === 'tenants' ? 'text-[#2596be]' : 'text-gray-400 group-hover:text-gray-500'}
              `} />
              Tenants
              <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs transition-colors ${activeTab === 'tenants' ? 'bg-[#2596be] text-white' : 'bg-gray-100 text-gray-600'}`}>
                {tenants.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('empresas')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all outline-none
                ${activeTab === 'empresas' 
                  ? 'border-[#2596be] text-[#2596be]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <Building2 className={`
                -ml-0.5 mr-2 h-5 w-5 transition-colors
                ${activeTab === 'empresas' ? 'text-[#2596be]' : 'text-gray-400 group-hover:text-gray-500'}
              `} />
              Empresas
              <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs transition-colors ${activeTab === 'empresas' ? 'bg-[#2596be] text-white' : 'bg-gray-100 text-gray-600'}`}>
                {empresas.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="transition-opacity duration-300">
          {activeTab === 'tenants' ? (
            <TenantList 
              tenants={tenants} 
              onAdd={addTenant} 
              onUpdate={updateTenant} 
              onDelete={deleteTenant} 
            />
          ) : (
            <EmpresaList 
              empresas={empresas} 
              tenants={tenants}
              onAdd={addEmpresa}
              onUpdate={updateEmpresa}
              onDelete={deleteEmpresa}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
