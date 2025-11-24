export interface MultaAnalysis {
  tipo: string;
  infracao: string;
  valor: number;
  pontos: number;
  local: string;
  data: string;
  placa: string;
  veiculo: string;
  condutor?: string;
  observacoes: string;
  gravidade: 'leve' | 'media' | 'grave' | 'gravissima';
}

export interface ConsultaMulta {
  id: string;
  placa: string;
  quantidade: number;
  valorTotal: number;
  status: 'pendente' | 'pago' | 'em_recurso';
  multas: MultaAnalysis[];
}

export interface UserBadge {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  conquistado: boolean;
  progresso?: number;
}

export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  preco: number;
  popular?: boolean;
}
