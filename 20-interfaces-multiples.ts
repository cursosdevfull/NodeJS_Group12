interface ICar {
  break(): void;
  acceleration(): void;
}

interface IHybrid {
  break(): void;
  acceleration(): void;
  hybrid(): void;
}

interface IHybrid2 extends ICar {
  hybrid(): void;
}

class Toyota implements ICar {
  break() {
    console.log("break");
  }
  acceleration() {
    console.log("acceleration");
  }
}

class Kia implements ICar {
  break() {
    console.log("break");
  }
  acceleration() {
    console.log("acceleration");
  }
}

class ToyotaPrius implements IHybrid2 {
  break() {
    console.log("break");
  }
  acceleration() {
    console.log("acceleration");
  }

  hybrid() {
    console.log("hybrid");
  }
}

interface INotificationEmail {
  sentEmail(message: string): void;
}

interface INotificationWhatsApp {
  sentWhatsApp(message: string): void;
}

interface INotification {
  sentEmail(message: string): void;
  sentWhatsApp(message: string): void;
}

class NotificationCustomer
  implements INotificationEmail, INotificationWhatsApp
{
  sentEmail(message: string) {
    console.log("email send");
  }

  sentWhatsApp(message: string) {
    console.log("message send");
  }
}

class NotificationPlanner implements INotificationEmail {
  sentEmail(message: string) {
    console.log("email send");
  }
}

class NotificationStalkeHolder implements INotification {
  sentEmail(message: string) {
    console.log("email send");
  }

  sentWhatsApp(message: string) {
    console.log("message send");
  }
}

class NotificationCEO implements INotificationEmail {
  sentEmail(message: string) {
    console.log("email send");
  }
}
