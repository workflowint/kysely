import { freeze } from '../util/object-utils'
import { OperationNode } from './operation-node'

export interface SelectAllNode extends OperationNode {
  readonly kind: 'SelectAllNode'
}

/**
 * @internal
 */
export const selectAllNode = freeze({
  is(node: OperationNode): node is SelectAllNode {
    return node.kind === 'SelectAllNode'
  },

  create(): SelectAllNode {
    return freeze({
      kind: 'SelectAllNode',
    })
  },
})
