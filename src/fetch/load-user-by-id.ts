export interface User {
  id: number;
  name: string;
}

export const loadUserById = (id: number): void => {
  fetch(`my-test-api/user/${id}`)
    .then((response: Response) => response.json())
    .then((user: User) => {
      localStorage.setItem('USER_KEY', JSON.stringify(user));
    });
};
