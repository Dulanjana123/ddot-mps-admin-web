import globalAppConfig from "@config/global-app-config";
import * as signalR from "@microsoft/signalr";

class SignalRService {
  private connection: signalR.HubConnection;
  private maxRetries: number = 5; 
  private retryCount: number = 0; 
  private retryDelay: number = 5000; 

  constructor(email: string) {

    if(!email || email.trim() == ""){
      throw new Error("Email is required to establish a SignalR connection.");
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${globalAppConfig.signalRApiUrl}?email=${email}`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

      this.startConnection();
  }

  private startConnection(){
    this.connection
      .start()
      .then(() => {
        this.retryCount = 0;
      })
      .catch((err) => {
        this.handleConnectionFailure();
      })
  }

  private handleConnectionFailure(){
    if(this.retryCount < this.maxRetries) {
      this.retryCount++;
      setTimeout(() => this.startConnection(), this.retryDelay);
    } else {
    }
  }

  //can invoke this method when the user logs out
  public stopConnection() {
    this.connection.stop()
      .then(() => {
      })
      .catch((err) => {
      });
  }

  public onReceiveNotification(callback: (type: string, title: string, body: string) => void) {
    this.connection.on("ReceiveNotification", callback);
  }

  public offReceiveNotification(callback: (type: string, title: string, body: string) => void) {
    this.connection.off("ReceiveNotification", callback);
  }
}

export const createSignalRService = (email: string) => new SignalRService(email);


