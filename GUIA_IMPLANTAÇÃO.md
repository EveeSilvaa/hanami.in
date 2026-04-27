# 🚀 Guia Completo de Implantação (Deployment Guide)

Este guia cobre passo a passo como de colocar o seu sistema de pedidos **Hanami Café** no ar, conectando o Vercel (Hospedagem), Supabase (Banco de Dados) e Telegram (Notificações).

---

## Passo 1: Configuração do Supabase (Banco de Dados)

1. Acesse [Supabase.com](https://supabase.com/) e crie uma conta / faça login.
2. Crie um novo projeto (ex: `hanami-cafe`).
3. Vá no menu esquerdo e clique em **SQL Editor** (`</>`).
4. Clique em **New Query** e cole o seguinte código para criar a tabela de pedidos:

```sql
create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  table_number text not null,
  payment_method text not null,
  items jsonb not null,
  total_price numeric not null,
  status text default 'pendente',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ativar o modo Realtime (Obrigatório para a tela de acompanhamento ao vivo)
alter publication supabase_realtime add table orders;
```
5. Clique em **Run** para executar.
6. Vá em **Project Settings** (ícone de engrenagem ⚙️) > **API**.
7. Copie e guarde as seguintes chaves:
   - **Project URL**
   - **anon public** (Chave Pública)
   - **service_role secret** (Chave Secreta - *Nunca mostre a ninguém*)

---

## Passo 2: Publicando na Vercel

1. Tenha o código do seu projeto enviado para um repositório no **GitHub**, **GitLab** ou **Bitbucket**.
2. Acesse [Vercel.com](https://vercel.com/) e faça login.
3. Clique em **Add New...** > **Project**.
4. Importe o repositório do seu projeto.
5. Antes de clicar em "Deploy", expanda a seção **Environment Variables** (Variáveis de Ambiente).
6. Você precisa adicionar todas as **5 chaves** abaixo, usando os valores que você pegou do Supabase e do seu BotFather (Telegram):

| Name (Nome) | Value (Valor) |
| :--- | :--- |
| `VITE_TELEGRAM_BOT_TOKEN` | *Seu Token recebido do BotFather (Ex: 69531...)* |
| `VITE_TELEGRAM_CHAT_ID` | *ID do Grupo do Telegram onde os pedidos vão cair* |
| `VITE_SUPABASE_URL` | *Sua Project URL do Supabase* |
| `VITE_SUPABASE_ANON_KEY` | *Sua chave 'anon public' do Supabase* |
| `SUPABASE_SERVICE_ROLE_KEY` | *Sua chave 'service_role secret' do Supabase* |

7. Após adicionar todas, clique em **Deploy**.
8. Aguarde 1-2 minutos. Sua URL final será algo como `https://hanami-peach.vercel.app`. **Anote esta URL!**

---

## Passo 3: Configurar o Webhook do Telegram

Como os pedidos locais podem ser bloqueados na sua região, precisamos instruir o próprio Telegram a conversar diretamente com os servidores da Vercel (onde não há bloqueio).

Agora que seu site está online na Vercel, você deve "ligar" os botões do Telegram (Aceitar / Cancelar / Pronto).

1. Pegue este link padrão:
   `https://api.telegram.org/bot<SEU_TOKEN_DO_BOT>/setWebhook?url=https://<SUA_URL_DA_VERCEL>/api/telegram-webhook`

2. Substitua os dados com as suas informações. Vai ficar parecido com isso:
   `https://api.telegram.org/bot6953167902:AAHo2-etc-etc-etc/setWebhook?url=https://hanami-peach.vercel.app/api/telegram-webhook`

3. **Cole esse link completo no navegador de internet do seu computador ou celular e aperte Enter.**
4. Se der tudo certo, a tela vai ficar branca apenas com este texto:
   `{"ok":true,"result":true,"description":"Webhook was set"}`

---

## Passo 4: Teste Final! ✅

Tudo configurado! Para testar:
1. Abra o seu site publicado (ex: `hanami-peach.vercel.app`).
2. Adicione um pão com manteiga na sacola, coloque seu nome e clique em "Enviar Pedido".
3. A página deve redirecionar para a tela verde de acompanhamento "Aguardando Aprovação".
4. Vá no seu grupo do Telegram. A mensagem do pedido deve ter aparecido com o botão amarelo "👨‍🍳 Aceitar".
5. Clique em "Aceitar" no Telegram.
6. Olhe imediatamente para o seu site: a barra de progresso deve avançar para "Em Preparo" sozinha, como mágica! ✨
