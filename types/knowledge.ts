export interface KnowledgeSource {
  title: string;
  url: string;
}

/** A navigation taxonomy: branches can overlap and events can have multiple labels. */
export interface KnowledgeNode {
  id: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  /** Direct associations; helpers also collect descendant associations. */
  eventIds: string[];
  relatedNodeIds?: string[];
  children?: KnowledgeNode[];
  sources?: KnowledgeSource[];
}
