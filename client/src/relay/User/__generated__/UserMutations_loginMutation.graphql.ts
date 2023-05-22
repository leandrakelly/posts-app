/**
 * @generated SignedSource<<e27b184a9da4c76888e2f1b114d64bcf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserMutations_loginMutation$variables = {
  email: string;
  password: string;
};
export type UserMutations_loginMutation$data = {
  readonly login: {
    readonly token: string | null;
    readonly user: {
      readonly createdAt: string | null;
      readonly email: string | null;
      readonly id: string | null;
      readonly name: string | null;
    } | null;
  } | null;
};
export type UserMutations_loginMutation = {
  response: UserMutations_loginMutation$data;
  variables: UserMutations_loginMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'email',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'password',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'email',
            variableName: 'email',
          },
          {
            kind: 'Variable',
            name: 'password',
            variableName: 'password',
          },
        ],
        concreteType: 'LoginResponse',
        kind: 'LinkedField',
        name: 'login',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'User',
            kind: 'LinkedField',
            name: 'user',
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
                kind: 'ScalarField',
                name: 'createdAt',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'token',
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
      name: 'UserMutations_loginMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'UserMutations_loginMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'd5eac1ab600167993f3bafd7cabf1212',
      id: null,
      metadata: {},
      name: 'UserMutations_loginMutation',
      operationKind: 'mutation',
      text: 'mutation UserMutations_loginMutation(\n  $email: String!\n  $password: String!\n) {\n  login(email: $email, password: $password) {\n    user {\n      id\n      email\n      name\n      createdAt\n    }\n    token\n  }\n}\n',
    },
  };
})();

(node as any).hash = 'af4db9ae6ab73c12ddbdab629ac5f736';

export default node;
