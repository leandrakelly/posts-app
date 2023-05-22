/**
 * @generated SignedSource<<2a013d701cfe2006fc08a58855211b00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PostQueries_getPostsQuery$variables = {};
export type PostQueries_getPostsQuery$data = {
  readonly getPosts: ReadonlyArray<{
    readonly author: {
      readonly name: string | null;
    } | null;
    readonly authorId: string | null;
    readonly content: string | null;
    readonly id: string | null;
    readonly title: string | null;
    readonly updatedAt: string | null;
  } | null> | null;
};
export type PostQueries_getPostsQuery = {
  response: PostQueries_getPostsQuery$data;
  variables: PostQueries_getPostsQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      concreteType: 'Post',
      kind: 'LinkedField',
      name: 'getPosts',
      plural: true,
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
  ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'PostQueries_getPostsQuery',
      selections: v0 /*: any*/,
      type: 'RootQueryType',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'PostQueries_getPostsQuery',
      selections: v0 /*: any*/,
    },
    params: {
      cacheID: '03182d2dcfd04c74f5a55303272223fa',
      id: null,
      metadata: {},
      name: 'PostQueries_getPostsQuery',
      operationKind: 'query',
      text: 'query PostQueries_getPostsQuery {\n  getPosts {\n    id\n    title\n    content\n    updatedAt\n    authorId\n    author {\n      name\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = '8ae882f751872ed78c542ded7dc871a0';

export default node;
