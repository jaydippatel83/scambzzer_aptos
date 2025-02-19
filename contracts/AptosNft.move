module nft_minting::simple_nft {
    use std::string;
    use std::vector;
    use aptos_framework::coin;
    use aptos_framework::account;
    use aptos_framework::signer;
    use aptos_framework::event;
    
    /// Struct representing a SimpleNFT
    struct SimpleNFT has key, store {
        id: u64,
        name: string::String,
        description: string::String,
        owner: address,
    }

    /// Table to store all NFTs
    struct NFTCollection has key, store {
        nfts: vector<SimpleNFT>,
    }

    /// Event for NFT Minting
    struct NFTMintEvent has key, store {
        event_handle: event::EventHandle<u64>,
    }

    /// Create NFT collection
    public fun initialize_collection(account: &signer) {
        let addr = signer::address_of(account);
        let collection = NFTCollection { nfts: vector::empty<SimpleNFT>() };
        let event_handle = NFTMintEvent {
            event_handle: event::new_event_handle<u64>(account),
        };
        move_to(account, collection);
        move_to(account, event_handle);
    }

    /// Mint NFT
    public fun mint(
        account: &signer,
        name: vector<u8>,
        description: vector<u8>
    ) {
        let nft = SimpleNFT {
            id: std::hash::sip_hash(string::utf8(name)),
            name: string::utf8(name),
            description: string::utf8(description),
            owner: signer::address_of(account),
        };

        let collection_ref = borrow_global_mut<NFTCollection>(signer::address_of(account));
        vector::push_back(&mut collection_ref.nfts, nft);
        
        // Emit NFT Mint Event
        let event_ref = borrow_global_mut<NFTMintEvent>(signer::address_of(account));
        event::emit(&mut event_ref.event_handle, 1);
    }

    /// Transfer NFT (in Aptos, NFT handling is different; owner is stored)
    public fun transfer_nft(
        account: &signer,
        recipient: address,
        nft_id: u64
    ) {
        let collection_ref = borrow_global_mut<NFTCollection>(signer::address_of(account));
        let index = find_nft_index(&collection_ref.nfts, nft_id);
        
        let nft = vector::remove(&mut collection_ref.nfts, index);
        let new_nft = SimpleNFT { id: nft.id, name: nft.name, description: nft.description, owner: recipient };
        
        let recipient_collection = borrow_global_mut<NFTCollection>(recipient);
        vector::push_back(&mut recipient_collection.nfts, new_nft);
    }

    /// Helper function to find NFT index
    fun find_nft_index(nfts: &vector<SimpleNFT>, nft_id: u64): u64 {
        let len = vector::length(nfts);
        let mut i = 0;
        while (i < len) {
            let nft = vector::borrow(nfts, i);
            if (nft.id == nft_id) return i;
            i = i + 1;
        };
        abort 1;
    }

    /// Get NFT name
    public fun name(nft: &SimpleNFT): &string::String {
        &nft.name
    }

    /// Get NFT description
    public fun description(nft: &SimpleNFT): &string::String {
        &nft.description
    }

    /// Mint multiple NFTs
    public fun mint_multiple(
        account: &signer,
        names: vector<vector<u8>>,
        descriptions: vector<vector<u8>>
    ) {
        let count = vector::length(&names);
        let mut i = 0;
        while (i < count) {
            mint(account, vector::borrow(&names, i), vector::borrow(&descriptions, i));
            i = i + 1;
        }
    }
}
