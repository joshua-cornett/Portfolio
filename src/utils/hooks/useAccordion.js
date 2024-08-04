// src\utils\hooks\useAccordion.js

import { useState } from 'react';

function useAccordion() {
  const [expandedItemId, setExpandedItemId] = useState(null);

  const toggleAccordion = (itemId) => {
    setExpandedItemId(itemId === expandedItemId ? null : itemId);
  };

  return [expandedItemId, toggleAccordion];
}

export default useAccordion;
