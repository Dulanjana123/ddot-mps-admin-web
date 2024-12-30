import { UserInteractionType } from "@enums/UserInteractionType";
import { loginHistoryService } from "@services/api/LoginHistoryService";
import { tokenGenerationService } from "@services/api/TokenGenerationService";
import { decodeToken } from "@utils/auth-utils";

class AuthDataService {
  async setSession(token: string, ipAddress: string): Promise<void> {
    localStorage.setItem("cp_tk", token);
    const tokenPayload = decodeToken(token);
    this.emailAddress = tokenPayload.emails[0]; // need to change according to new token payload
    this.userName = tokenPayload.name; // need to change according to new token payload

    await loginHistoryService.createLoginHistory({
      userintractionid: UserInteractionType.login,
      ipAddress: ipAddress,
    });
  }

  setLoginSession(token: string): void {
    localStorage.setItem("lg_tk", token);
    const tokenPayload = decodeToken(token);
    this.emailAddress = tokenPayload.email;
  }

  async generateAndSetToken(idToken: string) {
    const tokenPayload = decodeToken(idToken);
    this.emailAddress = tokenPayload.emails[0]; // need to change according to new token payload
    this.userName = tokenPayload.name; // need to change according to new token payload

    const token = await tokenGenerationService.fetchGeneratedToken(this.emailAddress);

    this.setLoginSession(token.data.accessToken);
  }

  isValidToken(): boolean {
    return !!localStorage.getItem("cp_tk") || !!localStorage.getItem("lg_tk");
  }

  isValidLoginToken(): boolean {
    return !!localStorage.getItem("lg_tk");
  }

  get token(): any {
    return localStorage.getItem("cp_tk");
  }

  get loginToken(): any {
    return localStorage.getItem("lg_tk");
  }

  resetSession(ipAddress: string) {
    loginHistoryService.createLoginHistory({
      userintractionid: UserInteractionType.logout,
      ipAddress: ipAddress,
    });
    localStorage.clear();
  }

  async resetSessionInit(): Promise<void> {
    localStorage.clear();
  }

  set userId(value: number) {
    localStorage.setItem("ps_ui", value.toString());
  }

  get userId(): number {
    return Number(localStorage.getItem("ps_ui") ?? 0);
  }

  set emailAddress(value: string) {
    localStorage.setItem("ps_uml", value);
  }

  get emailAddress(): string {
    return localStorage.getItem("ps_uml") ?? "";
  }

  private set userName(value: string) {
    localStorage.setItem("ps_nu", value);
  }

  get userName(): string {
    return localStorage.getItem("ps_nu") ?? "";
  }
}

export const authDatService = new AuthDataService();
