import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiPackage, FiCoffee, FiXCircle, FiArrowLeft } from 'react-icons/fi';

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (!error) {
        setOrder(data);
      }
      setLoading(false);
    }

    fetchOrder();

    // Subscribe to realtime updates
    const subscription = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'orders',
        filter: `id=eq.${orderId}`
      }, (payload) => {
        setOrder(payload.new);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 p-4 text-center">
        <FiXCircle size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Pedido não encontrado</h1>
        <p className="text-amber-700 mb-6">Não conseguimos localizar seu pedido.</p>
        <Link to="/menu" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold">
          Voltar para o Cardápio
        </Link>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pendente':
        return { label: 'Aguardando Aprovação', color: 'bg-yellow-500', icon: <FiClock className="animate-pulse" />, percent: 15 };
      case 'preparando':
        return { label: 'Em Preparo', color: 'bg-orange-500', icon: <FiCoffee className="animate-bounce" />, percent: 50 };
      case 'pronto':
        return { label: 'Pronto para Retirada', color: 'bg-green-500', icon: <FiCheckCircle className="scale-125" />, percent: 85 };
      case 'entregue':
        return { label: 'Entregue', color: 'bg-blue-600', icon: <FiPackage />, percent: 100 };
      case 'cancelado':
        return { label: 'Cancelado', color: 'bg-red-500', icon: <FiXCircle />, percent: 0 };
      default:
        return { label: status, color: 'bg-gray-500', icon: <FiClock />, percent: 0 };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 font-sans">
      <div className="max-w-md mx-auto">
        <Link to="/menu" className="flex items-center gap-2 text-amber-800 mb-8 font-medium hover:text-amber-600 transition-colors">
          <FiArrowLeft /> Voltar para o menu
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
        >
          {/* Header */}
          <div className={`${statusInfo.color} p-10 text-white text-center transition-colors duration-500`}>
            <div className="flex justify-center mb-6 text-6xl">
              {statusInfo.icon}
            </div>
            <h2 className="text-3xl font-bold mb-1">{statusInfo.label}</h2>
            <p className="opacity-80 text-sm font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
          </div>

          <div className="p-8">
            {/* Progress Bar */}
            <div className="relative pt-1 mb-10">
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-amber-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${statusInfo.percent}%` }}
                  className={`${statusInfo.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                ></motion.div>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-black text-amber-800/60 tracking-tighter">
                <span>Recebido</span>
                <span>Preparo</span>
                <span>Pronto</span>
                <span>Finalizado</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100/50">
                <h3 className="text-xs font-black text-amber-800 uppercase tracking-widest mb-4 border-b border-amber-200 pb-2">Informações</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 flex justify-between">
                    <span className="opacity-60">Cliente:</span> 
                    <span className="font-bold">{order.customer_name}</span>
                  </p>
                  <p className="text-gray-700 flex justify-between">
                    <span className="opacity-60">Mesa:</span> 
                    <span className="font-bold"># {order.table_number}</span>
                  </p>
                  <p className="text-gray-700 flex justify-between">
                    <span className="opacity-60">Pagamento:</span> 
                    <span className="font-bold uppercase italic text-xs">{order.payment_method}</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-amber-800 uppercase tracking-widest mb-4">Seu Pedido</h3>
                <div className="space-y-4">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-dashed border-amber-200 pb-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center font-bold text-xs">{item.quantity}x</span>
                        <span className="text-gray-900 font-semibold">{item.name}</span>
                      </div>
                      <span className="text-amber-700 font-black">
                        {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-amber-200 flex justify-between items-center mt-6">
                <span className="text-sm font-black text-amber-900 uppercase">Total Pago</span>
                <span className="text-3xl font-black text-amber-600 tracking-tighter">
                  {Number(order.total_price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            <div className="mt-12 p-4 bg-amber-50 rounded-xl text-center">
              <p className="text-amber-800/70 text-[11px] leading-relaxed">
                Este painel utiliza tecnologia <strong>Realtime</strong>. <br/> 
                Assim que o chef atualizar o status na cozinha, <br/>
                você verá a mudança aqui instantaneamente.
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-8 text-center text-amber-800/40 text-[10px] uppercase font-bold tracking-widest">
          Hanami Café • Estilo e Sabor
        </div>
      </div>
    </div>
  );
}
