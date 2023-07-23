Blockchains have a storage problem, the Merkle Tree data structure aims to solve this with efficient data verification by just storing the Merkle Tree's root.

This Repo contains a client-server implementation to verify someone's on Santa's "nicelist" via Merkle Trees and let them know if they got a gift or not. 

The Merkle Proof is constructed on the client and posted to the server, which verifies the proof using minimal information(Proof, Name, Merkle Root)