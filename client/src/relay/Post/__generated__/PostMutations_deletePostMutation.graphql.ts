/**
 * @generated SignedSource<<e592716447c877ba04013132dd75fbf0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostMutations_deletePostMutation$variables = {
  postId: string;
};
export type PostMutations_deletePostMutation$data = {
  readonly deletePost: {
    readonly post: {
      readonly id: string | null;
    } | null;
  } | null;
};
export type PostMutations_deletePostMutation = {
  response: PostMutations_deletePostMutation$data;
  variables: PostMutations_deletePostMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'postId',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'postId',
            variableName: 'postId',
          },
        ],
        concreteType: 'DeletePostResponse',
        kind: 'LinkedField',
        name: 'deletePost',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'Post',
            kind: 'LinkedField',
            name: 'post',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'id',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'PostMutations_deletePostMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'PostMutations_deletePostMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '3ddc25e0ff35511bb3c2cf62dbcce594',
      id: null,
      metadata: {},
      name: 'PostMutations_deletePostMutation',
      operationKind: 'mutation',
      text: 'mutation PostMutations_deletePostMutation(\n  $postId: String!\n) {\n  deletePost(postId: $postId) {\n    post {\n      id\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = '85741dbb58831d1b01c93b9958cb41bb';

export default node;
