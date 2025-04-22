import { cnpj, cpf } from 'cpf-cnpj-validator'

export function isValidCPF(cpfValue: string): boolean {
  return cpfValue.length === 11 && cpf.isValid(cpfValue)
}

export function isValidCNPJ(cnpjValue: string): boolean {
  return cnpjValue.length === 14 && cnpj.isValid(cnpjValue)
}
