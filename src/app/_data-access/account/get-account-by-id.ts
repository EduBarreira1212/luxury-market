import { BuyerResponseDTO, getBuyerById } from '../buyer/get-buyer-by-id';
import { getSellerById, SellerResponseDTO } from '../seller/get-seller-by-id';

export type AccountResponseDTO = {
    data: SellerResponseDTO | BuyerResponseDTO;
    type: 'seller' | 'buyer';
};

export const getAccountById = async (
    id: string,
): Promise<AccountResponseDTO | null> => {
    const seller = await getSellerById(id);

    if (seller) {
        return { data: seller, type: 'seller' };
    }

    const buyer = await getBuyerById(id);

    if (buyer) {
        return { data: buyer, type: 'buyer' };
    }

    return null;
};
