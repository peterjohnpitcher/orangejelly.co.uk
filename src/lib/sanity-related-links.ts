/**
 * Sanity queries and utilities for Related Links
 */

import { client } from './sanity.client'

export interface RelatedLink {
  text: string
  href: string
  description?: string
  icon?: string
  external?: boolean
  highlight?: boolean
}

export interface RelatedLinksCluster {
  _id: string
  cluster: string
  title: string
  links: RelatedLink[]
  order?: number
}

/**
 * Fetch a specific related links cluster by ID
 */
export async function getRelatedLinksCluster(clusterId: string): Promise<RelatedLinksCluster | null> {
  const query = `*[_type == "relatedLinks" && cluster == $clusterId][0] {
    _id,
    cluster,
    title,
    links,
    order
  }`
  
  try {
    const result = await client.fetch(query, { clusterId })
    return result
  } catch (error) {
    console.error(`Error fetching related links cluster ${clusterId}:`, error)
    return null
  }
}

/**
 * Fetch multiple related links clusters
 */
export async function getRelatedLinksClusters(clusterIds: string[]): Promise<RelatedLinksCluster[]> {
  const query = `*[_type == "relatedLinks" && cluster in $clusterIds] | order(order asc) {
    _id,
    cluster,
    title,
    links,
    order
  }`
  
  try {
    const results = await client.fetch(query, { clusterIds })
    return results || []
  } catch (error) {
    console.error('Error fetching related links clusters:', error)
    return []
  }
}

/**
 * Fetch all related links clusters
 */
export async function getAllRelatedLinksClusters(): Promise<RelatedLinksCluster[]> {
  const query = `*[_type == "relatedLinks"] | order(order asc) {
    _id,
    cluster,
    title,
    links,
    order
  }`
  
  try {
    const results = await client.fetch(query)
    return results || []
  } catch (error) {
    console.error('Error fetching all related links clusters:', error)
    return []
  }
}

/**
 * Transform cluster data to match the legacy format used in components
 * This helps with backward compatibility during migration
 */
export function transformClusterToLegacyFormat(cluster: RelatedLinksCluster) {
  return cluster.links.map(link => ({
    title: link.text,
    description: link.description || '',
    href: link.href,
    emoji: link.icon || '',
    highlight: link.highlight || false
  }))
}