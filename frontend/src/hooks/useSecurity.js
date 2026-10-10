import { useCallback, useState } from "react";

export function useSecurity() {
  const [securityStatus, setSecurityStatus] = useState({
    authenticated: Boolean(
      localStorage.getItem("accessToken")
    ),
    secure: true
  });

  const refreshSecurityStatus = useCallback(() => {
    const authenticated = Boolean(
      localStorage.getItem("accessToken")
    );

    setSecurityStatus({
      authenticated,
      secure: authenticated
    });

    return {
      authenticated,
      secure: authenticated
    };
  }, []);

  const clearSecurityState = useCallback(() => {
    localStorage.removeItem("accessToken");

    setSecurityStatus({
      authenticated: false,
      secure: false
    });
  }, []);

  return {
    securityStatus,
    refreshSecurityStatus,
    clearSecurityState
  };
}

export default useSecurity;