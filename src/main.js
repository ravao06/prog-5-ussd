import readline from "readline";

class USSDApp {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start() {
    this.displayMainMenu();
  }

  displayMainMenu() {
    this.printMenu("********* USSD APP ********", [
      "1- MVOLA",
      "2- SOS crédit YAS",
      "3- Quitter"
    ]);
    this.ask("Entrez votre choix : ", this.handleMainChoice.bind(this));
  }

  displayMvolaMenu() {
    this.printMenu("--- MVOLA ---", [
      "1- Vérifier le solde",
      "2- Envoyer de l'argent",
      "3- Retour"
    ]);
    this.ask("Entrez votre choix MVOLA : ", this.handleMvolaChoice.bind(this));
  }

  displaySosMenu() {
    this.printMenu("--- SOS Crédit YAS ---", [
      "1- Demander un SOS de 200 Ar",
      "2- Vérifier l'éligibilité",
      "3- Retour"
    ]);
    this.ask("Entrez votre choix SOS : ", this.handleSosChoice.bind(this));
  }

  handleMainChoice(choice) {
    switch (choice) {
      case "1":
        this.displayMvolaMenu();
        break;
      case "2":
        this.displaySosMenu();
        break;
      case "3":
        this.closeWithMessage("Merci d’avoir utilisé notre service.");
        break;
      default:
        this.closeWithMessage("Choix invalide. Veuillez réessayer.");
    }
  }

  handleMvolaChoice(choice) {
    switch (choice) {
      case "1":
        this.closeWithMessage("Votre solde est de 50 000 MGA");
        break;
      case "2":
        this.closeWithMessage("Fonction d'envoi d'argent en cours...");
        break;
      case "3":
        this.displayMainMenu();
        break;
      default:
        this.closeWithMessage("Choix invalide.");
    }
  }

  handleSosChoice(choice) {
    switch (choice) {
      case "1":
        this.closeWithMessage("Vous avez reçu un SOS de 200 Ar.");
        break;
      case "2":
        this.closeWithMessage("Vous êtes éligible au SOS crédit.");
        break;
      case "3":
        this.displayMainMenu();
        break;
      default:
        this.closeWithMessage("Choix invalide.");
    }
  }

  printMenu(title, options) {
    console.log(`\n${title}`);
    options.forEach(option => console.log(option));
    console.log();
  }

  ask(promptText, callback) {
    this.rl.question(promptText, (input) => {
      callback(input.trim());
    });
  }

  closeWithMessage(message) {
    console.log(message);
    this.rl.close();
  }
}

const app = new USSDApp();
app.start();
