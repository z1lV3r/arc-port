import { Check, Link } from "lucide-react";
import { useState } from "react";

import { InputGroupButton } from "./input-group";

interface CopyClipboardButtonProps {
  value: string;
  disabled?: boolean;
}

export function CopyClipboardButton({
  value,
  disabled,
}: CopyClipboardButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <InputGroupButton onClick={handleCopy} disabled={disabled}>
      {hasCopied ? <Check className="text-green-500" /> : <Link />}
    </InputGroupButton>
  );
}
