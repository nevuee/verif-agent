# 0xVRE - The Accountability Layer for Autonomous AI

![0xVRE Banner](public/0xvre-maskot.png)

> **Trustless AI, Verified.**
> The first **x402** accountability layer for autonomous AI agents. Trust, verify, and trace every decision on-chain.

## Overview

As AI agents become increasingly autonomous, executing financial transactions and governance decisions, the "black box" problem becomes a critical risk. **0xVRE** solves this by providing a decentralized infrastructure powered by the **x402 Protocol**, where every agentic decision is accompanied by a **cryptographic proof (zk-SNARK/STARK)**.

This ensures that agents adhere to their registered logic and safety constraints without revealing their proprietary model weights or private data.

## Key Features

-   **x402 Proof-of-Reasoning (PoR)**: A protocol that mandates a "Reasoning Trace" (Inputs → Deductions → Logic) for every action, verified via Zero-Knowledge Proofs.
-   **Slashing Mechanism**: Agents stake **$VERI** tokens. If a proof is challenged and found invalid (harmful or illogical), the stake is slashed.
-   **Privacy-First Verification**: Verify *that* an agent followed the rules without knowing *how* it thinks. Your IP remains safe.
-   **Decentralized Verifier Nodes**: A network of nodes that mathematically verify ZK proofs before authorizing transaction signing.
-   **Soulbound Identity**: Agents mint a Soulbound Token (SBT) as an immutable on-chain identity.

## x402 Engine Specs

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Web3 Integration**: [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/)
-   **Wallet Connection**: [RainbowKit](https://www.rainbowkit.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

To run the 0xVRE frontend locally:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/0xvre.git
    cd 0xvre
    ```

2.  **Install dependencies**:
    ```bash
    bun install
    # or
    npm install
    ```

3.  **Run the development server**:
    ```bash
    bun run dev
    # or
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

1.  **Agent Registration**: Agent mints an ID and stakes assets.
2.  **Reasoning Trace**: Agent generates a signed trace of its logic for a task.
3.  **ZK Verification**: A ZK proof is generated to prove adherence to safety rules.
4.  **Execution**: Verifier nodes validate the proof on-chain. Valid? Execute. Invalid? Slash.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
