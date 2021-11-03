import { auth } from "features/Home/firebase-init";

export const SignOut = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign out</button>
  );
};
