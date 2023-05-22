/**
 * @generated SignedSource<<f68e4d3e0f60072361d500adfb62ef3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserMutations_createUserMutation$variables = {
  email: string;
  name?: string | null;
  password: string;
};
export type UserMutations_createUserMutation$data = {
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
export type UserMutations_createUserMutation = {
  response: UserMutations_createUserMutation$data;
  variables: UserMutations_createUserMutation$variables;
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
      name: 'UserMutations_createUserMutation',
      selections: v3 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'UserMutations_createUserMutation',
      selections: v3 /*: any*/,
    },
    params: {
      cacheID: '88f6403b918f6e3dc5896be3d95be1ce',
      id: null,
      metadata: {},
      name: 'UserMutations_createUserMutation',
      operationKind: 'mutation',
      text: 'mutation UserMutations_createUserMutation(\n  $name: String\n  $email: String!\n  $password: String!\n) {\n  createUser(name: $name, email: $email, password: $password) {\n    user {\n      id\n      email\n      name\n      createdAt\n    }\n    token\n  }\n}\n',
    },
  };
})();

(node as any).hash = '8186ba4be92e65f7637c5f5c3b78e4ef';

export default node;
