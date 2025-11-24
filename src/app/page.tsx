'use client';

import { useState } from 'react';
import {
  Upload,
  FileSearch,
  Briefcase,
  UserCheck,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Award,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  Car,
  Shield,
  Zap,
  Target,
} from 'lucide-react';
import { UploadZone } from '@/components/custom/upload-zone';
import { MultaAnalysis, UserBadge, Servico } from '@/lib/types';

type Screen = 'upload' | 'analise' | 'servicos' | 'identificacao' | 'consulta';

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<Screen>('upload');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<MultaAnalysis | null>(null);
  const [userPoints, setUserPoints] = useState(120);

  const badges: UserBadge[] = [
    {
      id: '1',
      nome: 'Consultor Iniciante',
      descricao: 'Realize sua primeira consulta',
      icone: 'target',
      conquistado: true,
      progresso: 100,
    },
    {
      id: '2',
      nome: 'Analista Expert',
      descricao: 'Analise 10 multas',
      icone: 'award',
      conquistado: true,
      progresso: 100,
    },
    {
      id: '3',
      nome: 'Mestre das Multas',
      descricao: 'Analise 50 multas',
      icone: 'shield',
      conquistado: false,
      progresso: 68,
    },
    {
      id: '4',
      nome: 'Velocista',
      descricao: 'Consulte 5 vezes em um dia',
      icone: 'zap',
      conquistado: false,
      progresso: 40,
    },
  ];

  const servicos: Servico[] = [
    {
      id: '1',
      titulo: 'Análise de Multa',
      descricao: 'Análise completa com IA da sua notificação',
      icone: 'file-search',
      preco: 29.9,
      popular: true,
    },
    {
      id: '2',
      titulo: 'Identificação de Condutor',
      descricao: 'Indicação correta do condutor responsável',
      icone: 'user-check',
      preco: 49.9,
    },
    {
      id: '3',
      titulo: 'Recurso de Multa',
      descricao: 'Elaboração de recurso administrativo',
      icone: 'briefcase',
      preco: 199.9,
      popular: true,
    },
    {
      id: '4',
      titulo: 'Consulta Completa',
      descricao: 'Consulta de todas as multas do veículo',
      icone: 'search',
      preco: 39.9,
    },
  ];

  const multasMock = [
    {
      id: '1',
      tipo: 'Excesso de velocidade',
      valor: 195.23,
      pontos: 5,
      data: '15/12/2024',
      status: 'pendente',
    },
    {
      id: '2',
      tipo: 'Estacionamento irregular',
      valor: 130.16,
      pontos: 3,
      data: '10/12/2024',
      status: 'pendente',
    },
    {
      id: '3',
      tipo: 'Avanço de sinal vermelho',
      valor: 293.47,
      pontos: 7,
      data: '05/12/2024',
      status: 'em_recurso',
    },
  ];

  const handleUpload = async (file: File) => {
    setLoading(true);

    try {
      // Converter para base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;

        // Enviar para API
        const response = await fetch('/api/analyze-multa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: base64 }),
        });

        const data = await response.json();

        if (data.success && data.analysis) {
          setAnalysis(data.analysis);
          setActiveScreen('analise');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { id: 'upload' as Screen, label: 'Upload', icon: Upload },
    { id: 'analise' as Screen, label: 'Análise', icon: FileSearch },
    { id: 'servicos' as Screen, label: 'Serviços', icon: Briefcase },
    { id: 'identificacao' as Screen, label: 'Identificação', icon: UserCheck },
    { id: 'consulta' as Screen, label: 'Consulta', icon: Search },
  ];

  const getGravidadeColor = (gravidade: string) => {
    switch (gravidade) {
      case 'leve':
        return 'text-blue-400';
      case 'media':
        return 'text-yellow-400';
      case 'grave':
        return 'text-orange-400';
      case 'gravissima':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getBadgeIcon = (icone: string) => {
    switch (icone) {
      case 'target':
        return <Target className="w-8 h-8" />;
      case 'award':
        return <Award className="w-8 h-8" />;
      case 'shield':
        return <Shield className="w-8 h-8" />;
      case 'zap':
        return <Zap className="w-8 h-8" />;
      default:
        return <Award className="w-8 h-8" />;
    }
  };

  const getServicoIcon = (icone: string) => {
    switch (icone) {
      case 'file-search':
        return <FileSearch className="w-8 h-8" />;
      case 'user-check':
        return <UserCheck className="w-8 h-8" />;
      case 'briefcase':
        return <Briefcase className="w-8 h-8" />;
      case 'search':
        return <Search className="w-8 h-8" />;
      default:
        return <Briefcase className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-inter">
      {/* Header */}
      <header className="border-b border-[#00FF00]/10 bg-[#0D0D0D]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00FF00]/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#00FF00]" />
              </div>
              <h1 className="text-2xl font-bold font-inter">
                minnes<span className="text-[#00FF00]">.multas</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] border border-[#00FF00]/20">
                <Award className="w-5 h-5 text-[#00FF00]" />
                <span className="text-sm font-semibold">{userPoints} pts</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-[#00FF00]/10 bg-[#0D0D0D]/60 backdrop-blur-lg sticky top-[73px] z-40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeScreen === item.id
                      ? 'bg-[#00FF00] text-[#0D0D0D] shadow-lg shadow-[#00FF00]/20'
                      : 'bg-[#1A1A1A] text-gray-400 hover:text-white hover:bg-[#1A1A1A]/80 border border-[#00FF00]/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Upload Screen */}
        {activeScreen === 'upload' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-inter">
                Analise sua multa com{' '}
                <span className="text-[#00FF00]">IA</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Faça upload da foto da sua notificação e receba uma análise
                completa em segundos
              </p>
            </div>

            <UploadZone onUpload={handleUpload} loading={loading} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1A1A1A] border border-[#00FF00]/10 rounded-xl p-6 text-center hover:border-[#00FF00]/30 transition-all duration-300">
                <Zap className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Análise Rápida</h3>
                <p className="text-sm text-gray-400">
                  Resultados em menos de 10 segundos
                </p>
              </div>
              <div className="bg-[#1A1A1A] border border-[#00FF00]/10 rounded-xl p-6 text-center hover:border-[#00FF00]/30 transition-all duration-300">
                <Shield className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">100% Seguro</h3>
                <p className="text-sm text-gray-400">
                  Seus dados são criptografados
                </p>
              </div>
              <div className="bg-[#1A1A1A] border border-[#00FF00]/10 rounded-xl p-6 text-center hover:border-[#00FF00]/30 transition-all duration-300">
                <Target className="w-8 h-8 text-[#00FF00] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Precisão IA</h3>
                <p className="text-sm text-gray-400">
                  Tecnologia OpenAI GPT-4
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Análise Screen */}
        {activeScreen === 'analise' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-inter">
                Resultado da Análise
              </h2>
              <button
                onClick={() => setActiveScreen('upload')}
                className="px-6 py-3 bg-[#00FF00] text-[#0D0D0D] rounded-xl font-semibold hover:bg-[#00FF00]/90 transition-all duration-300"
              >
                Nova Análise
              </button>
            </div>

            {analysis ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card Principal */}
                <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-8 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {analysis.tipo}
                      </h3>
                      <p className="text-gray-400">
                        Código: {analysis.infracao}
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full bg-[#00FF00]/10 border border-[#00FF00]/30 ${getGravidadeColor(
                        analysis.gravidade
                      )} font-semibold capitalize`}
                    >
                      {analysis.gravidade}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#00FF00]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-[#00FF00]" />
                        <span className="text-sm text-gray-400">Valor</span>
                      </div>
                      <p className="text-2xl font-bold">
                        R$ {analysis.valor.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#00FF00]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-[#00FF00]" />
                        <span className="text-sm text-gray-400">Pontos</span>
                      </div>
                      <p className="text-2xl font-bold">{analysis.pontos}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#00FF00] mt-1" />
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Local</p>
                        <p className="font-semibold">{analysis.local}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-[#00FF00] mt-1" />
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Data</p>
                        <p className="font-semibold">{analysis.data}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Car className="w-5 h-5 text-[#00FF00] mt-1" />
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Veículo</p>
                        <p className="font-semibold">
                          {analysis.veiculo} - {analysis.placa}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#00FF00]/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileSearch className="w-5 h-5 text-[#00FF00]" />
                      Observações
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {analysis.observacoes}
                    </p>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#00FF00]" />
                      Estatísticas
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">
                            Chance de Recurso
                          </span>
                          <span className="text-[#00FF00] font-semibold">
                            78%
                          </span>
                        </div>
                        <div className="w-full bg-[#0D0D0D] rounded-full h-2">
                          <div
                            className="bg-[#00FF00] h-2 rounded-full"
                            style={{ width: '78%' }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Gravidade</span>
                          <span className="text-yellow-400 font-semibold">
                            Média
                          </span>
                        </div>
                        <div className="w-full bg-[#0D0D0D] rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: '60%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00FF00]/5 border border-[#00FF00]/30 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-3">
                      Recomendação Premium
                    </h3>
                    <p className="text-sm text-gray-300 mb-4">
                      Baseado na análise, recomendamos nosso serviço de recurso
                      administrativo.
                    </p>
                    <button className="w-full py-3 bg-[#00FF00] text-[#0D0D0D] rounded-xl font-semibold hover:bg-[#00FF00]/90 transition-all duration-300">
                      Contratar Serviço
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <FileSearch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  Nenhuma análise disponível. Faça upload de uma foto primeiro.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Serviços Screen */}
        {activeScreen === 'servicos' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-inter">
                Nossos <span className="text-[#00FF00]">Serviços</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Soluções completas para suas necessidades de trânsito
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicos.map((servico) => (
                <div
                  key={servico.id}
                  className={`bg-[#1A1A1A] rounded-2xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00FF00]/10 ${
                    servico.popular
                      ? 'border-[#00FF00]/50 relative'
                      : 'border-[#00FF00]/10'
                  }`}
                >
                  {servico.popular && (
                    <div className="absolute -top-3 right-6 px-4 py-1 bg-[#00FF00] text-[#0D0D0D] rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#00FF00]/10 flex items-center justify-center">
                      {getServicoIcon(servico.icone)}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-1">A partir de</p>
                      <p className="text-3xl font-bold text-[#00FF00]">
                        R$ {servico.preco.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{servico.titulo}</h3>
                  <p className="text-gray-400 mb-6">{servico.descricao}</p>
                  <button className="w-full py-3 bg-[#00FF00] text-[#0D0D0D] rounded-xl font-semibold hover:bg-[#00FF00]/90 transition-all duration-300">
                    Contratar Agora
                  </button>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="bg-[#1A1A1A] border border-[#00FF00]/10 rounded-2xl p-6 text-center">
                <CheckCircle className="w-10 h-10 text-[#00FF00] mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">2.847</p>
                <p className="text-gray-400">Multas Analisadas</p>
              </div>
              <div className="bg-[#1A1A1A] border border-[#00FF00]/10 rounded-2xl p-6 text-center">
                <Award className="w-10 h-10 text-[#00FF00] mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">94%</p>
                <p className="text-gray-400">Taxa de Sucesso</p>
              </div>
              <div className="bg-[#1A1A1A] border border-[#00FF00]/10 rounded-2xl p-6 text-center">
                <Clock className="w-10 h-10 text-[#00FF00] mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">24h</p>
                <p className="text-gray-400">Atendimento Rápido</p>
              </div>
            </div>
          </div>
        )}

        {/* Identificação Screen */}
        {activeScreen === 'identificacao' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-inter">
                Identificação de{' '}
                <span className="text-[#00FF00]">Condutor</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Indique corretamente quem estava dirigindo no momento da
                infração
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Número da Notificação
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 123456789"
                      className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl focus:border-[#00FF00] focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Placa do Veículo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: ABC-1234"
                      className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl focus:border-[#00FF00] focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="border-t border-[#00FF00]/10 pt-6">
                  <h3 className="font-bold text-lg mb-4">Dados do Condutor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        placeholder="Nome do condutor"
                        className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl focus:border-[#00FF00] focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CPF
                      </label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl focus:border-[#00FF00] focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CNH
                      </label>
                      <input
                        type="text"
                        placeholder="Número da CNH"
                        className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl focus:border-[#00FF00] focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl focus:border-[#00FF00] focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#00FF00] mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold mb-1">
                        Importante
                      </p>
                      <p className="text-sm text-gray-400">
                        A identificação do condutor deve ser feita em até 30
                        dias após o recebimento da notificação. Dados incorretos
                        podem gerar multa adicional.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#00FF00] text-[#0D0D0D] rounded-xl font-bold text-lg hover:bg-[#00FF00]/90 transition-all duration-300"
                >
                  Enviar Identificação
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Consulta Screen */}
        {activeScreen === 'consulta' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-inter">
                Consulta de <span className="text-[#00FF00]">Multas</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Verifique todas as multas do seu veículo
              </p>
            </div>

            {/* Search */}
            <div className="bg-[#1A1A1A] border border-[#00FF00]/20 rounded-2xl p-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Digite a placa do veículo (Ex: ABC-1234)"
                  className="flex-1 px-6 py-4 bg-[#0D0D0D] border border-[#00FF00]/20 rounded-xl focus:border-[#00FF00] focus:outline-none transition-all duration-300 text-lg"
                />
                <button className="px-8 py-4 bg-[#00FF00] text-[#0D0D0D] rounded-xl font-bold hover:bg-[#00FF00]/90 transition-all duration-300 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Consultar
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                  <span className="text-3xl font-bold">3</span>
                </div>
                <p className="text-gray-400">Multas Pendentes</p>
              </div>
              <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00FF00]/5 border border-[#00FF00]/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-[#00FF00]" />
                  <span className="text-3xl font-bold">R$ 618,86</span>
                </div>
                <p className="text-gray-400">Valor Total</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-400" />
                  <span className="text-3xl font-bold">15</span>
                </div>
                <p className="text-gray-400">Pontos na CNH</p>
              </div>
            </div>

            {/* Multas List */}
            <div className="space-y-4">
              {multasMock.map((multa) => (
                <div
                  key={multa.id}
                  className="bg-[#1A1A1A] border border-[#00FF00]/10 rounded-2xl p-6 hover:border-[#00FF00]/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{multa.tipo}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            multa.status === 'pendente'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : multa.status === 'em_recurso'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                              : 'bg-green-500/10 text-green-400 border border-green-500/30'
                          }`}
                        >
                          {multa.status === 'pendente'
                            ? 'Pendente'
                            : multa.status === 'em_recurso'
                            ? 'Em Recurso'
                            : 'Pago'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {multa.data}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          R$ {multa.valor.toFixed(2)}
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {multa.pontos} pontos
                        </span>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-[#00FF00]/10 border border-[#00FF00]/30 text-[#00FF00] rounded-xl font-semibold hover:bg-[#00FF00] hover:text-[#0D0D0D] transition-all duration-300">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gamification */}
            <div className="bg-gradient-to-br from-[#00FF00]/10 to-[#00FF00]/5 border border-[#00FF00]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-[#00FF00]" />
                Suas Conquistas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`bg-[#1A1A1A] rounded-xl p-4 border transition-all duration-300 ${
                      badge.conquistado
                        ? 'border-[#00FF00]/50'
                        : 'border-[#00FF00]/10 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                        badge.conquistado
                          ? 'bg-[#00FF00]/20 text-[#00FF00]'
                          : 'bg-gray-700 text-gray-500'
                      }`}
                    >
                      {getBadgeIcon(badge.icone)}
                    </div>
                    <h4 className="font-semibold text-sm mb-1">
                      {badge.nome}
                    </h4>
                    <p className="text-xs text-gray-400 mb-2">
                      {badge.descricao}
                    </p>
                    {!badge.conquistado && badge.progresso && (
                      <div className="w-full bg-[#0D0D0D] rounded-full h-1.5">
                        <div
                          className="bg-[#00FF00] h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${badge.progresso}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#00FF00]/10 bg-[#0D0D0D] mt-20">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00FF00]" />
              </div>
              <p className="text-gray-400 text-sm">
                © 2024 minnes.multas - Todos os direitos reservados
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-[#00FF00] transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-[#00FF00] transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-[#00FF00] transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
