import { QTDE_MAX_PARCELAS, TAXA_JUROS_MENSAL } from "../constants";
import Parcelamento from "./Parcelamento";

export default class CalcularParcelamento {
  executar(
    valor: number,  //* Valor Base promocional
    qtdeParcelas: number = QTDE_MAX_PARCELAS,
    taxaJuros: number = TAXA_JUROS_MENSAL //* Pode passar uma taxa específica ou usa a taxa padrão cadastrada
  ): Parcelamento {
    if (qtdeParcelas < 2 || qtdeParcelas > QTDE_MAX_PARCELAS){
      //* Dispara uma exceção caso tem parcelar acima do permitido 
      throw new Error(`Quantidade de parcelas deve ser entre 2 e ${QTDE_MAX_PARCELAS}`)
    }

    //* Calcula o valor total do produto, junto com os juros compostos
    const totalComJuros = this.calcularJurosCompostos(valor, taxaJuros, qtdeParcelas)

    return {
      valorParcela: this.comDuasCasasDecimais(totalComJuros / qtdeParcelas),
      valorTotal: this.comDuasCasasDecimais(totalComJuros),
      qtdeParcelas,
      taxaJuros,
    }
  }

    private calcularJurosCompostos(valorTotal: number, taxaMensal: number, qtdeParcelas: number){
      //* O cálculo é o Valor Promocional, multiplicado pela formula
      //* 1 mais a taxaMensal elevado a qtdeParcelas Ex. (0.0167)¹²
      return valorTotal * Math.pow(1 + taxaMensal, qtdeParcelas)
    }

    private comDuasCasasDecimais(valor: number): number {
      return Math.round(valor * 100) / 100
    }
}