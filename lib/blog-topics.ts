export const topicClusters = [
  { slug: 'agent-architecture', title: 'Agent Architecture', description: 'Design agent loops, planning, memory, and tool contracts with clear responsibilities and measurable stopping conditions.' },
  { slug: 'orchestration', title: 'Agent Orchestration', description: 'Coordinate durable workflows, parallel agents, handoffs, approvals, and event-driven execution.' },
  { slug: 'agent-operations', title: 'Agent Operations', description: 'Operate AI agents with tracing, cost budgets, latency targets, admission control, and incident response.' },
  { slug: 'evaluation', title: 'Agent Evaluation', description: 'Build evaluation datasets, calibrate judges, test tool use, and validate releases with offline and online evidence.' },
  { slug: 'retrieval', title: 'Retrieval and RAG', description: 'Improve grounded answers with hybrid search, document ingestion, reranking, and consistent knowledge updates.' },
  { slug: 'security', title: 'Agent Security', description: 'Protect agent systems with trust boundaries, least privilege, sandboxing, tenant isolation, and audit trails.' },
  { slug: 'ai-engineering', title: 'AI Engineering', description: 'Build reliable model interfaces with structured outputs, routing, caching, gateways, and appropriate adaptation methods.' },
  { slug: 'reliability', title: 'Agent Reliability', description: 'Handle real failures using idempotency, deadlines, compensating transactions, state migrations, and circuit breakers.' },
  { slug: 'applications', title: 'Agent Applications', description: 'Apply agents to browser automation, code review, customer support, document processing, and research workflows.' },
  { slug: 'platform-design', title: 'Agent Platform Design', description: 'Choose integration protocols, schedule tasks, manage context, evaluate platforms, and prepare systems for production.' },
] as const
