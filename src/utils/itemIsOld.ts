import { IItem } from '~/services/getUserItems';

const daysMeasure = 30
const msMeasure = daysMeasure * 24 * 60 * 60 * 1000

const itemIsOld = (item: IItem) => new Date().getTime() - msMeasure > new Date(item.createdAt).getTime();

export default itemIsOld;
