import { Conta } from '../model/conta';
import { ContaRepository } from '../repository/contaRepository';
import { colors } from '../util/colors';

export class ContaController implements ContaRepository {

  private listaContas: Array<Conta> = new Array<Conta>();
  numero: number = 0;

  procurarPorNumero(numero: number): void {
    let buscaConta = this.buscarNoArray(numero);

    if (buscaConta != null) {
      buscaConta.visualizar();
    } else
      console.log(colors.fg.red,
        "\n\nA Conta número: \n\n" + numero + " não foi encontrada!", colors.reset);
  }
  listarTodas(): void {
    for (let conta of this.listaContas) {
      conta.visualizar();
    };
  }
  cadastrar(conta: Conta): void {
    this.listaContas.push(conta);
    console.log(colors.fg.green,
      "\n\nA Conta número: \n\n" + conta.numero + " foi criada com  sucesso!", colors.reset);
  }
  atualizar(conta: Conta): void {
    let buscaConta = this.buscarNoArray(conta.numero);

    if (buscaConta != null) {
      this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
      console.log(colors.fg.green,
        "\n\nA Conta número: \n\n" + conta.numero + " foi atualizada com  sucesso!", colors.reset);

    } else
      console.log(colors.fg.red,
        "\n\nA Conta número: \n\n" + conta.numero + " não foi encontrada!", colors.reset);
  }
  deletar(numero: number): void {
    let buscaConta = this.buscarNoArray(numero);

    if (buscaConta != null) {
      this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
      console.log(colors.fg.green,
        "\n\nA Conta número: \n\n" + numero + " foi apagada com  sucesso!", colors.reset);

    } else
      console.log(colors.fg.red,
        "\n\nA Conta número: \n\n" + numero + " não foi encontrada!", colors.reset);
  }
  public sacar(numero: number, valor: number): void {
    let conta = this.buscarNoArray(numero);

    if (conta != null) {

      if (conta.sacar(valor) == true)
        console.log(colors.fg.green,
          "\n\nO Saque na conta número: " + numero + " foi efetuado com sucesso!", colors.reset);

    } else
      console.log(colors.fg.red,
        "\n\nA conta número: " + numero + " Não foi encontrada!", colors.reset);

  }
  public depositar(numero: number, valor: number): void {
    let conta = this.buscarNoArray(numero);

    if (conta != null) {
      conta.depositar(valor);
      console.log(colors.fg.green,
        "\n\nO Depósito na conta número: " + numero + " foi efetuado com sucesso!", colors.reset);

    } else
      console.log(colors.fg.red, "\n\nA conta número: " + numero + " não foi encrotada!", colors.reset);

  }
  public transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
    let contaOrigem = this.buscarNoArray(numeroOrigem);
    let contaDestino = this.buscarNoArray(numeroDestino);

    if (contaOrigem != null && contaDestino != null) {
      if (contaOrigem.sacar(valor) == true) {
        contaDestino.depositar(valor);
        console.log(colors.fg.green,
          "\n\nA Tranferência da conta número: " + numeroOrigem +
          " para a conta número: " + numeroDestino + " foi efetuada com sucesso!",
          colors.reset);

      } else
        console.log(colors.fg.red, "\n\nA conta número: " + numeroOrigem +
          " e/ou a conta número: " + numeroDestino + " não foram encontradas!",
          colors.reset);
    }

  }

  public gerarNumero(): number {
    return ++this.numero;
  }

  public buscarNoArray(numero: number): Conta | null {

    for (let conta of this.listaContas) {
      if (conta.numero === numero)
        return conta;
    }

    return null;

  }

}