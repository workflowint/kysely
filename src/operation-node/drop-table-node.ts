import { freeze } from '../util/object-utils'
import { OperationNode } from './operation-node'
import { TableNode } from './table-node'

export type DropTablexNodeParams = Omit<
  Partial<DropTableNode>,
  'kind' | 'table'
>
export type DropTableNodeModifier = 'IfExists'

export interface DropTableNode extends OperationNode {
  readonly kind: 'DropTableNode'
  readonly table: TableNode
  readonly modifier?: DropTableNodeModifier
}

/**
 * @internal
 */
export const dropTableNode = freeze({
  is(node: OperationNode): node is DropTableNode {
    return node.kind === 'DropTableNode'
  },

  create(table: TableNode, params?: DropTablexNodeParams): DropTableNode {
    return freeze({
      kind: 'DropTableNode',
      table,
      ...params,
    })
  },

  cloneWithModifier(
    dropIndex: DropTableNode,
    modifier: DropTableNodeModifier
  ): DropTableNode {
    return freeze({
      ...dropIndex,
      modifier,
    })
  },
})
