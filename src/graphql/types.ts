// GraphQL Types - Update these based on your actual GraphQL schema

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: string;
  createdAt: string;
}

// Query Response Types
export interface GetUsersResponse {
  users: User[];
}

export interface GetUserResponse {
  user: User;
}

export interface GetPostsResponse {
  posts: Post[];
}

export interface SearchContentResponse {
  search: SearchResult[];
}

// Mutation Response Types
export interface CreateUserResponse {
  createUser: User;
}

export interface UpdateUserResponse {
  updateUser: User;
}

export interface DeleteUserResponse {
  deleteUser: {
    success: boolean;
    message: string;
  };
}

export interface CreatePostResponse {
  createPost: Post;
}

export interface UpdatePostResponse {
  updatePost: Post;
}

export interface DeletePostResponse {
  deletePost: {
    success: boolean;
    message: string;
  };
}

// Input Types
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
}

export interface UpdatePostInput {
  id: string;
  title?: string;
  content?: string;
}

// Creator Types
export interface ContentCategory {
  contentCategoryId: string;
  contentCategoryName: string;
}

export interface Creator {
  _id: string;
  bio?: string;
  consultationLink?: string;
  contentCategories?: ContentCategory[];
  webhooksEnable?: boolean;
  profilePic?: string;
  profileUrl?: string;
  name: string;
  instagramUserId?: string;
  isBlocked: boolean;
  followersCount: number;
  followStatusCheck?: boolean;
  firebaseToken?: string;
  enableDmAutomation?: boolean;
  deleteDate?: string;
  countryCode?: string;
}

export interface CreatorFilter {
  searchTerm?: string | null;
}

export interface GetAllCreatorsResponse {
  getAllCreators: {
    totalCount: number;
    data: Creator[];
  };
}

export interface GetAllCreatorsVariables {
  page?: number;
  limit?: number;
  filters?: CreatorFilter;
}
