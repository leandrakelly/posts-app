/**
 * @generated SignedSource<<9533a0a0ece69b552dcd61bc8e71f530>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Mutations_createUserMutation$variables = {
  email: string;
  name?: string | null;
  password: string;
};
export type Mutations_createUserMutation$data = {
  readonly createUser: {
    readonly token: string | null;
    readonly user: {
      readonly createdAt: string | null;
      readonly email: string | null;
      readonly id: string | null;
      readonly name: string | null;
    } | null;
  } | null;
};
export type Mutations_createUserMutation = {
  response: Mutations_createUserMutation$data;
  variables: Mutations_createUserMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'email',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'name',
    },
    v2 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'password',
    },
    v3 = [
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
            name: 'name',
            variableName: 'name',
          },
          {
            kind: 'Variable',
            name: 'password',
            variableName: 'password',
          },
        ],
        concreteType: 'CreateUserResponse',
        kind: 'LinkedField',
        name: 'createUser',
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
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'Mutations_createUserMutation',
      selections: v3 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'Mutations_createUserMutation',
      selections: v3 /*: any*/,
    },
    params: {
      cacheID: 'c263eb59607aace1ef287a8690f1404e',
      id: null,
      metadata: {},
      name: 'Mutations_createUserMutation',
      operationKind: 'mutation',
      text: 'mutation Mutations_createUserMutation(\n  $name: String\n  $email: String!\n  $password: String!\n) {\n  createUser(name: $name, email: $email, password: $password) {\n    user {\n      id\n      email\n      name\n      createdAt\n    }\n    token\n  }\n}\n',
    },
  };
})();

(node as any).hash = '8579348d371a6c8c733d7b5f765aed24';

export default node;
