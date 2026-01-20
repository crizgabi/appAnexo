export default class ServiceOrderHourly {
  constructor({
    idHorario = null,              
    idConserto,                    
    data,                        
    horaInicio,                   
    horaFim,                      
    ordem = null,                  
    tecnicoId = null,              
    tecnicoNome = null,            
    usuarioId = null,             
    operacaoId = null,            
    operacaoNome = null,           
    valorHora = null,             
    valorTotalOperacao = 0,        
    totalMinutos = null,           
    totalFormatado = null,
    idTecnico = null        
  }) {
    this.idHorario = idHorario;
    this.idConserto = idConserto;
    this.data = data;
    this.horaInicio = horaInicio;
    this.horaFim = horaFim;
    this.ordem = ordem;
    this.tecnicoId = tecnicoId;
    this.tecnicoNome = tecnicoNome;
    this.usuarioId = usuarioId;
    this.operacaoId = operacaoId;
    this.operacaoNome = operacaoNome;
    this.valorHora = valorHora;
    this.valorTotalOperacao = valorTotalOperacao;
    this.totalMinutos = totalMinutos;
    this.totalFormatado = totalFormatado;
    this.idTecnico = idTecnico;
  }
}