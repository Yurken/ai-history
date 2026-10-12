'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { knowledgeTree, knowledgeNodes, getKnowledgeNode, getNodeEvents } from '@/lib/data/knowledge-tree';
import type { KnowledgeNode } from '@/types/knowledge';

function matchesNode(node: KnowledgeNode, query: string): boolean {
  const text = [node.title_zh, node.title_en, node.description_zh, node.description_en,
    ...getNodeEvents(node).flatMap(event => [event.title_zh, event.title_en, ...event.tags])].join(' ').normalize('NFKC').toLowerCase();
  return query.normalize('NFKC').toLowerCase().trim().split(/\s+/).every(term => text.includes(term));
}

function ancestorIds(nodes: KnowledgeNode[], id: string): string[] | null {
  for (const node of nodes) {
    if (node.id === id) return [node.id];
    const path = node.children && ancestorIds(node.children, id);
    if (path) return [node.id, ...path];
  }
  return null;
}

export function KnowledgeBrowser() {
  const locale = useLocale();
  const t = useTranslations('knowledge');
  const categoryLabel = useTranslations('event');
  const params = useSearchParams();
  const selected = getKnowledgeNode(params.get('node') || '') || knowledgeTree[0];
  const query = params.get('q') || '';
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([
    ...knowledgeTree.map(node => node.id), ...(ancestorIds(knowledgeTree, selected.id) || []),
  ]));
  const treeRef = useRef<HTMLElement>(null);
  const matchingNodes = new Set(knowledgeNodes.filter(node => matchesNode(node, query)).map(node => node.id));
  const selectedEvents = getNodeEvents(selected);
  const title = (node: KnowledgeNode) => locale === 'zh' ? node.title_zh : node.title_en;
  const description = (node: KnowledgeNode) => locale === 'zh' ? node.description_zh : node.description_en;

  useEffect(() => {
    const restoreBranch = () => {
      const id = new URL(window.location.href).searchParams.get('node') || knowledgeTree[0].id;
      setExpanded(previous => new Set([...previous, ...(ancestorIds(knowledgeTree, id) || [])]));
    };
    window.addEventListener('popstate', restoreBranch);
    return () => window.removeEventListener('popstate', restoreBranch);
  }, []);

  useEffect(() => {
    const pane = treeRef.current;
    const active = pane?.querySelector<HTMLElement>('button[aria-current="true"]');
    if (!pane || !active) return;
    const top = active.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop;
    if (top < pane.scrollTop || top + active.offsetHeight > pane.scrollTop + pane.clientHeight) {
      pane.scrollTop = Math.max(0, top - pane.clientHeight / 2 + active.offsetHeight / 2);
    }
  }, [selected.id, expanded, query]);

  function selectNode(id: string, clearSearch = false) {
    const url = new URL(window.location.href);
    url.searchParams.set('node', id);
    if (clearSearch) url.searchParams.delete('q');
    window.history.pushState(null, '', `${url.pathname}${url.search}`);
    setExpanded(previous => new Set([...previous, ...(ancestorIds(knowledgeTree, id) || [])]));
    if (window.innerWidth < 1280) {
      window.requestAnimationFrame(() => {
        document.getElementById('knowledge-detail')?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        });
        document.getElementById('knowledge-detail-title')?.focus({ preventScroll: true });
      });
    }
  }

  function updateQuery(value: string) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set('q', value);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', `${url.pathname}${url.search}`);
  }

  function toggleNode(id: string) {
    setExpanded(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function visible(node: KnowledgeNode): boolean {
    return matchingNodes.has(node.id) || Boolean(node.children?.some(visible));
  }

  function renderNode(node: KnowledgeNode, depth = 0): ReactNode {
    if (query.trim() && !visible(node)) return null;
    const hasChildren = Boolean(node.children?.length);
    const open = expanded.has(node.id) || Boolean(query.trim());
    const active = selected.id === node.id;
    return (
      <li key={node.id} className="relative py-1 before:absolute before:-left-5 before:top-7 before:w-5 before:border-t before:border-gray-300 dark:before:border-dark-600">
        <div className="flex items-start gap-1">
          {hasChildren ? (
            <button type="button" onClick={() => toggleNode(node.id)} aria-expanded={open} aria-controls={open ? `children-${node.id}` : undefined} aria-label={t(open ? 'collapseNode' : 'expandNode', { name: title(node) })} disabled={Boolean(query.trim())} className="mt-1 flex h-10 w-8 shrink-0 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 disabled:cursor-default dark:text-gray-300 dark:hover:bg-dark-800">
              <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 3 5 5-5 5" /></svg>
            </button>
          ) : <span aria-hidden="true" className="flex h-12 w-8 shrink-0 items-center justify-center text-gray-400">·</span>}
          <button type="button" onClick={() => selectNode(node.id)} aria-controls="knowledge-detail" aria-current={active ? 'true' : undefined} className={`flex min-h-12 min-w-0 flex-1 items-center justify-between gap-3 rounded-lg border px-3 py-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${active ? 'border-primary-600 bg-primary-50 text-primary-800 dark:border-primary-400 dark:bg-primary-900/40 dark:text-primary-200' : 'border-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-dark-800'} ${depth === 0 ? 'font-semibold' : ''}`}>
            <span className="min-w-0 break-words">{title(node)}</span>
            <span aria-label={t('eventCount', { count: getNodeEvents(node).length })} className="shrink-0 text-xs tabular-nums text-gray-500 dark:text-gray-400">{getNodeEvents(node).length}</span>
          </button>
        </div>
        {hasChildren && open && <ul id={`children-${node.id}`} className="ml-4 border-l border-gray-300 pl-5 dark:border-dark-600">{node.children!.map(child => renderNode(child, depth + 1))}</ul>}
      </li>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10">
        <p className="mb-4 text-sm font-semibold tracking-widest text-primary-700 dark:text-primary-300">{t('eyebrow')}</p>
        <h1 className="text-section font-display font-bold text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">{t('description')}</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">{t('overlapNote')}</p>
        <Link href="/timeline" className="mt-4 inline-block text-sm font-semibold text-primary-700 hover:underline dark:text-primary-300">{t('timelineLink')} →</Link>
      </header>

      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 dark:border-dark-700 dark:bg-dark-900/30 sm:p-6 xl:sticky xl:top-6">
          <label htmlFor="knowledge-search" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">{t('searchLabel')}</label>
          <input id="knowledge-search" type="search" value={query} onChange={event => updateQuery(event.target.value)} placeholder={t('placeholder')} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-500/30 dark:border-dark-600 dark:bg-dark-900 dark:text-white" />
          <div className="my-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-primary-700 dark:text-primary-300">
            <button type="button" disabled={Boolean(query.trim())} onClick={() => setExpanded(new Set(knowledgeNodes.map(node => node.id)))} className="rounded py-2 hover:underline focus-visible:outline focus-visible:outline-2 disabled:opacity-50">{t('expandAll')}</button>
            <button type="button" disabled={Boolean(query.trim())} onClick={() => setExpanded(new Set())} className="rounded py-2 hover:underline focus-visible:outline focus-visible:outline-2 disabled:opacity-50">{t('collapseAll')}</button>
            {query && <button type="button" onClick={() => updateQuery('')} className="rounded py-2 hover:underline focus-visible:outline focus-visible:outline-2">{t('clearSearch')}</button>}
          </div>
          {query.trim() && <p role="status" className="mb-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{t('filterHint')}</p>}
          <nav ref={treeRef} aria-label={t('treeLabel')} className="max-h-[65vh] overflow-y-auto pb-2 pr-1">
            <div className="mb-3 rounded-lg bg-primary-700 px-4 py-3 text-sm font-semibold text-white">{t('root')}</div>
            {knowledgeTree.some(visible) ? <ul className="ml-3 border-l border-gray-300 pl-5 dark:border-dark-600">{knowledgeTree.map(node => renderNode(node))}</ul> : <p role="status" className="px-2 py-6 text-sm text-gray-500 dark:text-gray-400">{t('noResults')}</p>}
          </nav>
        </div>

        <section id="knowledge-detail" aria-labelledby="knowledge-detail-title" className="min-w-0 scroll-mt-6">
          <p className="mb-3 text-sm font-medium text-primary-700 dark:text-primary-300">{t('selectedBranch')}</p>
          <h2 id="knowledge-detail-title" tabIndex={-1} aria-live="polite" className="text-3xl font-bold leading-tight text-gray-900 outline-none dark:text-white">{title(selected)}</h2>
          <p className="mt-5 leading-relaxed text-gray-600 dark:text-gray-300">{description(selected)}</p>

          {selected.relatedNodeIds?.length ? (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">{t('connections')}</h3>
              <div className="flex flex-wrap gap-2">{selected.relatedNodeIds.map(id => {
                const related = getKnowledgeNode(id);
                return related ? <button key={id} type="button" onClick={() => selectNode(id, true)} className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-primary-700 hover:border-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 dark:border-dark-600 dark:text-primary-300">{title(related)} ↗</button> : null;
              })}</div>
            </div>
          ) : null}

          {selected.sources?.length ? <div className="mt-6"><h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">{t('sources')}</h3><ul className="space-y-2">{selected.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="break-words text-sm text-primary-700 hover:underline dark:text-primary-300">{source.title} ↗</a></li>)}</ul></div> : null}

          <div className="mt-8 border-t border-gray-200 pt-6 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('relatedEvents', { count: selectedEvents.length })}</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{t('eventsNote')}</p>
            <ol className="mt-4 divide-y divide-gray-200 dark:divide-dark-700">
              {selectedEvents.map(event => <li key={event.id}><Link href={`/event/${event.slug}`} className="group block rounded-lg py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600"><div className="mb-2 flex items-center gap-3 text-xs"><span className="font-semibold tabular-nums text-primary-700 dark:text-primary-300">{event.year}</span><span className="text-gray-500 dark:text-gray-400">{categoryLabel(event.category)}</span></div><h4 className="font-semibold leading-snug text-gray-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-300">{locale === 'zh' ? event.title_zh : event.title_en} ↗</h4><p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{locale === 'zh' ? event.description_zh : event.description_en}</p></Link></li>)}
            </ol>
            {!selectedEvents.length && <p className="py-6 text-sm text-gray-500 dark:text-gray-400">{t('noEvents')}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
