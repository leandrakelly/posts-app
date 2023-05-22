/**
 * @generated SignedSource<<9b6acf75089a5e0e88e1099bfea9dad2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostMutations_createPostMutation$variables = {
  authorId: string;
  content?: string | null;
  title: string;
};
export type PostMutations_createPostMutation$data = {
  readonly createPost: {
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
export type PostMutations_createPostMutation = {
  response: PostMutations_createPostMutation$data;
  variables: PostMutations_createPostMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'authorId',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'content',
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
            name: 'authorId',
            variableName: 'authorId',
          },
          {
            kind: 'Variable',
            name: 'content',
            variableName: 'content',
          },
          {
            kind: 'Variable',
            name: 'title',
            variableName: 'title',
          },
        ],
        concreteType: 'CreatePostResponse',
        kind: 'LinkedField',
        name: 'createPost',
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
      name: 'PostMutations_createPostMutation',
      selections: v3 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v2 /*: any*/, v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'PostMutations_createPostMutation',
      selections: v3 /*: any*/,
    },
    params: {
      cacheID: '4e2afb5fd2a0c57c2ac6f6993d12a7bd',
      id: null,
      metadata: {},
      name: 'PostMutations_createPostMutation',
      operationKind: 'mutation',
      text: 'mutation PostMutations_createPostMutation(\n  $title: String!\n  $content: String\n  $authorId: String!\n) {\n  createPost(title: $title, content: $content, authorId: $authorId) {\n    post {\n      id\n      title\n      content\n      updatedAt\n      authorId\n      author {\n        name\n      }\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = 'fe5dd7aa461047439987ccc0e5b0d67a';

export default node;
