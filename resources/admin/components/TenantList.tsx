import React, { useState } from 'react';
import { Tenant, DB_TYPES, DbType } from '../types';
import { Button } from './ui/Button';
import { Trash2, Edit2, Plus, Save, Database, Clock, Info } from 'lucide-react';

interface TenantListProps {
  tenants: Tenant[];
  // onAdd agora recebe apenas o tipo, pois ID e Key são automáticos
  onAdd: (data: { dbType: DbType }) => void;
  onUpdate: (tenant: Tenant) => void;
  onDelete: (id: string) => void;
}

export const TenantList: React.FC<TenantListProps> = ({ tenants, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state apenas para dbType quando adicionando
  const [dbType, setDbType] = useState<DbType>('postgres');
  
  // Para edição, precisamos manter os dados existentes
  const [editData, setEditData] = useState<Tenant | null>(null);

  const resetForm = () => {
    setDbType('postgres');
    setEditData(null);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAdd = () => {
    onAdd({ dbType });
    resetForm();
  };

  const handleUpdate = () => {
    if (!editData) return;
    onUpdate(editData);
    resetForm();
  };

  const startEdit = (tenant: Tenant) => {
    setEditData({ ...tenant });
    setEditingId(tenant.id);
    setIsAdding(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    });
  };

  const getPrefixExample = (type: DbType) => {
    switch(type) {
        case 'postgres': return 'PG_DB_XXXXXXX';
        case 'mysql': return 'MYSQL_DB_XXXXXXX';
        case 'mongodb': return 'MONGO_DB_XXXXXXX';
        case 'sqlite': return 'SQLITE_DB_XXXXXXX';
        case 'firebird': return 'FB_DB_XXXXXXX';
        default: return 'DB_XXXXXXX';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#00314c]">Configuração de Tenants</h2>
          <p className="text-sm text-gray-500">Gerencie as conexões de banco de dados.</p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)} icon={<Plus size={16} />}>
            Novo Tenant
          </Button>
        )}
      </div>

      {/* Form Area */}
      {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <h3 className="text-lg font-medium mb-4 text-[#00314c]">
            {isAdding ? 'Adicionar Nova Tenant' : 'Editar Tenant'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo de Banco */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Banco</label>
              <select
                className="w-full rounded-md border-gray-300 border shadow-sm p-2 focus:border-[#2596be] focus:ring-[#2596be]"
                value={isAdding ? dbType : editData?.dbType}
                onChange={(e) => {
                    const val = e.target.value as DbType;
                    if (isAdding) setDbType(val);
                    else if (editData) setEditData({ ...editData, dbType: val });
                }}
              >
                {DB_TYPES.map((t: string) => (
                  <option key={t} value={t}>{t.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Visualização da Chave (Read Only ou Info) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isAdding ? 'Formato da Chave (Automático)' : 'Chave de Ambiente (Env Key)'}
              </label>
              
              {isAdding ? (
                <div className="w-full rounded-md bg-gray-50 border border-gray-200 p-2 text-gray-500 flex items-center text-sm font-mono">
                    <Info size={16} className="mr-2 text-[#2596be]" />
                    {getPrefixExample(dbType)}
                </div>
              ) : (
                 <input
                    type="text"
                    className="w-full rounded-md border-gray-300 border shadow-sm p-2 focus:border-[#2596be] focus:ring-[#2596be] bg-gray-100 text-gray-500 cursor-not-allowed"
                    value={editData?.dbEnvKey || ''}
                    disabled
                    title="A chave de ambiente é gerada automaticamente e não pode ser alterada."
                  />
              )}
               {isAdding && (
                  <p className="text-xs text-gray-400 mt-1">
                    O ID (7 chars) e a Env Key serão gerados automaticamente ao salvar.
                  </p>
               )}
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="ghost" onClick={resetForm}>Cancelar</Button>
            <Button 
              onClick={() => isAdding ? handleAdd() : handleUpdate()}
              icon={<Save size={16} />}
            >
              Salvar
            </Button>
          </div>
        </div>
      )}

      {/* List Area */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo DB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Env Key</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atualizado em</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tenants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhum tenant configurado.
                  </td>
                </tr>
              ) : (
                tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                      {tenant.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <Database size={14} className="mr-2 text-[#2596be]" />
                      {tenant.dbType.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono bg-gray-50 rounded">
                      {tenant.dbEnvKey}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-400" />
                        {formatDate(tenant.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-400" />
                        {formatDate(tenant.updatedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => startEdit(tenant)}
                        className="text-[#2596be] hover:text-[#1e7ca0] mr-4 transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => onDelete(tenant.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};