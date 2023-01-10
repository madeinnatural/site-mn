export interface CounterBarData {
  totalPrice: number,
  quantity: number,
  active?: true,
}

export interface ISubmitableSearch {
  submit (termo: string): Promise<any>
}
