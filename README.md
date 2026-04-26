
🚀 ProdEx

Sistema web para gestão de operações e execução de tarefas em ambientes logísticos e produtivos, com foco em controle de fluxo, produtividade e visibilidade em tempo real.

📌 Sobre o projeto

O ProdEx foi desenvolvido para otimizar o gerenciamento de tarefas operacionais, permitindo acompanhar e controlar todo o ciclo de execução dentro de processos logísticos ou produtivos.

A aplicação garante organização e rastreabilidade das atividades, desde o estado pendente até em produção e concluído, promovendo maior eficiência e controle operacional.

⚙️ Funcionalidades


📋 Gestão de tarefas operacionais;

🔄 Controle de status: Pendente/ Em produção /Concluído;

👤 Controle de acesso por tipo de usuário (ex: operador e Gestor);

📊 Interface visual para acompanhamento do fluxo;

🔐 Isolamento de dados por contexto (empresa/usuário);


🧠 Objetivo

Melhorar a organização do fluxo de trabalho;

Aumentar a produtividade operacional;

Reduzir erros manuais;

Fornecer visibilidade clara das tarefas em execução;


🏗️ Arquitetura

O sistema segue uma estrutura organizada por camadas:

Front-end → Interface e interação do usuário

Back-end (Flask) → Regras de negócio e controle de estados

Service Layer → Processamento das regras

Repository Layer → Comunicação com banco de dados


🛠️ Tecnologias utilizadas:
Python;

Flask;

HTML / CSS / JavaScript;

SQL (banco de dados relacional).

🔄 Fluxo de execução:

1-Tarefa é criada como pendente;

2-Usuário inicia → muda para 'em produção';

3-Usuário confirma que finalizou → status concluído;

4-Sistema atualiza interface e registra no banco.

🎯 Diferenciais

💡 Foco em operações reais (logística e produção);

⚡ Interface simples e objetiva;

🧩 Estrutura preparada para escalabilidade.


🚧 Status do projeto

🟡 Em produção
