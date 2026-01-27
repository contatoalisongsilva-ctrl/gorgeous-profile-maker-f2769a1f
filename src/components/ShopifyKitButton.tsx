import ShopifyBuyButton from "./ShopifyBuyButton";

interface ShopifyKitButtonProps {
  kitType: "1-pote" | "3-potes" | "6-potes" | "12-potes";
}

const kitTypeToValue: Record<string, 1 | 3 | 6 | 12> = {
  "1-pote": 1,
  "3-potes": 3,
  "6-potes": 6,
  "12-potes": 12,
};

const ShopifyKitButton = ({ kitType }: ShopifyKitButtonProps) => {
  const kitValue = kitTypeToValue[kitType];
  return <ShopifyBuyButton kitValue={kitValue} size="normal" />;
};

export default ShopifyKitButton;
