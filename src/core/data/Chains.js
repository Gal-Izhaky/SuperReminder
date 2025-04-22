/**
 * Supermarket chains data
 * Hierarchical structure with main chains and sub-chains
 */
export const supermarketChains = [
    {
        id: 'שופרסל',
        subChains: [
            { id: 'שופרסל דיל' },
            { id: 'שופרסל שלי' },
            { id: 'יש חסד' }
        ]
    },
    { id: 'טיב טעם' },
    { id: 'רמי לוי' },
    { id: 'חצי חינם' },
    { id: 'סטופ מרקט' },
    { id: 'אושר עד' },
    { id: 'am:pm' }
];

/**
 * Find chain information by ID
 * 
 * @param {string} chainId - The chain ID to find
 * @returns {Object|null} Chain information
 */
export const findChainById = (chainId) => {
    // Check main chains
    const mainChain = supermarketChains.find(chain => chain.id === chainId);
    if (mainChain) return mainChain;
    
    // Check subchains
    for (const chain of supermarketChains) {
        if (chain.subChains) {
            const subChain = chain.subChains.find(sub => sub.id === chainId);
            if (subChain) return subChain;
        }
    }
    
    return null;
};

/**
 * Get chain names from an array of chain IDs
 * 
 * @param {Array<string>} chainIds - Array of chain IDs
 * @returns {Array<string>} Array of chain names
 */
export const getChainNames = (chainIds) => {
    return chainIds.map(id => {
        const chain = findChainById(id);
        return chain ? chain.name : id;
    });
};