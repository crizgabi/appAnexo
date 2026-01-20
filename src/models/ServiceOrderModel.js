export default class OrdemServico {
    constructor({
        idConserto = null,      
        idCliente,            
        idTecnico = null,        
        idEquipamento = null,  
        numeroOS,
        idStatus = 1,            
        observacao = null,       
        numeroSerie = null,      
        defeitoReclamado = null,  
        localAtendimento = null, 
        tipoConserto = null,     
        situacao = 0,            
        dataConserto = null,      
        hora = null,              
        dataCadastro = null,      
        dataAtualizacao = null,   
    }) {
        this.idConserto = idConserto;
        this.idCliente = idCliente;
        this.idTecnico = idTecnico;
        this.idEquipamento = idEquipamento;
        this.numeroOS = numeroOS;
        this.idStatus = idStatus;
        this.observacao = observacao;
        this.numeroSerie = numeroSerie;
        this.defeitoReclamado = defeitoReclamado;
        this.localAtendimento = localAtendimento;
        this.tipoConserto = tipoConserto;
        this.situacao = situacao;
        this.dataConserto = dataConserto;
        this.hora = hora;
        this.dataCadastro = dataCadastro;
        this.dataAtualizacao = dataAtualizacao;
    }
}