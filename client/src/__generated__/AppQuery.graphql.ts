/**
 * @generated SignedSource<<500a4338eafe96f9417534dc0ecfd874>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AppQuery$variables = {};
export type AppQuery$data = {
  readonly getUsers: ReadonlyArray<{
    readonly email: string | null;
    readonly id: string | null;
    readonly name: string | null;
    readonly posts: ReadonlyArray<{
      readonly content: string | null;
      readonly createdAt: string | null;
      readonly id: string | null;
      readonly title: string | null;
    } | null> | null;
  } | null> | null;
};
export type AppQuery = {
  response: AppQuery$data;
  variables: AppQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = [
      {
        alias: null,
        args: null,
        concreteType: 'User',
        kind: 'LinkedField',
        name: 'getUsers',
        plural: true,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'email',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'name',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'Post',
            kind: 'LinkedField',
            name: 'posts',
            plural: true,
            selections: [
              v0 /*: any*/,
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
                name: 'createdAt',
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
      name: 'AppQuery',
      selections: v1 /*: any*/,
      type: 'RootQueryType',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'AppQuery',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'b5f19bc90756c9797bf5c9fab53cfbc9',
      id: null,
      metadata: {},
      name: 'AppQuery',
      operationKind: 'query',
      text: 'query AppQuery {\n  getUsers {\n    id\n    email\n    name\n    posts {\n      id\n      title\n      content\n      createdAt\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = '0df20d4e88eacc83790944ba3f98014a';

export default node;
