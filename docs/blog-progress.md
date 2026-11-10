# Blog collection progress

Target: 50 new researched articles, one dedicated sub-agent per article.
Completed and validated: 30 articles, 47,116 words, 129 primary-source references.

Shared SEO infrastructure and the first 15 articles were pushed in commit `19986c5`. This checkpoint adds the next 15 articles. Existing posts are preserved. Research and drafting continue for the remaining topics below.

## Resume and validation

- Read `data/ARTICLE-BRIEF.md` and `data/article-plan.json`.
- Assign one dedicated sub-agent to each missing article, writing only its `data/articles/<slug>.json`. Use at most three article agents at once because the root occupies the fourth slot.
- Run `node scripts/validate-articles.mjs --partial --report`, then `node scripts/generate-article-index.mjs` while the collection is incomplete.
- At 50 articles, run `node scripts/validate-articles.mjs`, `node scripts/check-blog-renderer.cjs`, and `npm run build`. Start the production site and run `node scripts/check-blog-http.mjs <localhost-origin>` without `--partial`.
- Update this checkpoint and the SEO handoff, commit the completed files, and push. The existing SSH key works with `git push git@github.com:abhishek141001/latest-portfolio.git main`; HTTPS authentication was unavailable in this session.

Empty topic hubs stay out of navigation, static routes, and the sitemap. Contextual links to unfinished articles render as text and become active automatically after integration. No placeholder articles are published.

Unrelated edits in `app/ai-native-engineering-playbook/page.tsx` and `package-lock.json` predated this work and remain excluded from blog commits.

## Remaining articles

- 31. `structured-output-validation` — Structured LLM Outputs: JSON Schema and Semantic Validation
- 32. `llm-model-routing` — LLM Model Routing: Quality, Cost, and Fallback Decisions
- 33. `llm-caching-agent-systems` — LLM Caching for Agent Systems: Exact, Semantic, and Prompt Caches
- 34. `llm-fine-tuning-vs-rag` — Fine-Tuning vs RAG vs Prompting: Choosing the Right Intervention
- 35. `llm-gateway-architecture` — LLM Gateway Architecture: Reliability, Policy, and Provider Abstraction
- 36. `idempotency-ai-agent-actions` — Idempotency for AI Agent Actions: Preventing Duplicate Side Effects
- 37. `ai-agent-retries-timeouts` — AI Agent Retries and Timeouts: Deadlines, Jitter, and Retry Budgets
- 38. `agent-workflow-compensating-transactions` — Compensating Transactions for AI Agent Workflows
- 39. `ai-agent-state-versioning` — AI Agent State Versioning: Migrations and In-Flight Runs
- 40. `agent-circuit-breakers-fallbacks` — Circuit Breakers for AI Agents: Fallbacks and Degraded Service
- 41. `browser-agent-reliability` — Reliable Browser Agents: Locators, Verification, and Recovery
- 42. `coding-agent-pull-request-workflow` — Coding Agents in Pull Requests: Isolation, Tests, and Review
- 43. `customer-support-agent-design` — Customer Support AI Agents: Grounding, Escalation, and Safe Actions
- 44. `document-processing-ai-agents` — Document Processing with AI Agents: Extraction and Reconciliation
- 45. `research-agents-citation-verification` — Research Agents: Source Discovery, Citation Verification, and Synthesis
- 46. `mcp-vs-rest-agent-tools` — MCP vs REST for Agent Tools: Protocol and Integration Tradeoffs
- 47. `multi-agent-task-scheduling` — Multi-Agent Task Scheduling: Dependencies, Leases, and Fairness
- 48. `agent-context-window-management` — Agent Context Window Management: Compaction and Evidence Retention
- 49. `build-vs-buy-agent-platform` — Build vs Buy an AI Agent Platform: A Practical Evaluation Framework
- 50. `ai-agent-production-readiness` — AI Agent Production Readiness: From Prototype to Operated Service
