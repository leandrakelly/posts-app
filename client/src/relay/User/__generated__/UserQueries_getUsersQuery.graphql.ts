/**
 * @generated SignedSource<<8fbc12da7b587162c26bd634666a5b42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserQueries_getUsersQuery$variables = {};
export type UserQueries_getUsersQuery$data = {
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
export type UserQueries_getUsersQuery = {
  response: UserQueries_getUsersQuery$data;
  variables: UserQueries_getUsersQuery$variables;
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
      name: 'UserQueries_getUsersQuery',
      selections: v1 /*: any*/,
      type: 'RootQueryType',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'UserQueries_getUsersQuery',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '9e397e7bf05162319f919e36473f4ff3',
      id: null,
      metadata: {},
      name: 'UserQueries_getUsersQuery',
      operationKind: 'query',
      text: 'query UserQueries_getUsersQuery {\n  getUsers {\n    id\n    email\n    name\n    posts {\n      id\n      title\n      content\n      createdAt\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = '50a475f6fe61bcafca3f0fbb6e4f2927';

export default node;
