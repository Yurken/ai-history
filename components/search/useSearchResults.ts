'use client';

import { useEffect, useState } from 'react';
import { searchClient } from '@/lib/search/client';
import type { SearchIndex } from '@/lib/search/types';

interface SearchState {
  query: string;
  attempt: number;
  results: SearchIndex[];
  status: 'ready' | 'error';
}

export function useSearchResults(query: string, limit: number, includeAll = false) {
  const [state, setState] = useState<SearchState | null>(null);
  const [attempt, setAttempt] = useState(0);
  const searchQuery = query.trim();

  useEffect(() => {
    if (!searchQuery && !includeAll) return;
    let cancelled = false;

    async function performSearch() {
      try {
        await searchClient.init();
        const results = searchQuery ? searchClient.search(searchQuery, limit) : searchClient.getAll();
        if (!cancelled) setState({ query: searchQuery, attempt, results, status: 'ready' });
      } catch {
        if (!cancelled) setState({ query: searchQuery, attempt, results: [], status: 'error' });
      }
    }

    void performSearch();
    return () => { cancelled = true; };
  }, [searchQuery, limit, includeAll, attempt]);

  const isCurrent = state?.query === searchQuery && state.attempt === attempt;
  const status = !searchQuery && !includeAll ? 'idle' : isCurrent ? state.status : 'loading';

  return {
    results: isCurrent ? state.results : [],
    status,
    retry: () => setAttempt(value => value + 1),
  };
}
