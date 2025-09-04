export const typeDefs = `#graphql

    type Query {
        me(id: ID!): User
        users: [User]
        posts: [Post]

    }

    type Mutation{
        signup(
            name:String!,
            email:String!,
            password:String!
            bio:String
        ):AuthResponse
 
        signin(
            email:String!,
            password:String!
        ):AuthResponse

        addPost(post:PostInput!): PostResponse
        updatePost(
            postId:ID!,
            post:PostInput
        ): PostResponse
    }


    type Post{
        id: ID!
        title:String!
        content:String!
        author:User
        createdAt:String!
        published: Boolean!
    }

    type User{
        id: ID!
        name: String!
        email:String!
        createdAt: String!
        posts:[Post]
    }

    type Profile{
        id:ID!
        bio:String!
        createdAt:String!
        user: User!
    }

    type AuthResponse{
        success:Boolean!,
        message:String!,
        token:String
    }

    type PostResponse{
        success: Boolean!,
        message:String!,
        post:Post
    }

    input PostInput{
        title: String,
        content: String
    }
`;
