import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'income') {
        return (total += elemento.value);
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'outcome') {
        let resultado = total;
        resultado += elemento.value;
        return resultado;
      }
      return total;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
