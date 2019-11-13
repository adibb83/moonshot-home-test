export class MovieInfo {
    id: string;
    img: string;
    name: string;
    genares: number[];
    year: string;
    plot: string;
    // tslint:disable-next-line:variable-name
    constructor(_id: string, _img: string, _name: string, _genares: number[], _year: string, _plot: string) {
        this.id = _id;
        this.img = _img;
        this.name = _name;
        this.genares = _genares;
        this.year = _year;
        this.plot = _plot;
    }
}

export class Genares {
    id: number;
    value: string;
    // tslint:disable-next-line:variable-name
    constructor(_id: number, _value: string) {
        this.id = _id;
        this.value = _value;
    }
}

export const movieGenares: Genares[] = [
    {id: 0, value: 'drama'},
    {id: 1, value: 'action'},
    {id: 2, value: 'comedy'},
    {id: 3, value: 'war'},
    {id: 4, value: 'horror'}
];

// export enum Genares {
//       drama = 0,
//       action = 1,
//       comedy = 2,
//       war = 3,
//       horror = 4
// }
