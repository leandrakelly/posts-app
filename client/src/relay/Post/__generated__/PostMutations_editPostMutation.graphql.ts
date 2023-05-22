/**
 * @generated SignedSource<<9500292307b978dee611e3be45843df7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostMutations_editPostMutation$variables = {
  content?: string | null;
  postId: string;
  title?: string | null;
};
export type PostMutations_editPostMutation$data = {
  readonly editPost: {
    readonly post: {
      readonly author: {
        readonly name: string | null;
      } | null;
      readonly authorId: string | null;
      readonly content: string | null;
      readonly id: string | null;
      readonly title: string | null;
      readonly updatedAt: string | null;
    } | null;
  } | null;
};
export type PostMutations_editPostMutation = {
  response: PostMutations_editPostMutation$data;
  variables: PostMutations_editPostMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'content',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'postId',
    },
    v2 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'title',
    },
    v3 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'content',
            variableName: 'content',
          },
          {
            kind: 'Variable',
            name: 'postId',
            variableName: 'postId',
          },
          {
            kind: 'Variable',
            name: 'title',
            variableName: 'title',
          },
        ],
        concreteType: 'EditPostResponse',
        kind: 'LinkedField',
        name: 'editPost',
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
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'title',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'content',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'updatedAt',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'authorId',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: 'PostAuthor',
                kind: 'LinkedField',
                name: 'author',
                plural: false,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'name',
                    storageKey: null,
                  },
                ],
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
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'PostMutations_editPostMutation',
      selections: v3 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v2 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'PostMutations_editPostMutation',
      selections: v3 /*: any*/,
    },
    params: {
      cacheID: '763f109b35914433b043a7e2d8f47d0f',
      id: null,
      metadata: {},
      name: 'PostMutations_editPostMutation',
      operationKind: 'mutation',
      text: 'mutation PostMutations_editPostMutation(\n  $postId: String!\n  $title: String\n  $content: String\n) {\n  editPost(postId: $postId, title: $title, content: $content) {\n    post {\n      id\n      title\n      content\n      updatedAt\n      authorId\n      author {\n        name\n      }\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = '3cceadd7d30fa94685346960f366b4f5';

export default node;
