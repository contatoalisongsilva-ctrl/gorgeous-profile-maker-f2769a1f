import ShopifyBuyButton from "./ShopifyBuyButton";

interface ShopifyCardButtonProps {
  kitValue: 1 | 3 | 6 | 12;
}

const ShopifyCardButton = ({ kitValue }: ShopifyCardButtonProps) => {
  return <ShopifyBuyButton kitValue={kitValue} size="small" />;
};

export default ShopifyCardButton;
