
import React, { useState } from 'react';
import { Empresa, Tenant } from '../types';
import { Button } from './ui/Button';
import { Trash2, Edit2, Plus, Save, Building2, Link as LinkIcon, Clock } from 'lucide-react';

interface EmpresaListProps {
  empresas: Empresa[];
  tenants: Tenant[];
  onAdd: (empresa: Omit<Empresa, 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (empresa: Empresa) => void;
  onDelete: (id: string) => void;
}

export const EmpresaList: React.FC<EmpresaListProps> = ({ empresas, tenants, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ID é obrigatório no schema, Nome é opcional
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    tenantId: ''
  });

  const resetForm = () => {
    setFormData({ id: '', nome: '', tenantId: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!formData.id || !formData.tenantId) return alert('ID e Tenant são obrigatórios');
    onAdd({
      id: formData.id,
      nome: formData.nome || null,
      tenantId: formData.tenantId
    });
    resetForm();
  };

  const handleUpdate = (id: string) => {
    if (!formData.tenantId) return alert('Tenant é obrigatório');
    const original = empresas.find(e => e.id === id);
    if(!original) return;

    onUpdate({ 
      ...original,
      nome: formData.nome || null,
      tenantId: formData.tenantId
    });
    resetForm();
  };

  const startEdit = (empresa: Empresa) => {
    setFormData({ 
      id: empresa.id, 
      nome: empresa.nome || '', 
      tenantId: empresa.tenantId 
    });
    setEditingId(empresa.id);
    setIsAdding(false);
  };

  const getTenantInfo = (id: string) => {
    const t = tenants.find(t => t.id === id);
    return t ? t : null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#00314c]">Gerenciamento de Empresas</h2>
          <p className="text-sm text-gray-500">Associe empresas aos seus respectivos tenants.</p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={() => setIsAdding(true)} icon={<Plus size={16} />}>
            Nova Empresa
          </Button>
        )}
      </div>

       {/* Form Area */}
       {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
          <h3 className="text-lg font-medium mb-4 text-[#00314c]">
            {isAdding ? 'Adicionar Nova Empresa' : 'Editar Empresa'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID da Empresa *</label>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 border shadow-sm p-2 focus:border-[#2596be] focus:ring-[#2596be] disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="Ex: CNPJ ou UUID"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                disabled={!!editingId}
              />
              <p className="text-xs text-gray-400 mt-1">{isAdding ? 'Identificador único obrigatório' : 'ID não pode ser alterado'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 border shadow-sm p-2 focus:border-[#2596be] focus:ring-[#2596be]"
                placeholder="Ex: Tech Solutions Ltda"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
              <p className="text-xs text-gray-400 mt-1">Opcional</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Associado *</label>
              <select
                className="w-full rounded-md border-gray-300 border shadow-sm p-2 focus:border-[#2596be] focus:ring-[#2596be]"
                value={formData.tenantId}
                onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
              >
                <option value="">Selecione um Tenant...</option>
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.dbEnvKey} - {t.dbType}
                  </option>
                ))}
              </select>
              {tenants.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">Nenhum tenant cadastrado.</p>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="ghost" onClick={resetForm}>Cancelar</Button>
            <Button 
              onClick={() => isAdding ? handleAdd() : handleUpdate(editingId!)}
              icon={<Save size={16} />}
              disabled={tenants.length === 0}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atualizado em</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {empresas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhuma empresa cadastrada.
                  </td>
                </tr>
              ) : (
                empresas.map((empresa) => {
                  const tenant = getTenantInfo(empresa.tenantId);
                  return (
                    <tr key={empresa.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {empresa.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#e6f4f9] flex items-center justify-center text-[#2596be]">
                            <Building2 size={16} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{empresa.nome || <span className="text-gray-400 italic">Sem nome</span>}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm text-gray-900 font-mono mb-1">
                             <LinkIcon size={14} className="mr-2 text-gray-400" />
                             {empresa.tenantId}
                          </div>
                          {tenant ? (
                             <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                               {tenant.dbEnvKey}
                             </span>
                          ) : (
                            <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Tenant não encontrado
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {formatDate(empresa.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {formatDate(empresa.updatedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => startEdit(empresa)}
                          className="text-[#2596be] hover:text-[#1e7ca0] mr-4 transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => onDelete(empresa.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
