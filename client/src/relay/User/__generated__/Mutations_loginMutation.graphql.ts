/**
 * @generated SignedSource<<cbe9402f120b6a1816ce8d7dbb9d42b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Mutations_loginMutation$variables = {
  email: string;
  password: string;
};
export type Mutations_loginMutation$data = {
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
export type Mutations_loginMutation = {
  response: Mutations_loginMutation$data;
  variables: Mutations_loginMutation$variables;
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
      name: 'Mutations_loginMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'Mutations_loginMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '37810058046cce44d779ed2bcfb74362',
      id: null,
      metadata: {},
      name: 'Mutations_loginMutation',
      operationKind: 'mutation',
      text: 'mutation Mutations_loginMutation(\n  $email: String!\n  $password: String!\n) {\n  login(email: $email, password: $password) {\n    user {\n      id\n      email\n      name\n      createdAt\n    }\n    token\n  }\n}\n',
    },
  };
})();

(node as any).hash = '2cd81671344bf2cedbdd875b3a3c495d';

export default node;
