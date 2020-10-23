import { useAuthpack } from "@authpack/react";
import { createAuthpack } from "../utils/authpack";
import { AuthpackProvider } from "@authpack/react";

const AuthenticationSubChild = ({authpack, children}) => {
  const state = useAuthpack();
  if(state.ready) {
    if(!!!state.user)
      return <>{children}</>
    else
      return (
        <div onClick={()=>{authpack.open()}}>Open</div>
      )
  }
  else {
    return <div>Loading</div>
  }
}

export const AuthenticationWrapper = ({authpack, children}) => {
  return (
    <AuthpackProvider value={authpack}>
      <AuthenticationSubChild authpack={authpack}>
        {children}
      </AuthenticationSubChild>
    </AuthpackProvider>
  );
}
