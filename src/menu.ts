import readlinesync = require("readline-sync");
import { colors } from "./util/colors";
import { Conta } from './model/conta';
import { ContaCorrente } from './model/contaCorrente';
import { ContaPoupanca } from "./model/contaPoupanca";
import { ContaController } from './controller/contaController';
import { read } from "fs";

export function main() {

  let contas: ContaController = new ContaController();

  let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
  let titular: string;
  const tiposContas = ['Conta Corrente', 'Conta Poupança'];

  /*  const contacorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Mariana", 15000, 1000);
   contacorrente.visualizar();
   contacorrente.sacar(2000);
   contacorrente.visualizar();
   contacorrente.depositar(1000);
   contacorrente.visualizar();
 
   const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "Victor", 1000, 10);
   contapoupanca.visualizar();
   contapoupanca.sacar(200);
   contapoupanca.visualizar();
   contapoupanca.depositar(1000);
   contapoupanca.visualizar(); */

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

        console.log("\n\nDigite o número da agência: \n\n");
        agencia = readlinesync.questionInt("");

        console.log("\n\nDigite o nome do titular da conta: \n\n");
        titular = readlinesync.question("");

        console.log("\n\nDigite o tipo da conta: \n\n");
        tipo = readlinesync.keyInSelect(tiposContas, "", { cancel: false }) + 1;

        console.log("\n\nDigite o saldo da conta (R$): \n\n");
        saldo = readlinesync.questionFloat("");

        switch (tipo) {
          case 1:
            console.log("\n\nDigite o limite da conta (R$): \n\n");
            limite = readlinesync.questionFloat("");
            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
            break;

          case 2:
            console.log("\n\nDigite o dia do aniversário da conta poupança: \n\n");
            aniversario = readlinesync.questionInt("");
            contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
            break;
        }

        keypress()
        break;

      case 2:
        console.log(colors.fg.whitestrong,
          "\n\nListar todas as contas\n\n", colors.reset);

        contas.listarTodas();

        keypress()
        break;

      case 3:
        console.log(colors.fg.whitestrong,
          "\n\nConsultar dados da conta por número\n\n", colors.reset);

        console.log("\n\nDigite o número da conta: \n\n")
        numero = readlinesync.questionInt("");
        contas.procurarPorNumero(numero);

        keypress()
        break;

      case 4:
        console.log(colors.fg.whitestrong,
          "\n\nAtualizar dados da conta\n\n", colors.reset);

        console.log("\n\nDigite o número da conta: \n\n");
        numero = readlinesync.questionInt("");

        let conta = contas.buscarNoArray(numero);

        if (conta != null) {

          console.log("\n\nDigite o número da agência: \n\n");
          agencia = readlinesync.questionInt("");

          console.log("\n\nDigite o nome do titular da conta: \n\n");
          titular = readlinesync.question("");

          tipo = conta.tipo;

          console.log("\n\nDigite o saldo da conta (R$): \n\n");
          saldo = readlinesync.questionFloat("");

          switch (tipo) {
            case 1:
              console.log("\n\nDigite o limite da conta (R$): \n\n");
              limite = readlinesync.questionFloat("");
              contas.atualizar(new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
              break;

            case 2:
              console.log("\n\nDigite o dia do aniversário da conta poupança: \n\n");
              aniversario = readlinesync.questionInt("");
              contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
              break;
          }
        } else {
          console.log(colors.fg.red,
            "\n\nA Conta número: \n\n" + numero + " não foi encontrada!", colors.reset);
        }

        keypress()
        break;

      case 5:
        console.log(colors.fg.whitestrong,
          "\n\nApagar uma conta\n\n", colors.reset);

        console.log("\n\nDigite o número da conta: \n\n");
        numero = readlinesync.questionInt("");
        contas.deletar(numero);

        keypress()
        break;

      case 6:
        console.log(colors.fg.whitestrong,
          "\n\nSaque\n\n", colors.reset);

        console.log("\n\nDigite o número da conta: \n\n");
        numero = readlinesync.questionInt("");

        console.log("\n\nDigite o valor do saque (R$): \n\n");
        valor = readlinesync.questionFloat("");

        contas.sacar(numero, valor);

        keypress()
        break;

      case 7:
        console.log(colors.fg.whitestrong,
          "\n\nDeposito\n\n", colors.reset);

        console.log("\n\nDigite o número da conta: \n\n");
        numero = readlinesync.questionInt("");

        console.log("\n\nDigite o valor do depósito (R$): ");
        valor = readlinesync.questionFloat("");

        contas.depositar(numero, valor);

        keypress()
        break;

      case 8:
        console.log(colors.fg.whitestrong,
          "\n\nTransferencia entre contas\n\n", colors.reset);

        console.log("\n\nDigite o número da conta de origem: ");
        numero = readlinesync.questionInt("");

        console.log("\n\nDigite o número da conta de destino: ");
        numeroDestino = readlinesync.questionInt("");

        console.log("\n\nDigite o valor do depósito (R$): ");
        valor = readlinesync.questionFloat("");

        contas.transferir(numero, numeroDestino, valor);

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