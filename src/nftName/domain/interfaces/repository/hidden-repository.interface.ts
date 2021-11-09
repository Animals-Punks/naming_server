import { Hidden } from "@nftName/domain/models/hidden.entity";

export interface IHiddenRepository {
    findByUrl(url: string): Promise<Hidden>
}