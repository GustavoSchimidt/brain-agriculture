export function generateCPF(): string {
  const randomDigit = (): number => Math.floor(Math.random() * 10)

  const calcularDigito = (base: number[], fatorInicial: number): number => {
    const total = base.reduce((acc, num, index) => {
      return acc + num * (fatorInicial - index)
    }, 0)
    const resto = total % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const cpf: number[] = Array.from({ length: 9 }, randomDigit)
  cpf.push(calcularDigito(cpf, 10))
  cpf.push(calcularDigito(cpf, 11))

  return cpf.join('')
}
