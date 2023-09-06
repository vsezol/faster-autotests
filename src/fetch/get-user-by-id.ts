export interface User {
  id: number;
  name: string;
}

export const getUserById = async (id: number): Promise<User> => {
  const response: Response = await fetch(`my-test-api/user/${id}`);

  const user: User = await response.json();

  return user;
};
