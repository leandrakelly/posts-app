import request from 'supertest';
import { createTestApp } from './testApp';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';
import { Express } from 'express-serve-static-core';

let server: Server;
let app: Express;
describe('Api TEST', () => {
  const port = 5000;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    app = createTestApp();
    server = app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });

  afterAll((done) => {
    prisma.$disconnect();
    server.close(done);
    console.log('Server stopped');
  });

  const createdUserId: { [key: string]: string } = {};
  const createdToken: { [key: string]: string } = {};
  let createdPostId: string;

  it.each(['test', 'test2'])('should register a user', async (name) => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createUser(
              name: "${name}",
              email: "${name}@gmail.com",
              password: "${name}"
            ) {
            user{
                id
                name
                email
            }
            token
            }
          }
        `,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/);

    createdUserId[name] = res.body.data.createUser.user.id;
    createdToken[name] = `Bearer ${res.body.data.createUser.token}`;

    expect(res.body.data.createUser.user.name).toBe(name);
    expect(res.body.data.createUser.user.email).toBe(`${name}@gmail.com`);
    expect(res.body.data.createUser.token).not.toBeNull();
  });

  it('should not register a user if email is empty', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                createUser(
                name: "test",
                email: "",
                password: "test"
                ) {
                user{
                    id
                    name
                    email
                }
                token
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Email and password are required');
  });

  it('should not register a user if password is empty', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                createUser(
                name: "test",
                email: "test2@gmail.com",
                password: ""
                ) {
                user{
                    id
                    name
                    email
                }
                token
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Email and password are required');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            login(
              email: "test@gmail.com",
                password: "test"
            ) {
            user{
                name
                email
            }
            token
            }
            }
        `,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/);

    expect(res.body.data.login.user.name).toBe('test');
    expect(res.body.data.login.user.email).toBe('test@gmail.com');
    expect(res.body.data.login.token).not.toBeNull();
  });

  it('should not login a user if email is empty', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                login(
                email: "",
                password: "test"
                ) {
                user{
                    name
                    email
                }
                token
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Email and password are required');
  });

  it('should not login a user if password is empty', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                login(
                email: "test2@gmail.com",
                password: ""
                ) {
                user{
                    name
                    email
                }
                token
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Email and password are required');
  });

  it('should get all users', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            getUsers {
              id
              name
              email
              posts {
                id
                title
                content
                createdAt
              }
            }
          }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.data.getUsers.length).toBe(2);

    expect(res.body.data.getUsers[0].name).toBe('test');
    expect(res.body.data.getUsers[0].email).toBe('test@gmail.com');

    expect(res.body.data.getUsers[1].name).toBe('test2');
    expect(res.body.data.getUsers[1].email).toBe('test2@gmail.com');

    expect(res.body.data.getUsers[0].posts.length).toBe(0);
    expect(res.body.data.getUsers[1].posts.length).toBe(0);
  });

  it('should get a user', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
        query {
            getUser(id: "${createdUserId.test}") {
                id
                name
                email
                posts {
                    id
                    title
                    content
                }
            }
        }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.data.getUser.name).toBe('test');
    expect(res.body.data.getUser.email).toBe('test@gmail.com');
    expect(res.body.data.getUser.posts.length).toBe(0);
  });

  it('should not get a user if userId is wrong', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
        query {
            getUser(id: "wrongId") {
                id
                name
                email
                posts {
                    id
                    title
                    content
                }
            }
        }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('User not found');
  });

  it('should not create a post if userId is wrong', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                createPost(
                title: "test",
                content: "test"
                authorId: "wrongId"
                ) {
                post{
                    id
                    title
                    content
                }
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Author not found');
  });

  it('should not create a post if title is empty', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                createPost(
                title: "",
                content: "test"
                authorId: "${createdUserId}"
                ) {
                post{
                    id
                    title
                    content
                }
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Title and author ID are required');
  });

  it('should not create a post if authorId is empty', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                createPost(
                title: "test",
                content: "test"
                authorId: ""
                ) {
                post{
                    id
                    title
                    content
                }
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Title and author ID are required');
  });

  it('should create a post', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createPost(
              title: "test",
              content: "test"
              authorId: "${createdUserId.test}"
            ) {
            post{
                id
                title
                content
            }
            }
          }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    createdPostId = res.body.data.createPost.post.id;

    expect(res.body.data.createPost.post.title).toBe('test');
    expect(res.body.data.createPost.post.content).toBe('test');
  });

  it('should get all posts', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
        query {
        getPosts {
            title
            content
            author{
                name
              }
            }
          }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.data.getPosts.length).toBe(1);
  });

  it('should get a post', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
        query {
          getPost(id: "${createdPostId}")
          {
            id
            title
            content
            authorId
            author{
                name
            }
          }
        }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.data.getPost.title).toBe('test');
    expect(res.body.data.getPost.content).toBe('test');
    expect(res.body.data.getPost.author.name).toBe('test');
  });

  it('should not get a post if postId is wrong', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
        query {
            getPost(id: "wrongId")
            {
                id
                title
                content
                authorId
                author{
                    name
                }
            }
        }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Post not found');
  });

  it('should update a post', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            editPost(
              postId: "${createdPostId}",
              title: "test2",
              content: "test2"
            ) {
            post{
                title
                content
                authorId
            }
            }
          }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('userId', createdUserId.test)
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.data.editPost.post.title).toBe('test2');
    expect(res.body.data.editPost.post.content).toBe('test2');
    expect(res.body.data.editPost.post.authorId).toBe(createdUserId.test);
  });

  it('should not update a post if userId is wrong', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                editPost(
                postId: "${createdPostId}",
                title: "test2",
                content: "test2"
                ) {
                post{
                    title
                    content
                }
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test2)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe(
      'Unauthorized: You can only edit your own posts',
    );
  });

  it('should not update a post if postId is wrong', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                editPost(
                postId: "wrongId",
                title: "test2",
                content: "test2"
                ) {
                post{
                    title
                    content
                }
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .set({ userId: createdUserId })
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Post not found');
  });

  it('should not update a post if title and content are empty', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
            mutation {
                editPost(
                postId: "${createdPostId}",
                title: "",
                content: ""
                ) {
                post{
                    title
                    content
                }
                }
            }
            `,
      })
      .set('Content-Type', 'application/json')
      .set({ userId: createdUserId })
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe(
      'Post ID and at least one field to update are required',
    );
  });

  it('should not delete a post of another user', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
                mutation {
                    deletePost(
                    postId: "${createdPostId}"
                    ) {
                    post{
                        title
                        content
                    }
                    }
                }
                `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test2)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe(
      'Unauthorized: You can only delete your own posts',
    );
  });

  it('should not delete a post if postId is wrong', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
                mutation {
                    deletePost(
                    postId: "wrongId"
                    ) {
                    post{
                        title
                        content
                    }
                    }
                }
                `,
      })
      .set('Content-Type', 'application/json')
      .set({ userId: createdUserId })
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toBe('Post not found');
  });

  it('should delete a post', async () => {
    await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            deletePost(
             postId: "${createdPostId}"
            ) {
            post{
                id
                title
                content
            }
            }
          }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('userId', createdUserId.test)
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);
  });

  it('should not have any posts', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
        query {
        getPosts {
            title
            content
            author{
                name
              }
            }
          }
        `,
      })
      .set('Content-Type', 'application/json')
      .set('Authorization', createdToken.test)
      .expect('Content-Type', /json/);

    expect(res.body.data.getPosts.length).toBe(0);
  });
});
