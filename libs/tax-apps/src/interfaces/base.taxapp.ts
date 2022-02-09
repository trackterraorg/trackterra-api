export interface ICsvHeaderCell {
    id: string;
    title: string;
}

export interface ITaxApp {
    txObj(): any;
    csvCells(): ICsvHeaderCell[];
}