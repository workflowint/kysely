import { dropTableNode, DropTableNode } from '../operation-node/drop-table-node'
import { OperationNodeSource } from '../operation-node/operation-node-source'
import { CompiledQuery } from '../query-compiler/compiled-query'
import { Compilable } from '../util/compilable'
import { preventAwait } from '../util/prevent-await'
import { QueryExecutor } from '../query-executor/query-executor'

export class DropTableBuilder implements OperationNodeSource, Compilable {
  readonly #dropTableNode: DropTableNode
  readonly #executor: QueryExecutor

  constructor(args: DropTableBuilderConstructorArgs) {
    this.#dropTableNode = args.dropTableNode
    this.#executor = args.executor
  }

  ifExists(): DropTableBuilder {
    return new DropTableBuilder({
      executor: this.#executor,
      dropTableNode: dropTableNode.cloneWithModifier(
        this.#dropTableNode,
        'IfExists'
      ),
    })
  }

  toOperationNode(): DropTableNode {
    return this.#executor.transformNode(this.#dropTableNode)
  }

  compile(): CompiledQuery {
    return this.#executor.compileQuery(this.toOperationNode())
  }

  async execute(): Promise<void> {
    await this.#executor.executeQuery(this.compile())
  }
}

preventAwait(
  DropTableBuilder,
  "don't await DropTableBuilder instances directly. To execute the query you need to call `execute`"
)

export interface DropTableBuilderConstructorArgs {
  dropTableNode: DropTableNode
  executor: QueryExecutor
}
