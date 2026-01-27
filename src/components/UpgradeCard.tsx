import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface UpgradeCardProps {
  currentKit: "1x" | "3x" | "6x";
  onUpgrade: () => void;
}

const UpgradeCard = ({ currentKit, onUpgrade }: UpgradeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (currentKit === "6x") return null;

  const upgradeInfo = {
    "1x": {
      targetKit: "3x",
      units: 2,
      discount: 24,
      bonus: "1x Sérum VitaB3",
      savings: 85.4,
      message:
        "Levando 2 unidades a mais você ganha 24% de desconto e desbloqueia 1x Sérum VitaB3!",
    },
    "3x": {
      targetKit: "6x",
      units: 3,
      discount: 11,
      bonus: "1x Balm Alívio Flex",
      savings: 228.5,
      message:
        "Levando 3 unidades a mais você ganha mais desconto e desbloqueia 1x Balm Alívio Flex!",
    },
  };

  const info = upgradeInfo[currentKit];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl overflow-hidden border border-purple-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 px-4 flex items-center justify-between hover:bg-purple-100/50 transition-colors"
      >
        <span className="text-sm font-medium text-purple-700">
          ✨ Quer dar upgrade no seu combo? Clique para ver a oferta especial
        </span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-purple-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-600" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-3">
          <p className="text-sm text-purple-800">{info.message}</p>
          <div className="flex items-center justify-between bg-white/60 rounded-lg p-2">
            <span className="text-xs text-muted-foreground">
              Economia adicional:
            </span>
            <span className="font-bold text-green-600">
              R$ {info.savings.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <button
            onClick={onUpgrade}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Fazer upgrade agora
          </button>
        </div>
      )}
    </div>
  );
};

export default UpgradeCard;
