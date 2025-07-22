import readlinesync = require("readline-sync");
import { colors } from "./util/colors";
import { Conta } from './model/conta';

export function main() {
  let opcao: number;

  const conta: Conta = new Conta(1, 123, 1, "Adriana", 1000);
  conta.visualizar();
  conta.sacar(10500);
  conta.visualizar();
  conta.depositar(5000);
  conta.visualizar();

  while (true) {


    console.log(colors.bg.black, colors.fg.yellow,
      "---------------------------------------------");
    console.log("                                             ");
    console.log("                 BANCO DA VÓ                 ");
    console.log("                                             ");
    console.log("---------------------------------------------");
    console.log("        1 - Criar conta                      ");
    console.log("        2 - Listar todas as contas           ");
    console.log("        3 - Buscar conta por numero          ");
    console.log("        4 - Atualizar dados da conta         ");
    console.log("        5 - Apagar conta                     ");
    console.log("        6 - Sacar                            ");
    console.log("        7 - Depositar                        ");
    console.log("        8 - Transferir valores entre contas  ");
    console.log("        9 - Sair                             ");
    console.log("                                             ");
    console.log("---------------------------------------------");
    console.log("                                             ",
      colors.reset);

    console.log(colors.fg.yellow,
      "         Entre com a opção desejada: ", colors.reset);
    opcao = readlinesync.questionInt("");

    if (opcao == 9) {
      console.log(colors.fg.greenstrong,
        "\nBanco da vó - Seu bolso sempre cheio!");
      sobre();
      console.log(colors.reset, "");
      process.exit(0);
    }
    switch (opcao) {
      case 1:
        console.log(colors.fg.whitestrong,
          "\n\nCriar Conta\n\n", colors.reset);

        keypress()
        break;

      case 2:
        console.log(colors.fg.whitestrong,
          "\n\nListar todas as contas\n\n", colors.reset);

        keypress()
        break;

      case 3:
        console.log(colors.fg.whitestrong,
          "\n\nConsultar dados da conta por numero\n\n", colors.reset);

        keypress()
        break;

      case 4:
        console.log(colors.fg.whitestrong,
          "\n\nAtualizar dados da conta\n\n", colors.reset);

        keypress()
        break;

      case 5:
        console.log(colors.fg.whitestrong,
          "\n\nApagar uma conta\n\n", colors.reset);

        keypress()
        break;

      case 6:
        console.log(colors.fg.whitestrong,
          "\n\nSaque\n\n", colors.reset);

        keypress()
        break;

      case 7:
        console.log(colors.fg.whitestrong,
          "\n\nDeposito\n\n", colors.reset);

        keypress()
        break;

      case 8:
        console.log(colors.fg.whitestrong,
          "\n\nTransferencia entre contas\n\n", colors.reset);

        keypress()
        break;

      default:
        console.log(colors.fg.whitestrong,
          "\nOpcao invalida!\n", colors.reset);

        keypress()
        break;

    }
  }
}

main();

export function sobre(): void {
  console.log("\n---------------------------------------------");

  console.log(colors.fg.greenstrong, "\nProjeto desenvolvido por: Paula Policichio");
  console.log("\nEmail: paulapolicichio@gmail.com");
  console.log("\nGitHub: github.com/PaulaGSP", colors.reset);
}

function keypress(): void {
  console.log(colors.reset, "");
  console.log("\nPressione enter para continuar...");
  readlinesync.prompt();
}