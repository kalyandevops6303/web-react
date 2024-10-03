import JwtService, { JwtConfig } from './jwtService';

export default function useJwt(jwtOverrideConfig: JwtConfig) {
  const jwt = new JwtService(jwtOverrideConfig);

  return {
    jwt,
  };
}
